import mongoose from 'mongoose'
import Joigoose from 'joigoose'
import express from 'express'
const joigoose = Joigoose(mongoose)

export default class ControllerSet {
    constructor(modelName, schema) {
        this.schema = schema
        this.model = this.getModel(modelName, schema)
    }
    getModel(modelName, schema) {
        var mongooseSchema = mongoose.Schema(joigoose.convert(schema))
        return mongoose.model(modelName, mongooseSchema)
    }
    async listController (req, res)  {
        try {
            const instances = await this.model.find(req.query)
            res.json(instances)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    async createController(req, res) {
        try {

            const { error, value } = await this.schema.validate(req.body)
            if (error) return res.json({ error: error }).status(400)

            const object = new this.model({
                ...value
            })

            var instance = await object.save()
            res.json(instance).status(201)

        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }


    }
    async detailController(req, res)  {
        try {
            var id = req.params.id;
            const instance = await this.model.findById(id).populate()
            if (!instance) return res.sendStatus(404)

            res.json(instance)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    async updateController (req, res)  {
        try {

            const { error, value } = await this.schema.validate(req.body)
            if (error) return res.json({ error: error }).status(400)

            var id = req.params.id;
            const instance = await this.model.findByIdAndUpdate(
                { _id: id },
                value,
                { new: true, overwrite: true }
            )
            res.json(instance)

        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }
    }
    async deleteController (req, res)  {
        try {
            const deleted = await this.model.deleteOne({ _id: req.params.id })
            res.json(deleted)
        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }

    }
}


export class EmbeddedDocumentControllerSet{
    constructor(modelName, schema){
        this.schema = schema;
    }
}