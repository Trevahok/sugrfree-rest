import express from 'express'
import ControllerSet from './controllerset.mjs'
import EmbedRouterSet from './embedrouterset.mjs'
import mongoose from 'mongoose'
import Joigoose from 'joigoose'
const joigoose = Joigoose(mongoose)


export class RouterSet {
    constructor(modelName , schema , middleware) {
        this.router = express.Router()
        this.model = this.getModel(modelName, schema)
        this.controllerSet = new ControllerSet(this.model, schema)
        this.schema = schema
        this.addRoutes(middleware)
        this.addEmbedRoutes(middleware)

    }
    getModel(modelName, schema) {
        var mongooseSchema = mongoose.Schema(joigoose.convert(schema))
        return mongoose.model(modelName, mongooseSchema)
    }
    addEmbedRoutes(middleware ){
        // get fields from the joi object
        if (middleware)
            this.router.use(middleware)
        var fields = this.schema.$_terms.keys
        for( let { key , schema}  of fields){
            if( schema.type === 'array'){
                // if array of objects in joi , add embedded routes and controllers 
                const embedSchema = this.schema._ids._byKey.get(key).schema.$_terms.items[0]
                const embedRouterSet = new EmbedRouterSet(key , embedSchema)
                const embedRouter = embedRouterSet.getRouter()
                this.router.use(`/:id/${key}`, async (req, res, next)=>{
                    if(! req.params.id) return res.json({ error: 'Parameter ID of type ObjectId required'}).status(400)
                    const instance = await this.model.findOne({_id : req.params.id})
                    req.instance = instance 
                    next()
                    instance.save()
                } )
                this.router.use(`/:id/${key}`, embedRouter)
            }
        }

    }
    addRoutes(middleware) {
        if (middleware)
            this.router.use(middleware)

        this.router.get('/', this.controllerSet.listController)
        this.router.post('/', this.controllerSet.createController)
        this.router.get('/:id', this.controllerSet.detailController)
        this.router.put('/:id', this.controllerSet.updateController)
        this.router.delete('/:id', this.controllerSet.deleteController)
    }
    getRouter() {
        return this.router
    }
}
