import path from 'path'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'

import { cleanEnv, port, str } from 'envalid'

import { ApiController } from './modules/api/controllers/controller'
import { MediaLabsApplication } from './app'

dotenv.config({ path: path.resolve(process.cwd(), 'src', 'environments', '.env') })

cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port()
})

const PORT: string | number | undefined = process.env.PORT || 8080

const CONTROLLERS: any[] = [
  new ApiController()
]

const MIDDLEWARES: any[] = [
  cors()
]

const APP: MediaLabsApplication = new MediaLabsApplication({
  controllers: [...CONTROLLERS],
  middlewares: [...MIDDLEWARES]
})

const SERVER: http.Server = new http.Server(APP.app)

SERVER.listen(+PORT, () => { console.log(`Application on port: ${PORT}`) })
