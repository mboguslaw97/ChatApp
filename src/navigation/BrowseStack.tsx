import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import browseMenuStackProps from '../screens/BrowseMenuScreen';
import chatRoomInfoStackProps from '../screens/ChatRoomInfoScreen';
import chatRoomStackProps from '../screens/ChatRoomScreen';
import contactListStackProps from '../screens/ContactListScreen';
import createChatStackProps from '../screens/CreateChatScreen';
import messageStackProps from '../screens/MessageScreen';
import profileStackProps from '../screens/ProfileScreen';
import { screenOptions } from './constants';

const Stack = createStackNavigator();

const BrowseStack: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen {...browseMenuStackProps} />
			<Stack.Screen {...chatRoomInfoStackProps} />
			<Stack.Screen {...chatRoomStackProps} />
			<Stack.Screen {...contactListStackProps} />
			<Stack.Screen {...createChatStackProps} />
			<Stack.Screen {...messageStackProps} />
			<Stack.Screen {...profileStackProps} />
		</Stack.Navigator>
	);
};

export default BrowseStack;
