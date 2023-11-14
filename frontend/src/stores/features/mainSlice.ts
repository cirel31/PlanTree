import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treeId: '',
  treeName: '',
  weekly: {
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
  },
}

export const mainSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    getMainData: () => {},
    storeIdName: (state, action) => {
      state.treeId = action.payload.treeId
      state.treeName = action.payload.treeName
    },
    storeWeeklyData: (state, action) => {
      state.weekly.mon = action.payload.mon
      state.weekly.tue = action.payload.tue
      state.weekly.wed = action.payload.wed
      state.weekly.thu = action.payload.thu
      state.weekly.fri = action.payload.fri
    },
  },
})

export const { getMainData, storeIdName, storeWeeklyData } = mainSlice.actions
export default mainSlice.reducer
