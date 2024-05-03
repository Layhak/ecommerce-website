import { createSlice } from '@reduxjs/toolkit';

const passwordVisibilitySlice = createSlice({
  name: 'passwordVisibility',
  initialState: false,
  reducers: {
    togglePasswordVisibility: (state: boolean) => !state,
  },
});

export const { togglePasswordVisibility } = passwordVisibilitySlice.actions;

export default passwordVisibilitySlice.reducer;
