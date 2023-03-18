import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "./userConstant";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.post(
			`http://localhost:4000/api/v1/login`,
			{ email, password },
			config
		);

		dispatch({ type: LOGIN_SUCCESS, payload: data.user });
	} catch (error) {
		console.log(error);
		dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
	}
};

// Register
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		const config = { headers: { "Content-Type": "multipart/form-data" } };

		const { data } = await axios.post(
			`http://localhost:4000/api/v1/register`,
			userData,
			config
		);

		dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Logout User
export const logout = () => async (dispatch) => {
	try {
		await axios.get(`http://localhost:4000/api/v1/logout`);

		dispatch({ type: LOGOUT_SUCCESS });
	} catch (error) {
		dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
	}
};


// get user Details
export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });
		const { data } = await axios.get(`http://localhost:4000/api/v1/user/${id}`);

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
	}
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
