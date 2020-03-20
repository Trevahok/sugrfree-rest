
export default class ControllerSet {
    constructor(model, schema) {
        this.schema = schema
        this.model = model
    }
    listController = async (req, res) => {
        try {
            const instances = await this.model.find(req.query).populate()
            res.json(instances)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    createController = async (req, res) => {
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
    detailController = async (req, res) => {
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
    updateController = async (req, res) => {
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
    deleteController = async (req, res) => {
        try {
            const deleted = await this.model.deleteOne({ _id: req.params.id })
            res.json(deleted)
        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }

    }
   
}
