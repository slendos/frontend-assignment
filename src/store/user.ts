import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type User = {id: number; name: string};
export type UserState = {data: User | null};

const initialState: UserState = {data: null};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const actions = userSlice.actions;
export const reducer = userSlice.reducer;
