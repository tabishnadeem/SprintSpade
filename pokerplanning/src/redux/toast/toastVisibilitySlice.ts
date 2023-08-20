import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ToastVisibility } from '../../interfaces/IToastVisibility'



const initialState: ToastVisibility = {
  visible: false
}

export const toastVisibilitySlice = createSlice({
  name: 'toastVisibility',
  initialState,
  reducers: {
    toggleVisiblity : (state,action: PayloadAction<boolean>) => {
        state.visible = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleVisiblity} = toastVisibilitySlice.actions

export default toastVisibilitySlice.reducer