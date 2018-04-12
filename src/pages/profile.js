import React from "react";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	Linking
} from "react-native";

import Header from "./header";

import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

class Profile extends React.Component {
	render() {
		return (
			<View style={{flex:1}}>
				<Header text="Profile" name="md-arrow-back" onPress={Actions.pop} />
				<ScrollView>
					<Text style={styles.h_textStyles}>Name</Text>
					<Text style={styles.v_textStyles}>{this.props.user.fullname}</Text>
					<View style={{height:0.7,width:'100%',backgroundColor:"#e8ebef"}}></View>
					<Text style={styles.h_textStyles}>Father's Name</Text>
					<Text style={styles.v_textStyles}>{this.props.user.fathersname}</Text>
					<View style={{height:0.7,width:'100%',backgroundColor:"#e8ebef"}}></View>
					<Text style={styles.h_textStyles}>EMAIL ID</Text>
					<Text style={styles.v_textStyles}>{this.props.user.email}</Text>
					<View style={{height:0.7,width:'100%',backgroundColor:"#e8ebef"}}></View>
					<Text style={styles.h_textStyles}>Phone Number</Text>
					<Text style={styles.v_textStyles}>{this.props.user.contactnumber}</Text>
					<View style={{height:0.7,width:'100%',backgroundColor:"#e8ebef"}}></View>
					<Text style={styles.h_textStyles}>12ᵗʰ Group</Text>
					<Text style={styles.v_textStyles}>{this.props.user.groupin12th}</Text>
					<View style={{height:0.7,width:'100%',backgroundColor:"#e8ebef"}}></View>
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	h_textStyles: {
		fontSize: 21,
		color: "#abaeb2",
		marginTop:4,
		alignSelf: "center"
	},
	v_textStyles:{
		fontSize: 15,
		color: "#100",
		alignSelf: "center",
		marginBottom:10
	}
};

function mapStateToProps(state) {
	return { user: state.user.user };
}

export default connect(mapStateToProps)(Profile);
