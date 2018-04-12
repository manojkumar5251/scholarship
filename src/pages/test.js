import React from "react";
import {
	View,
	Alert,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	Linking
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel
} from "react-native-simple-radio-button";

import axios from "axios";
import { Actions } from "react-native-router-flux";

import Header from "./header";
import Card from "./card";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getQbank, updateAnswer, testSubmission } from "../actions/qbankAction";
import { testState } from "../actions/authAction";

class Test extends React.Component {
	componentWillMount() {
		this.props.getQbank();
	}

	state = { period: null };

	saveAnswer = () => {
		let answer = {
			answers: this.props.qbanks.answer,
			_id: this.props._id
		};

		this.props.testSubmission(answer);
		Actions.pop();
		Alert.alert("Success", " You have completed the test successfully", [
			{
				text: "OK",
				onPress: () => console.log("You have completed the test successfully")
			}
		]);
	};

	proceed = () => {
		this.props.testState(true);
		let answer = {
			answers: this.props.qbanks.answer,
			_id: this.props._id
		};
		this.props.testSubmission(answer);
	};

	render() {
		if (
			// false
			this.props.started
			// true
		) {
			return (
				<View style={{ flex: 1 }}>
					<Header text="Test" />
					<ScrollView>
						{this.props.qbanks.qbank.map((qbank, j) => {
							return (
								<Card
									key={j}
									style={{
										container: {
											borderWidth: 1,
											borderColor: "#ddd",
											marginTop: 10
										}
									}}>
									<View>
										<View style={{ flexDirection: "row" }}>
											<Text
												style={{
													paddingVertical: 15,
													fontSize: 23,
													paddingLeft: 5,
													fontWeight: "500"
												}}>
												{j + 1}.
											</Text>
											<View
												style={{
													marginVertical: 10,
													paddingVertical: 5,
													paddingLeft: 13,
													paddingRight: 5,
													marginLeft: 10,
													marginRight: 45,
													borderWidth: 0.5,
													borderRadius: 5,
													borderColor: "#28B463",
													backgroundColor: "red"
												}}>
												<Text
													style={{
														fontSize: 18,
														color: "#fff",
														alignSelf: "center"
													}}>
													{qbank.question}
												</Text>
											</View>
										</View>
									</View>
									<View
										style={{
											alignItems: "flex-start",
											paddingLeft: "7%",
											paddingRight: "15%",
											width: "100%"
										}}>
										<RadioForm animation={true}>
											{qbank.choices.map((obj, i) => {
												var onPressed = value => {
													this.props.updateAnswer({ value: value, index: j });
												};
												return (
													<RadioButton
														key={i}
														style={{
															marginTop: 20,
															alignSelf: "flex-start"
														}}>
														<RadioButtonInput
															obj={obj}
															index={i}
															isSelected={this.props.qbanks.answer[j] === i + 1}
															onPress={onPressed}
															buttonInnerColor={"red"}
															buttonOuterColor={
																this.props.qbanks.answer[j] === i + 1
																	? "#800"
																	: "#800"
															}
															buttonSize={7}
														/>
														<View
															style={{
																marginLeft: 10,
																borderWidth: 0.5,
																borderRadius: 4,
																backgroundColor:
																	this.props.qbanks.answer[j] === i + 1
																		? "green"
																		: "#fff"
															}}>
															<RadioButtonLabel
																obj={obj}
																index={i}
																onPress={onPressed}
																labelStyle={{
																	marginLeft: 10,
																	fontSize: 15,
																	paddingRight: 10,
																	marginTop: 5,
																	marginBottom: 10,
																	color:
																		this.props.qbanks.answer[j] === i + 1
																			? "white"
																			: "black"
																}}
															/>
														</View>
													</RadioButton>
												);
											})}
										</RadioForm>
									</View>
								</Card>
							);
						})}
						<TouchableOpacity
							style={{
								alignSelf: "center",
								borderRadius: 20,
								backgroundColor: "#ff211c",
								width: 150,
								elevation: 5,
								marginTop: 10,
								marginBottom: 20
							}}
							onPress={this.saveAnswer.bind(this)}>
							<Text
								style={{
									fontSize: 20,
									color: "#fff",
									height: 40,
									paddingTop: 5,
									alignSelf: "center"
								}}>
								SUBMIT
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1 }}>
					<Header
						text="Instruction"
						name="md-arrow-back"
						onPress={Actions.pop}
					/>
					<ScrollView>
						<Card
							style={{
								container: {
									borderWidth: 1,
									borderColor: "#ddd",
									marginTop: 10
								}
							}}>
							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Before beginning the exam, Make sure you have a good internet
									connection.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Exams is conducted only once.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Please wait untill your answer is highlighted and then proceed
									to next question.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Once an answer is clicked, it can only be changed between the
									existing answers. It cannot be unchecked.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									If you are having any query with the exams ,consult the
									superiors.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									If you encounter problems accessing or submitting your exam,
									you must contact your instructor immediately by phone.
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									The exam must be completed in one sitting. You can only open
									it once.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Time duration for the exam is 30 minutes.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Click the “Submit” button to submit your exam.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Complete the test within 30 minutes.If not, your answers will
									be submitted automatically.
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									To attend the test click the "Proceed" button given below.
								</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									marginLeft: 8,
									marginBottom: 9
								}}>
								<Icon
									name="ios-star"
									size={15}
									color="#900"
									style={{
										color: "#000",
										marginRight: 5,
										marginTop: 5
									}}
								/>
								<Text
									style={{
										fontSize: 17,
										color: "#000"
									}}>
									Do not copy the answers from neighbours.
								</Text>
							</View>

							<Text
								style={{
									marginBottom: 9,
									alignSelf: "center",
									fontSize: 19,
									color: "#000"
								}}>
								ALL THE BEST
							</Text>
						</Card>

						<TouchableOpacity
							style={{
								alignSelf: "center",
								borderRadius: 20,
								backgroundColor: "#ff211c",
								width: 150,
								elevation: 5,
								marginTop: 10,
								marginBottom: 20
							}}
							onPress={this.proceed.bind(this)}>
							<Text
								style={{
									fontSize: 20,
									color: "#fff",
									height: 35,
									paddingTop: 5,
									alignSelf: "center"
								}}>
								PROCEED
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		qbanks: state.qbanks,
		started: state.user.user.started,
		_id: state.user.user._id
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{ getQbank, updateAnswer, testState, testSubmission },
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
