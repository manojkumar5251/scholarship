"use strict";

import { AsyncStorage } from "react-native";

const saveData = async value => {
	try {
		await AsyncStorage.setItem("token", value);
	} catch (error) {
		console.log("AsyncStorage save error: " + error.message);
	}
};

export function authReducer(state = { user: {}, show: null }, action) {
	switch (action.type) {
		case "signUp":
			saveData(action.payload.token);
			return {
				user: action.payload.user,
				show: true
			};
			break;

		case "signIn":
			saveData(action.payload.token);
			if (action.payload.user._id == null) {
				return {
					user: action.payload.user,
					show: false
				};
			} else {
				return {
					user: action.payload.user,
					show: true
				};
			}

			break;

		case "logout":
			AsyncStorage.removeItem("token");
			return {
				user: {},
				show: false
			};
			break;

		case "getAuth":
			if (action.payload._id == null) {
				return {
					user: action.payload,
					show: false
				};
			} else {
				return {
					user: action.payload,
					show: true
				};
			}

			break;
		case "testState":
			var users = state.user;
			users.started = action.payload;
			return { user: users, show: true };
			break;
	}

	return state;
}
