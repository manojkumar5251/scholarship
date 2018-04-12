import React from "react";
import {
	Image,
	View,
	ScrollView,
	StatusBar,
	Text,
	Alert,
	TouchableOpacity,
	TextInput,
	DrawerLayoutAndroid,
	ToastAndroid
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import Spinner from "./pages/spinner";
import Drawer from "./pages/drawer";
import Header from "./pages/header";

class Main extends React.Component {
	

	proceed_to_test() {
		if (
			this.props.started
			// false
		) {
			Alert.alert("Attention", " You have attended the test!!!", [
				{
					text: "OK",
					onPress: () => console.log("You have attended the test!!!")
				}
			]);
		} else {
			Actions.test();
		}
	}

	render() {
		return (
			<DrawerLayoutAndroid
				ref="drawer"
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => {
					return <Drawer refd={this.refs.drawer} />;
				}}>
				<StatusBar backgroundColor="#D20317" />

				<Header
					onPress={() => this.refs.drawer.openDrawer()}
					name="ios-menu"
					text="HOME"
				/>
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.viewStyles2}>
						<Image
							source={require("@images/home_img.jpg")}
							style={styles.imageStyles}
						/>
						<TouchableOpacity
							style={styles.touchStyles}
							onPress={() => {
								Actions.coach();
							}}>
							<Text style={styles.textStyles}>NEET Coaching</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.touchStyles}
							onPress={() => {
								this.proceed_to_test.bind(this)();
							}}>
							<Text style={styles.textStyles}>Online Test</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</DrawerLayoutAndroid>
		);
	}
}

const styles = {
	viewStyles1: {
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "red",
		height: 60
	},
	viewStyles2: {
		alignItems: "center",
		paddingBottom: 15,
		height: "50%"
	},
	textStyle: {
		color: "#ffffff",
		fontSize: 20
	},
	imageStyles: {
		alignItems: "center",
		height: 250,
		width: "100%"
	},
	touchStyles: {
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: "#ff211c",
		height: 40,
		width: 200,
		elevation: 5,
		marginTop: 25
	},
	textStyles: {
		fontSize: 23,
		color: "#ffffff"
	}
};
function mapStateToProps(state) {
	return { started: state.user.user.started };
}

export default connect(mapStateToProps)(Main);
