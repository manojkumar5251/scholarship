import React from "react";
import {
	View,
	ScrollView,
	Image,
	Alert,
	Text,
	StatusBar,
	TouchableOpacity,
	TextInput
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import Main from "./main";
import Spinner from "./pages/spinner";
import { getAuth, signIn, forgotPassword } from "./actions/authAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { email: "", paswd: "", time: "", totalSeconds: 1800 };
	}

	componentWillMount() {
		this.props.getAuth();
	}

	onLoginPress() {
		const user = {
			email: this.state.email,
			password: this.state.paswd
		};
		if (user.email == "" || user.password == "") {
			Alert.alert("ERROR", " checkout all fields", [
				{ text: "OK", onPress: () => console.log("checkout all fields") }
			]);
		} else {
			this.setState({ error: "", email: "", paswd: "" });
			this.props.signIn(user);
		}
	}

	validateEmail() {
		var x = this.state.email;
		var atpos = x.indexOf("@");
		var dotpos = x.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
			return false;
		} else {
			return true;
		}
	}

	onForgotPress() {
		if (this.state.email !== "") {
			if (this.validateEmail()) {
				let email = this.state.email;
				this.props.forgotPassword({ email });
				this.setState({ email: "" });
			} else {
				this.setState({ email: "" });
				Alert.alert("ERROR", " Invalid Email-id", [
					{
						text: "OK",
						onPress: () => console.log("Invalid Email-id")
					}
				]);
			}
		} else {
			this.setState({ email: "" });
			Alert.alert("ERROR", " Please enter your Email-id", [
				{ text: "OK", onPress: () => console.log("Please enter your Email-id") }
			]);
		}
	}

	loginFunc() {
		return (
			<ScrollView>
				<StatusBar backgroundColor="#FD0018" />
				<View style={styles.h_viewStyles}>
					<Image
						source={require("@images/kit_logo.gif")}
						style={styles.imageStyles}
					/>
					<Text style={styles.h_textStyles}>KALIGNAR KARUNANIDHI</Text>
					<Text style={styles.h_textStyles}>INSTITUE OF TECHNOLOGY</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<TextInput
						onSubmitEditing={() => this.refs.ipaswd.focus()}
						style={styles.inputStyles}
						placeholder="Email id"
						keyboardType="email-address"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
						underlineColorAndroid="black"
					/>
					<TextInput
						ref="ipaswd"
						onSubmitEditing={this.onLoginPress.bind(this)}
						secureTextEntry={true}
						style={styles.inputStyles}
						placeholder="Password"
						value={this.state.paswd}
						onChangeText={paswd => this.setState({ paswd })}
						underlineColorAndroid="black"
					/>
					<TouchableOpacity
						style={styles.touchStyles}
						onPress={this.onLoginPress.bind(this)}>
						<Text style={styles.textStyles}>LOGIN</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.touchStyles} onPress={Actions.signup}>
						<Text style={styles.textStyles}>SIGNUP</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onForgotPress.bind(this)}>
						<Text style={styles.forgotPasswordStyles}>Forgot Password?</Text>
					</TouchableOpacity>
					<Text style={styles.lastTextStyles}>© CopyRight-2017</Text>
				</View>
			</ScrollView>
		);
	}

	render() {
		switch (this.props.show) {
			case true:
				return <Main />;
				break;
			case false:
				return <View style={{ flex: 1 }}>{this.loginFunc()}</View>;
				break;
			default:
				return (
					<View style={{ flex: 1 }}>
						<Spinner size="large" />
					</View>
				);
		}
	}
}

const styles = {
	touchStyles: {
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: "#ff211c",
		width: 150,
		elevation: 5,
		marginTop: 20
	},
	inputStyles: {
		height: 50,
		borderColor: "#E53935",
		marginTop: 10,
		width: "80%"
	},
	textStyles: {
		fontSize: 23,
		color: "#ffffff"
	},
	lastTextStyles: {
		fontSize: 15,
		color: "#100",
		marginTop: 30
	},
	forgotPasswordStyles: {
		fontSize: 17,
		color: "#190558",
		marginTop: 20
	},
	imageStyles: {
		marginTop: 5,
		height: 160,
		width: 160,
		marginBottom: 10
	},
	h_textStyles: {
		color: "black",
		fontStyle: "italic",
		fontSize: 15,
		alignItems: "center"
	},
	h_viewStyles: {
		alignItems: "center",
		marginBottom: 5
	}
};

function mapStateToProps(state) {
	return {
		user: state.user.user,
		show: state.user.show
	};
}

function mapDispathToProps(dispatch) {
	return bindActionCreators({ getAuth, signIn, forgotPassword }, dispatch);
}

export default connect(mapStateToProps, mapDispathToProps)(Login);
