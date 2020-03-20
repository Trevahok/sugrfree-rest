import express from 'express'
import EmbedControllerSet from './embedcontrollerset.mjs'

export default class EmbedRouterSet{
    constructor(key, schema ){
        this.router = express.Router()
        this.key = key 
        this.schema = schema 
        this.controllerSet = new EmbedControllerSet(key, schema)
        this.addRoutes()
        this.addEmbedRoutes()

    }
    addEmbedRoutes( ){
        // get fields from the joi object
        var fields = this.schema.$_terms.keys
        for( let { key , schema}  of fields){
            if( schema.type === 'array'){
                // if array of objects in joi , add embedded routes and controllers 
                const embedSchema = this.schema._ids._byKey.get(key).schema.$_terms.items[0]
                const embedRouterSet = new EmbedRouterSet(key , embedSchema)
                const embedRouter = embedRouterSet.getRouter()
                this.router.use(`/:${this.key}Id/${key}`, async (req, res, next)=>{
                    req.instance = req.instance[this.key].id(req.params[ this.key+ "Id"])
                    next()
                } )
                this.router.use(`/:${this.key}Id/${key}`, embedRouter)
            }
        }

    }
    addRoutes(){
        this.router.get( '/', this.controllerSet.embedListController)
        this.router.get( `/:${this.key}Id`, this.controllerSet.embedDetailController)
        this.router.post( '/', this.controllerSet.embedCreateController)
        this.router.delete( `/:${this.key}Id`, this.controllerSet.embedDeleteController)

    }
    getRouter(){
        return this.router
    }
}