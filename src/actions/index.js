import history from '../history';
import streams from '../apis/streams';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM
} from './types';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

// ACTION CREATOR TO BE HOOKED UP TO THE STREAMCREATE COMPONENT AND CALL IT.
// making a POST request to http://localhost:3001/streams usig the formValues from the StreamCreate.js file passing in the formValues from
// StreamCreate.js into createStream action creator
// Dispatching a Action that has a payload of the response.data we got back from creating the stream.
export const createStream = (formValues) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await streams.post('/streams', { ...formValues, userId });

	dispatch({ type: CREATE_STREAM, payload: response.data });
	history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
	const response = await streams.get('/streams');

	dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
	const response = await streams.get(`/streams/${id}`);

	dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({ type: EDIT_STREAM, payload: response.data });
	history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
	await streams.delete(`/streams/${id}`);

	dispatch({ type: DELETE_STREAM, payload: id });
	history.push('/');
};
