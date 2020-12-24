export type JSONServerControllerPathType = {
  data: string | null
}

export interface JSONServerDataModel {
  organization: {
    name: string
    employees: {
      name: {
        first: string
        last: string
      },
      date: {
        joining: {
          month: number
          year: number
          date: number
        }
      },
      title: string
    }[]
  }
}
