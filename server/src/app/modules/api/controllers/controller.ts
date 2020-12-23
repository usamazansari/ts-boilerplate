import { Response, Router } from 'express'

import { AxiosError } from 'axios'

import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { ControllerModel } from '../../common/controller-helpers'
import { get } from '../../common/api-helpers'

import { AppData } from '../models'

export class ApiController implements ControllerModel {

  public path: string
  public router: Router

  constructor() {
    this.path = '/fetch'
    this.router = Router()

    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.fetchData)
  }

  fetchData(res: Response) {
    get<AppData>('_', {}).pipe(
      catchError((__: AxiosError) => throwError({ ...__ }))
    ).subscribe(
      __ => { res.status(200).json({ ...__ }) },
      __ => {
        res.status(500).send({
          code: __.code,
          config: { baseURL: __.config.baseURL, data: __.config.data }
        }).end()
      }
    )
  }
}
