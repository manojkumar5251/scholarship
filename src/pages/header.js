import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import Timer from "./timer";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { testSubmission } from "../actions/qbankAction";
import { testState } from "../actions/authAction";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { text: this.props.text };
	}

	render() {
		if (this.props.text === "Test") {
			return (
				<View style={this.props.style || styles.viewStyles}>
					<Icon.Button
						name={this.props.name}
						backgroundColor="red"
						size={25}
						style={{ marginLeft: 10 }}
						onPress={this.props.onPress}
					/>
					<Text style={styles.textStyles}>{this.props.text}</Text>
					<View
						style={{ flexDirection: "row", right: 10, position: "absolute" }}>
						<Timer
							initialSecondsRemaining={1800000}
							onTimeElapsed={() => {
								console.log("completed");
								let answer = {
									answers: this.props.qbanks.answer,
									_id: this.props._id
								};
								this.props.testSubmission(answer);
								Actions.pop();
								Alert.alert(
									"Success",
									" You have completed the test successfully",
									[
										{
											text: "OK",
											onPress: () =>
												console.log("You have completed the test successfully")
										}
									]
								);
							}}
							allowFontScaling={true}
							style={{ fontSize: 20, color: "white" }}
						/>
					</View>
				</View>
			);
		} else {
			return (
				<View style={this.props.style || styles.viewStyles}>
					<Icon.Button
						name={this.props.name}
						backgroundColor="red"
						size={25}
						style={{ marginLeft: 10 }}
						onPress={this.props.onPress}
					/>
					<Text style={styles.textStyles}>{this.props.text}</Text>
				</View>
			);
		}
	}
}

const styles = {
	viewStyles: {
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "red",
		height: 50
	},
	textStyles: {
		marginLeft: 20,
		color: "#ffffff",
		fontSize: 20
	}
};

function mapStateToProps(state) {
	return {
		qbanks: state.qbanks,
		_id: state.user.user._id
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ testSubmission }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
