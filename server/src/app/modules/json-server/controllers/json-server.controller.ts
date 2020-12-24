import { NextFunction, Request, Response, Router } from 'express'

import { Observable } from 'rxjs'

import { AppControllerModel, AppControllerPathType } from '../../common/helpers/controller/controller-helpers.model'
import { AppEndpointHelper } from '../../common/helpers/endpoint/endpoint-helpers'
import { AppEndpointRequestModel, AppEndpointResponseModel } from '../../common/helpers/endpoint/endpoint-helpers.model'

import { JSONServerDataModel, JSONServerControllerPathType } from '../models/json-server.model'
import { JSONServerService } from '../services/json-server.service'

export class JSONServerController implements AppControllerModel<JSONServerControllerPathType> {

  public path: AppControllerPathType<JSONServerControllerPathType>
  public router: Router

  private _helper: AppEndpointHelper
  private _service: JSONServerService

  constructor() {
    this.path = {
      base: 'fetch',
      data: '_'
    }
    this.router = Router()

    this._helper = new AppEndpointHelper()
    this._service = new JSONServerService()

    this._initializeRoutes()
  }

  _initializeRoutes() {

    this._service.test()

    this.router.route(`/${this.path.base}`).get(this._defaultResponse.bind(this))
    this.router.route(`/${this.path.base}/${this.path.data}`).get(this._fetchData.bind(this))
  }

  private _defaultResponse(req: Request, res: Response, next: NextFunction) {
    console.log(`[JSONServerController] ${req.url}`)
    return res.status(200).json({ message: `You fetched ${req.url}` })
  }

  private _fetchData(req: Request, res: Response, next: NextFunction) {
    console.log(`[JSONServerController] ${req.url}`)

    const _request: AppEndpointRequestModel = { url: `${this.path.data}` }

    const _reqSubscription$: Observable<AppEndpointResponseModel<JSONServerDataModel[]>> = this._helper.axiosGet<JSONServerDataModel[]>({ ..._request })

    _reqSubscription$.subscribe({
      next: (__: AppEndpointResponseModel<JSONServerDataModel[]>) => {
        console.log()
        return res.status(__.status).json({ ...__ })
      },
      error: (__: AppEndpointResponseModel<JSONServerDataModel[]>) => {
        console.log()
        return res.status(__.status).json({ ...__ })
      }
    })
  }
}
