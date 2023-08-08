import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ThemeState } from '../../interfaces/ITheme'



const initialState: ThemeState = {
  value: window.localStorage.getItem("theme") || "light",
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode : (state,action: PayloadAction<string>) => {
        state.value = action.payload;
        window.localStorage.setItem("theme",action.payload);    
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleDarkMode} = themeSlice.actions

export default themeSlice.reducer