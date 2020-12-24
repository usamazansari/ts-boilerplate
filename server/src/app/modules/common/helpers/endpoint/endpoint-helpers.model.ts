import { AxiosRequestConfig } from 'axios'

export interface AppEndpointErrorModel {
  url: string | null
  headers: { [key: string]: string | null } | null
  code: string | null
  message: string | null
}

export interface AppEndpointResponseModel<T> {
  status: number
  data: T | null
  error: AppEndpointErrorModel | null
}

export interface AppEndpointRequestModel extends AxiosRequestConfig { }

export const INITIAL_ENDPOINT_ERROR: AppEndpointErrorModel | null = null

export const INITIAL_ENDPOINT_REQUEST: AppEndpointRequestModel = {
  url: undefined, httpsAgent: null
}

export const INITIAL_ENDPOINT_RESPONSE: AppEndpointResponseModel<{}> = {
  status: 0, data: null, error: null
}
