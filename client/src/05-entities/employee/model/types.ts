export interface Division {
  id: string
  name: string
  code: string
}

export interface Employee {
  id: string
  cn: string
  full_name: string
  department: string
  title: string
  division: Division
  login: string
  email: string
  phone: string
  dn: string
  is_present: boolean
}
