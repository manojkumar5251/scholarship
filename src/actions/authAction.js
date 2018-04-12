"use strict";
import axios from "axios";
import { AsyncStorage, Alert } from "react-native";
import { Actions } from "react-native-router-flux";

export function signUp(user) {
	return function(dispatch) {
		axios
			.post("https://scholarshiptest.kitcbe.com/signup", user)
			.then(function(response) {
				dispatch({ type: "signUp", payload: response.data });
				Alert.alert("Success", "Account created successfully!!!", [
					{
						text: "OK",
						onPress: () => {
							console.log("Success");
							Actions.pop();
						}
					}
				]);
			})
			.catch(function(err) {
				dispatch({ type: "signUpRejected", payload: err });
				Alert.alert("ERROR", "Error creating the account. Please try again", [
					{
						text: "OK",
						onPress: () => {
							console.log("Error creating the account. Please try again");
							Actions.pop();
						}
					}
				]);
			});
	};
}

export function signIn(user) {
	return function(dispatch) {
		axios
			.post("https://scholarshiptest.kitcbe.com/signin", user)
			.then(function(response) {
				dispatch({ type: "signIn", payload: response.data });
				Alert.alert("Success", " Logged In Successfully", [
					{
						text: "OK",
						onPress: () => console.log("Logged In Successfully")
					}
				]);
			})
			.catch(function(err) {
				dispatch({ type: "signInRejected", payload: err });
				Alert.alert("Success", " Invalid Username or Password", [
					{
						text: "OK",
						onPress: () => console.log("Invalid Username or Password")
					}
				]);
			});
	};
}

export function logout() {
	return { type: "logout" };
}

export function getAuth() {
	return function(dispatch) {
		AsyncStorage.getItem("token").then(value => {
			axios
				.get("https://scholarshiptest.kitcbe.com/auth", {
					headers: {
						authorization: value
					}
				})
				.then(function(response) {
					dispatch({ type: "getAuth", payload: response.data });
				})
				.catch(function(err) {
					dispatch({ type: "getAuth", payload: err });
				});
		});
	};
}

export function forgotPassword(email) {
	console.log(email);
	return function(dispatch) {
		axios
			.post(
				"https://scholarshiptest.kitcbe.com/create-forgot-password-link",
				email
			)
			.then(function(response) {
				dispatch({ type: "forgotPasswordlink", payload: response.data });
				Alert.alert("Success", " Please check your email.", [
					{
						text: "OK",
						onPress: () => console.log("Please check your email.")
					}
				]);
			})
			.catch(function(err) {
				dispatch({ type: "forgotPasswordlinkRejected", payload: err });
				Alert.alert("ERROR", " Please retry.", [
					{
						text: "OK",
						onPress: () => console.log("Please retry.")
					}
				]);
			});
	};
}

export function testState(start) {
	return {
		type: "testState",
		payload: start
	};
}
