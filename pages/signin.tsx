import React, {
	ChangeEvent,
	FormEvent,
	MouseEventHandler,
	useState,
} from 'react';
import { useAppDispatch } from '../redux/hooks';
import { authSlice, userSignIn, userSignOut } from '../redux/slices/authSlice';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();

	const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('here');

		dispatch(userSignIn());
	};

	const handleLogOut = (e: any) => {
		e.preventDefault();
		console.log('here');

		dispatch(userSignOut());
	};
	return (
		<form onSubmit={handleSignIn}>
			<input type='submit' value='Sign in with google' />
			<button onClick={handleLogOut}>Sign out with google</button>
		</form>
	);
};

export default SignIn;
