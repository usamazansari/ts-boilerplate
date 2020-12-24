import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import Axios from 'axios-observable'

import { Agent } from 'https'

import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { AppEndpointErrorModel, AppEndpointRequestModel, AppEndpointResponseModel } from './endpoint-helpers.model'

export class AppEndpointHelper {

  private readonly _axiosConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  private readonly _axios = (config: AxiosRequestConfig): Axios => {
    const _axiosInstance = Axios.create(config)
    return _axiosInstance
  }

  private readonly _axiosInstance: Axios = this._axios(this._axiosConfig)

  constructor() { }

  public axiosGet<T>(_: AppEndpointRequestModel): Observable<AppEndpointResponseModel<T>> {

    const _requestConfig: AppEndpointRequestModel = {
      url: _.url,
      httpsAgent: new Agent({ keepAlive: true, rejectUnauthorized: false })
    }

    return this._axiosInstance.get<AppEndpointResponseModel<T>>(`${_requestConfig.url}`, { ..._requestConfig }).pipe(
      map((__: AxiosResponse) => {
        console.log()

        const { status, data } = __
        const _return: AppEndpointResponseModel<T> = { status, data, error: null }

        return _return
      }),
      catchError((__: AxiosError) => {
        console.log()

        const status: number = 500
        const { code, config: { url, headers }, message } = __
        const error: AppEndpointErrorModel = { code: `${code}`, headers, url: `${url}`, message }
        const _return: AppEndpointResponseModel<T> = { status, data: null, error }

        return throwError(_return)
      }))
  }

  public axiosPost<T>(url: string, body: { [key: string]: string }, params: { [key: string]: string }): Observable<T> {
    return this._axiosInstance.post<T>(url, { ...body }, { params }).pipe(
      map((_: AxiosResponse) => <T>_.data),
      catchError((__: AxiosError) => throwError(__)))
  }

}
