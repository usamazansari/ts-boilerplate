import express, { NextFunction, Request, Response } from 'express'

import cors from 'cors'

import dotenv from 'dotenv'

import axios from 'axios'

import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { from, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

const app: express.Application = express()

app.use(cors())

dotenv.config()

const PORT: string | number | undefined = process.env.SERVER_PORT || 8080

app.get('/fetchData', (req: Request, res: Response, next: NextFunction) => {
  const axiosConfig: AxiosRequestConfig = {
    url: 'http://localhost:3000/_',
    method: 'GET'
  }
  from(axios({ ...axiosConfig })).pipe(
    tap((_: AxiosResponse) => {
      console.groupCollapsed('[Express GET] Data Fetch Succues')
      res.status(200).json({ ..._.data })
      console.groupEnd()
    }),
    catchError((__: AxiosError) => {
      console.groupCollapsed('[Express GET] Data Fetch Failed')
      res.status(400)
      console.groupEnd()
      return of({ ...__ })
    })
  ).subscribe()
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Express with TypeScript and RxJS! Voila!')
})


app.listen(PORT, () => { console.log(`Express on port : ${PORT}`) })
