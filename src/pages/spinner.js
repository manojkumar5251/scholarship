import React from "react";
import { View, Image, ActivityIndicator } from "react-native";

const Spinner = ({ size }) => {
	return (
		<View style={styles.containerstyle}>
			<ActivityIndicator
				size={size || "large"}
				style={{ justifyContent: "center" }}
			/>
			<Image
				source={require("@images/kit_logo.gif")}
				style={styles.imageStyles}
			/>
		</View>
	);
};

const styles = {
	containerstyle: {
		flex: 1,
		marginTop: 180,
		alignItems: "center"
	},
	imageStyles: {
		height: 150,
		width: 150
	}
};
export default Spinner;
