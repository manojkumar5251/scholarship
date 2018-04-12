import React from "react";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	Linking
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import Header from "./header";

class Coaching extends React.Component {
	render() {
		return (
			<View style={{flex:1}}>
				<Header text="Coaching" name="md-arrow-back" onPress={Actions.pop} />
				<View style={{flex:1,alignItems: "center",justifyContent:"center"}}>
					<Text style={{fontSize: 23,color: "#100"}}>
						Coming Soon
					</Text>
				</View>
			</View>
		);
	}
}

export default Coaching;
