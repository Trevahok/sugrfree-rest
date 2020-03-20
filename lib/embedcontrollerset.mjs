
export default class EmbedControllerSet{
    constructor(key, schema ){
        this.key = key
        this.schema = schema 
    }
    embedListController =  async (req, res) => {
        try {
            var instance = req.instance 
            res.json(instance[this.key] || [])
        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }

    }
    embedCreateController =  async (req, res) => {
        try {

            const { error, value } = await this.schema.validate(req.body)
            if (error) return res.json({ error: error }).status(400)

            req.instance[this.key].push(value)

            res.json(value).status(201)

        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }


    }
    embedUpdateController = async (req, res) => {
        try {

            const { error, value } = await this.schema.validate(req.body)
            if (error) return res.json({ error: error }).status(400)

            req.instance[this.key].pull(req.params[this.key + 'Id'])
            req.instance[this.key].push(value)
            res.json(value)

        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }
    }
    embedDetailController = async (req, res) => {
        try {
            var keyid = req.params[this.key + 'Id']
            if (!req.instance) return res.sendStatus(404)

            res.json(req.instance[this.key].id(keyid))
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    embedDeleteController = async (req, res) => {
        try {
            const instance = req.instance
            var keyid = req.params[this.key + 'Id']
            const deleted = instance[this.key].id(keyid)
            instance[this.key].pull(keyid)
            res.json(deleted)
        } catch (err) {
            console.log(err);
            res.sendStatus(500)
        }

    }
}
