import { NextFunction, Router, Request, Response } from 'express'

import { AppControllerModel, AppControllerPathType } from '../../common/helpers/controller/controller-helpers.model'
import { AppEndpointHelper } from '../../common/helpers/endpoint/endpoint-helpers'

import { DelayedResponseControllerPathType } from '../models/delayed-response.model'

import { DelayedResponseService } from '../services/delayed-response.service'

export class DelayedResponseController implements AppControllerModel<DelayedResponseControllerPathType> {

  public path: AppControllerPathType<DelayedResponseControllerPathType>
  public router: Router

  private _helper: AppEndpointHelper
  private _service: DelayedResponseService

  constructor() {
    this.path = {
      base: 'delay',
      response: 'response'
    }

    this.router = Router()

    this._helper = new AppEndpointHelper()
    this._service = new DelayedResponseService()

    this._initializeRoutes()

  }

  _initializeRoutes(): void {

    this._service.test()

    this.router.route(`/${this.path.base}`).get(this._defaultResponse.bind(this))
    this.router.route(`/${this.path.base}/${this.path.response}`).get(this._handleDelayedResponses.bind(this))
  }

  private _defaultResponse(req: Request, res: Response, next: NextFunction) {
    console.log(`[DelayedResponseController] ${req.url}`)
    return res.status(200).json({ message: `You fetched ${req.url}` })
  }

  private _handleDelayedResponses(req: Request, res: Response, next: NextFunction) {
    console.log(`[DelayedResponseController] ${req.url}`)
    return res.status(200).json({ message: `You fetched ${req.url}` })
  }

}
