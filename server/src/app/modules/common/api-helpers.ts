import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Axios from 'axios-observable'

import { Observable, of, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

const _axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
}

const _axios = (config: AxiosRequestConfig): Axios => {
  const _axiosInstance = Axios.create(config)
  return _axiosInstance
}

const _axiosInstance: Axios = _axios(_axiosConfig)

export const get = <T>(url: string, params: { [key: string]: string }): Observable<T | null> => {
  return _axiosInstance.get<T>(url, { ...params }).pipe(
    map((__: AxiosResponse) => __.data),
    catchError((__: AxiosError) => throwError(__)))
}

export const post = <T>(url: string, body: { [key: string]: string }, params: { [key: string]: string }): Observable<T | null> => {
  return _axiosInstance.post<T>(url, { ...body }, { params }).pipe(
    map((_: AxiosResponse) => <T>_.data),
    catchError((__: AxiosError) => of(null)))
}
