// features/court-viewer/model/courtViewerSlice.ts
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/01-app/store'

type State = {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

const slice = createSlice({
  name: 'courtViewer',
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

export const selectCourtViewerIsOpen = (state: RootState) =>
  state.courtViewer.isOpen

export const { openViewer, closeViewer } = slice.actions
export const courtViewerReducer = slice.reducer
