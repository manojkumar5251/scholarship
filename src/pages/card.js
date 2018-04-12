import React from "react";
import { View } from "react-native";

const Card = props => {
	return <View style={styles.containerStyles}>{props.children}</View>;
};

const styles = {
	containerStyles: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: "#ddd",
		borderBottomWidth: 0,
		shadowColor: "#000",
		shadowOffset: { Width: 0, Hieght: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 8,
		marginTop: 10
	}
};

export default Card;
