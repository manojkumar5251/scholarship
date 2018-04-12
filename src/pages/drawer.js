import React from "react";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	Linking
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { logout } from "../actions/authAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Drawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { no: "", name: "" };
	}

	render(props) {
		return (
			<ScrollView style={{ flex: 1 }}>
				<View>
					<Image
						source={require("@images/home_img.jpg")}
						style={styles.imageStyles}>
						<Text
							style={{
								color: "white",
								alignSelf: "flex-start",
								marginBottom: 9,
								marginLeft: 13
							}}>
							{this.state.no}
						</Text>
						<Text
							style={{
								color: "white",
								alignSelf: "flex-start",
								marginLeft: 13
							}}>
							{this.state.name}
						</Text>
					</Image>
				</View>

				<View style={{ backgroundColor: "#fff", paddingLeft: 7 }}>
					<Icon.Button
						name="ios-home"
						size={28}
						color="gray"
						backgroundColor="white"
						style={styles.menuStyles}
						onPress={() => {
							this.props.refd.closeDrawer();
						}}>
						<Text style={styles.menuTextStyles}>Home</Text>
					</Icon.Button>
					<Icon.Button
						name="ios-person"
						size={28}
						color="gray"
						backgroundColor="white"
						style={styles.menuStyles}
						onPress={() => {
							Actions.profile();
							this.props.refd.closeDrawer();
						}}>
						<Text style={styles.menuTextStyles}>Profile</Text>
					</Icon.Button>
					<Icon.Button
						name="ios-star"
						size={28}
						color="gray"
						backgroundColor="white"
						style={styles.menuStyles}
						onPress={() => {
							Linking.openURL(
								"https://play.google.com/store/apps/details?id=com.kitscholarship"
							);
							this.props.refd.closeDrawer();
						}}>
						<Text style={styles.menuTextStyles}>Rate Us</Text>
					</Icon.Button>
					<Icon.Button
						name="ios-log-out"
						size={28}
						color="gray"
						backgroundColor="white"
						style={styles.menuStyles}
						onPress={() => {
							this.props.logout();
							this.props.refd.closeDrawer();
						}}>
						<Text style={styles.menuTextStyles}>LOGOUT</Text>
					</Icon.Button>
				</View>
				<View style={{ alignItems: "center",marginTop:30 }}>
					<Text>Created By</Text>
					<Text>II Year ECE Students</Text>
					{/* <Text>S.Manoj Kumar    M.Gowtham    Baskar Yabase</Text> */}
					<Text>S.Manoj Kumar</Text>
					<Text>M.Gowtham</Text>
					<Text>Baskar</Text>
					<Text>KIT-InfoNest</Text>

				</View>
			</ScrollView>
		);
	}
}

const styles = {
	imageStyles: {
		width: 300,
		height: 180,
		paddingBottom: 10,
		flexDirection: "column",
		justifyContent: "flex-end"
	},
	buttonStyles: {
		marginTop: 10,
		borderRadius: 5,
		backgroundColor: "#d80d0d",
		borderColor: "white",
		width: 130,
		height: 32,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	menuStyles: {
		height: 50
	},
	menuTextStyles: {
		color: "black",
		fontSize: 17,
		marginLeft: 12
	}
};

function mapStateToProps(state) {
	return {
		user: state.user.user
	};
}

function mapDispathToProps(dispatch) {
	return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, mapDispathToProps)(Drawer);
