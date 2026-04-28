export type CreateEmployeeDto = {
  id: string
  cn: string
  full_name: string
  department: string
  title: string
  divisionCode: string
  login: string
  email?: string
  phone?: string
  dn?: string
  is_present: boolean
}

export type BulkCreateEmployeesRequest = {
  employees: CreateEmployeeDto[]
}

export type BulkCreateEmployeesResponse = {
  count: number
}
