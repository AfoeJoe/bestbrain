import {
	AnyAction,
	AsyncThunk,
	createAction,
	/*  createAction, */ createReducer,
} from '@reduxjs/toolkit';

// const initialState = { loading: false };
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const initialState: { loading: boolean; error: string | null } = {
	loading: false,
	error: null,
};

function isPendingAction(action: AnyAction): action is PendingAction {
	return action.type.endsWith('/pending');
}

const resetAction = createAction('reset-tracked-loading-state');

const sharedReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(resetAction, () => initialState)
		// matcher can be defined outside as a type predicate function
		.addMatcher(isPendingAction, (state /* action */) => {
			state.loading = true;
		})
		.addMatcher(
			// matcher can be defined inline as a type predicate function
			(action): action is RejectedAction => action.type.endsWith('/rejected'),
			(state /* , action */) => {
				state.loading = false;
			}
		)
		// matcher can just return boolean and the matcher can receive a generic argument
		.addMatcher<FulfilledAction>(
			(action) => action.type.endsWith('/fulfilled'),
			(state /* , action */) => {
				state.loading = false;
			}
		);
});
export default sharedReducer;
/* 
export const handleError =
  (action,
  (state) => {
    state.error = action.type.endsWith('/rejected'); // or smth similar
  });
 */
