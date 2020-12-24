## ts-boilerplate CHANGELOG

### :tada: Boilerplate Initialized

---

#### Overview

> Initialized Boilerplate project

| Paramter      | Value  |
| ------------- | ------ |
| Type          | :tada: |
| Files Changed | 43     |

---

#### Changes

1. Initialized and created first dummy angular component
2. Setup Angular and Express debugging 
   1. [`launch.json`](../../.vscode/launch.json)
   2. [`tasks.json`](../../.vscode/tasks.json)
3. Setup Typescript with Express

---

### :sparkles: Various Tasks

---

#### Overview

> Environment Sanitization
> 
> Optimized folder structure of `server`
> 
> `Axios` as `Observable`
> 
> Added helpers
> 
> Separated models
> 
> Updated `.gitignore`


| Paramter      | Value      |
| ------------- | ---------- |
| Type          | :sparkles: |
| Files Changed | 18         |

---

#### Changes

1. Excluded `.env` from versioning
2. Updated references in [`README.md`](../../README.md)
3. Added build optimization in `build:prod` script of `client`
4. Enabled Ivy
5. Enabled environment sanity check using `envalid`
6. Folder structure as per [TypeScript Express Tutorial](https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/) and [Developing an Express Application Using TypeScript](https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1)

---

### :sparkles: Various Optimizations

---

#### Overview

> Added `morgan` logging
> 
> Added `CHANGELOG.md`
> 
> Refactored code

| Paramter      | Value      |
| ------------- | ---------- |
| Type          | :sparkles: |
| Files Changed | 21         |

---

#### Changes

1. Excluded `debug.log` from versioning
2. Added `morgan` logging
3. Refactored `index.ts` at the app level
   1. Performed separation of concerns
   2. Only middlewares and controllers shall be provided to `app.ts`
   3. Code Cleanup
4. Refactored folder structure to better support addition of multiple modules
5. Added `delay` route
6. Added `default` route handler
7. Added optional service for each module
