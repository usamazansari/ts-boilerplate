import { config } from 'dotenv'

import { resolve } from 'path'

import { cleanEnv, port, str } from 'envalid'

import cors from 'cors'

import morgan from 'morgan'

import { json } from 'express'

import { Server } from 'http'

import { JSONServerController } from './modules/json-server/controllers/json-server.controller'
import { DelayedResponseController } from './modules/delayed-response/controllers/delayed-response.controller'

import { MediaLabsApplication } from './app'

config({ path: resolve(process.cwd(), 'src', 'environments', '.env') })

cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port()
})

const PORT: string | number | undefined = process.env.PORT || 8080

const CONTROLLERS: any[] = [
  new JSONServerController(),
  new DelayedResponseController()
]

const MIDDLEWARES: any[] = [
  cors(),
  morgan('combined', {}),
  json()
]

const APP: MediaLabsApplication = new MediaLabsApplication({
  controllers: [...CONTROLLERS],
  middlewares: [...MIDDLEWARES]
})

const SERVER: Server = new Server(APP.app)

SERVER.listen(+PORT, () => { console.log(`Application on port: ${PORT}`) })
