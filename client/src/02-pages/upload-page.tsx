import { FileUploader } from '@/03-widgets'
import {
  useCreateCourtsMutation,
  useCreateEmployeesMutation,
  useCreateFinancialOrganizationsMutation,
} from '@/05-entities'
import type { CreateCourtDto } from '@/05-entities/court/model/dto'
import type { CreateEmployeeDto } from '@/05-entities/employee/model/dto'
import type { CreateFinancialOrganizationDto } from '@/05-entities/financial-organization/model/dto'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/06-shared'
import { useState } from 'react'

type UploadType = 'courts' | 'employees' | 'financial-organizations'

export const UploadPage = () => {
  const [uploadType, setUploadTupe] = useState<UploadType>('courts')
  const [bulkCreateCourts] = useCreateCourtsMutation()
  const [bulkCreateEmployees] = useCreateEmployeesMutation()
  const [bulkCreateFinancialOrganizations] =
    useCreateFinancialOrganizationsMutation()

  const courtHandler = async (data: CreateCourtDto[]) => {
    return bulkCreateCourts({ courts: data }).unwrap()
  }

  const employeeHandler = async (data: CreateEmployeeDto[]) => {
    return bulkCreateEmployees({ employees: data }).unwrap()
  }

  const financialOrganizationHandler = async (
    data: CreateFinancialOrganizationDto[],
  ) => {
    return bulkCreateFinancialOrganizations({
      financialOrganizations: data,
    }).unwrap()
  }

  return (
    <div
      className="p-6 h-full flex flex-col gap-4"
      style={{ height: 'calc(100% - var(--header-height))' }}
    >
      <Select
        value={uploadType}
        onValueChange={(e) => setUploadTupe(e as UploadType)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Тип загрузки" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Данные</SelectLabel>
            <SelectItem value="courts">Суды</SelectItem>
            <SelectItem value="employees">Сотрудники</SelectItem>
            <SelectItem value="financial-organizations">
              Финансовые организации
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {uploadType === 'courts' && (
        <FileUploader<CreateCourtDto> handleUpload={courtHandler} />
      )}

      {uploadType === 'employees' && (
        <FileUploader<CreateEmployeeDto> handleUpload={employeeHandler} />
      )}

      {uploadType === 'financial-organizations' && (
        <FileUploader<CreateFinancialOrganizationDto>
          handleUpload={financialOrganizationHandler}
        />
      )}
    </div>
  )
}
