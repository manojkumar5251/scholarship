"use strict";
import { AsyncStorage, Alert } from "react-native";
import axios from "axios";

export function getQbank() {
	return function(dispatch) {
		AsyncStorage.getItem("token").then(value => {
			axios
				.get("https://scholarshiptest.kitcbe.com/qbank", {
					headers: {
						authorization: value
					}
				})
				.then(function(response) {
					dispatch({ type: "getQbank", payload: response.data });
				})
				.catch(function(err) {
					dispatch({ type: "getQbankRejected", payload: err });
				});
		});
	};
}

export function updateAnswer(update) {
	return {
		type: "updateAnswer",
		payload: update
	};
}

export function testSubmission(ans) {
	return function(dispatch) {
		axios
			.post("https://scholarshiptest.kitcbe.com/test-submission", ans)
			.then(function(response) {
				dispatch({ type: "testSubmission", payload: response.data });
			})
			.catch(function(err) {
				dispatch({ type: "testSubmissionRejected", payload: err });
			});
	};
}
