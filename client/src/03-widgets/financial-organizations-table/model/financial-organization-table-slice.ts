import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/01-app/store'

type State = {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

const slice = createSlice({
  name: 'financialOrganizationViewer',
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

export const selectFinancialOrganizationViewerIsOpen = (state: RootState) =>
  state.financialOrganizationViewer.isOpen

export const { openViewer, closeViewer } = slice.actions
export const financialOrganizationViewerReducer = slice.reducer
