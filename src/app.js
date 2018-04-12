import React from "react";
import { Router, Scene } from "react-native-router-flux";

import store from "./store/store";
import { Provider } from "react-redux";
import reducers from "./reducers";

import Login from "./login";
import Main from "./main";
import SignUp from "./signup";

import Coaching from "./pages/coaching";
import Profile from "./pages/profile";
import Test from "./pages/test";

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Scene key="root">
						<Scene
							key="login"
							component={Login}
							hideNavBar
							panHandlers={null}
						/>
						<Scene key="signup" component={SignUp} panHandlers={null} />
						<Scene key="main" component={Main} panHandlers={null} />
						<Scene key="profile" component={Profile} panHandlers={null} />
						<Scene key="coach" component={Coaching} panHandlers={null} />
						<Scene key="test" component={Test} panHandlers={null} />
					</Scene>
				</Router>
			</Provider>
		);
	}
}



export default App;
