import { Provider } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getAuth,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

interface AuthState {
	isLoading: boolean;
	/* 	access_token: string | null;
	refresh_token: string | null; */
}

const initialState: AuthState = {
	isLoading: false,
};

export const userSignIn = createAsyncThunk('user/signIn', async () => {
	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	return signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			// The signed-in user info.
			const user = result.user;
			return user;
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
});

export const userSignOut = createAsyncThunk('user/signOut', async () => {
	const auth = getAuth();

	return signOut(auth);
	/* .then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		}); */
});

export const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		increment: (state /* action: PayloadAction<boolean> */) => {
			// state.isAuthenticated = false;
		},

		/* signIn: (state, payload) => {
			// state.isLoading = action.payload.email,
		}, */
	},
	extraReducers: (builder) => {
		// builder.addCase(userSignIn.fulfilled, (state, { payload }) => {
		// 	state.isLoading = false;
		// });
	},
});

export const { increment } = authSlice.actions;
export default authSlice.reducer;
