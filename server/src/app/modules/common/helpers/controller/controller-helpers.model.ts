import { Router } from 'express'

export type AppControllerPathType<P> = { base: string | null } & P

/**
 * 
 * ## AppControllerModel<P>
 * 
 * ---
 * 
 * @template P
 * 
 * `P` refers to the key-value pair of routes to be used in the controller where the interface is implemented
 * 
 * If a controller has multiple routes where all of them can be represented in an object notation
 * 
 * @example
 * 
 * ```js
 * routes = {
 *   fetch : 'fetchDataFromAPI',
 *   // { ...otherRoutes }
 * }
 * ```
 * 
 * then the template `P` becomes of the type
 * 
 * @example
 * 
 * ```ts
 * type P = {
 *   fetch : string | null
 *   // { ...otherRoutes }
 * }
 * ```
 * 
 * The `path` property would subsequently have all the properties of template `P` along with one `base` route
 * 
 * @example
 * 
 * ```ts
 * // foo.ts
 * 
 * class foo implements AppControllerModel<RouteType> {
 *   public path: AppControllerPathType<RouteType>
 * 
 *   constructor() {
 *     this.path: AppControllerPathType<RouteType> = {
 *       base  : '',
 *       fetch : 'fetchDataFromAPI',
 *       // { ...otherRoutes }
 *     }
 *   }
 * }
 * ```
 * 
 * ---
 * 
 * @example
 * 
 * ```ts
 * // foo-type.ts
 * 
 * export interface RouteType {
 *   fetch : string | null
 *   // { ...otherRoutes }
 * }
 * ```
 * 
 * ---
 * 
 * @export
 * @interface AppControllerModel
 */
export interface AppControllerModel<P> {
  path: AppControllerPathType<P>
  router: Router | null
  _initializeRoutes: () => void
}
