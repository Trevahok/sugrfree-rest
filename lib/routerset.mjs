import express from 'express'

export class RouterSet {
    constructor( controllerSet, middleware) {
        this.router = express.Router()
        this.controllerSet = controllerSet
        this.addRoutes(middleware)

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