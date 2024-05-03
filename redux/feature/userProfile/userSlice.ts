import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [
      { id: 1, name: 'Tianna Jenkins' },
      { id: 2, name: 'Kevin Grant' },
      { id: 3, name: 'Madison Price' },
      { id: 4, name: 'Madison Price' },
    ],
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    addUser(state, action) {
      state.users.push(action.payload);
    },
    deleteUserById(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUserById(state, action) {
      console.log('action', action.payload);
      const { id, name } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
      }
    },
  },
});
export default userSlice.reducer;

export const selectUsers = (state: any) => state.user.users;
export const {
  addUser, deleteUserById,
  updateUserById,
} = userSlice.actions;
