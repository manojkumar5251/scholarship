import React from "react";
import {
	View,
	ScrollView,
	Text,
	Picker,
	Image,
	TextInput,
	TouchableOpacity,
	Alert
} from "react-native";
import { Actions } from "react-native-router-flux";

import Main from "./main";

import Spinner from "./pages/spinner";

import { signUp } from "./actions/authAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class SignUp extends React.Component {
	state = {
		email: "",
		name: "",
		f_name: "",
		phno: "",
		gp: "",
		paswd: "",
		rpaswd: ""
	};

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

	handleSignup() {
		const user = {
			email: this.state.email,
			password: this.state.paswd,
			fullname: this.state.name,
			fathersname: this.state.f_name,
			contactnumber: this.state.phno,
			groupin12th: this.state.gp
		};
		this.props.signUp(user);
	}

	handleSubmit() {
		// checking input required
		if (
			this.state.email == "" ||
			this.state.paswd == "" ||
			this.state.name == "" ||
			this.state.f_name == "" ||
			this.state.phno == "" ||
			this.state.gp == ""
		) {
			Alert.alert("ERROR", " please checkout all fields", [
				{ text: "OK", onPress: () => console.log("please checkout all fields") }
			]);
		} else if (this.validateEmail() == false) {
			Alert.alert("ERROR", " Enter a valid e-mail address", [
				{
					text: "OK",
					onPress: () => console.log("Enter a valid e-mail address")
				}
			]);
		} else {
			if (this.state.paswd != this.state.rpaswd) {
				Alert.alert("ERROR", " password does not match", [
					{ text: "OK", onPress: () => console.log("password does not match") }
				]);
			} else {
				this.handleSignup();
			}
		}
	}

	render() {
		return (
			<ScrollView style={{ flex: 1 }}>
				<Image
					source={require("@images/kit_logo.gif")}
					style={styles.imageStyles}
				/>
				<View style={{ alignItems: "center", marginBottom: 10 }}>
					<TextInput
						underlineColorAndroid="rgba(0,0,0,0)"
						onSubmitEditing={() => this.refs.name.focus()}
						style={styles.inputStyles}
						placeholder="Email"
						placeholderTextColor="#000"
						keyboardType="email-address"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>

					<TextInput
						underlineColorAndroid="rgba(0,0,0,0)"
						ref="name"
						onSubmitEditing={() => this.refs.f_name.focus()}
						style={styles.inputStyles}
						autoCapitalize="characters"
						placeholder="Name"
						placeholderTextColor="#000"
						value={this.state.name}
						onChangeText={name => this.setState({ name })}
					/>

					<TextInput
						underlineColorAndroid="rgba(0,0,0,0)"
						ref="f_name"
						onSubmitEditing={() => this.refs.gp.focus()}
						style={styles.inputStyles}
						autoCapitalize="characters"
						placeholder="Father Name"
						placeholderTextColor="#000"
						value={this.state.f_name}
						onChangeText={f_name => this.setState({ f_name })}
					/>

					<TextInput
						underlineColorAndroid="rgba(0,0,0,0)"
						ref="gp"
						onSubmitEditing={() => this.refs.phno.focus()}
						style={styles.inputStyles}
						autoCapitalize="characters"
						placeholder="12ᵗʰ Group"
						placeholderTextColor="#000"
						value={this.state.gp}
						onChangeText={gp => this.setState({ gp })}
					/>

					<TextInput
						underlineColorAndroid="rgba(0,0,0,0)"
						ref="phno"
						onSubmitEditing={() => this.refs.ipaswd.focus()}
						style={styles.inputStyles}
						placeholder="Contact number"
						placeholderTextColor="#000"
						keyboardType="numeric"
						value={this.state.phno}
						onChangeText={phno => this.setState({ phno })}
					/>
					<TextInput
						underlineColorAndroid="rgba(0,0,0,0)"
						ref="ipaswd"
						onSubmitEditing={() => this.refs.irpaswd.focus()}
						secureTextEntry={true}
						style={styles.inputStyles}
						placeholder="Password"
						placeholderTextColor="#000"
						value={this.state.paswd}
						onChangeText={paswd => this.setState({ paswd })}
					/>
					<TextInput
						underlineColorAndroid="rgba(0,0,0,0)"
						ref="irpaswd"
						onSubmitEditing={this.handleSubmit.bind(this)}
						secureTextEntry={true}
						style={styles.inputStyles}
						placeholder="Confirm Password"
						placeholderTextColor="#000"
						value={this.state.rpaswd}
						onChangeText={rpaswd => this.setState({ rpaswd })}
					/>
					<TouchableOpacity
						style={styles.touchStyles}
						onPress={this.handleSubmit.bind(this)}>
						<Text style={styles.buttontext}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const styles = {
	imageStyles: {
		alignSelf: "center",
		height: 150,
		width: 150
	},

	touchStyles: {
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: "#ff211c",
		width: 150,
		shadowColor: "#000000",
		elevation: 7,
		shadowOffset: { width: 0, height: 1 }
	},
	inputStyles: {
		marginBottom: 20,
		paddingLeft: 30,
		paddingRight: 30,
		borderWidth: 1.5,
		height: 50,
		borderColor: "gray",
		borderRadius: 50,
		width: "80%"
	},
	buttontext: {
		fontSize: 21,
		color: "#ffffff"
	}
};

function mapDispathToProps(dispatch) {
	return bindActionCreators({ signUp }, dispatch);
}

export default connect(null, mapDispathToProps)(SignUp);
