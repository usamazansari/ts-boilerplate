import express, { Application } from 'express'

export class MediaLabsApplication {

  public app: Application

  constructor(_: {
    controllers: any[],
    middlewares: any[]
  }) {
    this.app = express()

    this._initializeMiddlewares(_.middlewares)
    this._initializeControllers(_.controllers)
  }

  private _initializeMiddlewares(middlewares: any[]) {
    middlewares.forEach(_ => { this.app.use(_) })
  }

  private _initializeControllers(controllers: any[]) {
    controllers.forEach(_ => { this.app.use('/', _.router) })
  }
}
