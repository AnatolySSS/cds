import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/01-app/store'

type State = {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

const slice = createSlice({
  name: 'userViewer',
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

export const selectUserViewerIsOpen = (state: RootState) =>
  state.userViewer.isOpen

export const { openViewer, closeViewer } = slice.actions
export const userViewerReducer = slice.reducer
