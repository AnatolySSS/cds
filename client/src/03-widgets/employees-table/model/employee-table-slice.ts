// features/employee-viewer/model/employeeViewerSlice.ts
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/01-app/store'

type State = {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

const slice = createSlice({
  name: 'employeeViewer',
  initialState,
  reducers: {
    openViewer(state) {
      state.isOpen = true
    },
    closeViewer(state) {
      state.isOpen = false
    },
  },
})

export const selectEmployeeViewerIsOpen = (state: RootState) =>
  state.employeeViewer.isOpen

export const { openViewer, closeViewer } = slice.actions
export const employeeViewerReducer = slice.reducer
