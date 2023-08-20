import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './redux/theme/themeSlice'
import toastVisibilitySlice from './redux/toast/toastVisibilitySlice'

export const store = configureStore({
  reducer: {
    theme : themeSlice,
    toastVisibility:toastVisibilitySlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch