import { Router } from 'express'

export interface ControllerModel {
  path: string
  router: Router
}
