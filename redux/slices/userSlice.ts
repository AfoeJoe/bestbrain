import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userSignIn, userSignOut } from './authSlice';

interface UserState {
	/* 	email: string;
	id: string;
	token: string; */
	user: any;
	error: any;
}

const initialState: UserState = {
	/* email: '',
	id: '',
	token: '', */
	user: null,
	error: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		increment: (state /* action: PayloadAction<boolean> */) => {
			// state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userSignIn.fulfilled, (state, { payload }) => {
			console.log({ payload });

			state.user = payload;
		});
		builder.addCase(userSignIn.rejected, (state, { payload }) => {
			state.error = payload;
		});
		builder.addCase(userSignOut.fulfilled, (state, { payload }) => {
			console.log({ payload });

			state.user = null;
		});
		builder.addCase(userSignOut.rejected, (state, { payload }) => {
			state.error = payload;
		});
	},
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;
