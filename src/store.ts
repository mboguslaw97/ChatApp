import { configureStore, createSlice } from '@reduxjs/toolkit';

import { ChatRoom, ChatRoomUser, Contact, Message, User } from './global/types';

export type BrowseChatRooms = ChatRoom[];

export type ReduxStore = {
	browseChatRooms: BrowseChatRooms;
	currentUser: User;
};

const initialState: ReduxStore = {
	browseChatRooms: [],
	currentUser: {
		avatar: '',
		bio: '',
		chatRoomUsers: { items: [] },
		displayName: '',
		email: '',
		followees: { items: [] },
		followers: { items: [] },
		id: '',
		name: '',
		phone: '',
		pushToken: '',
	},
};

const slice = createSlice({
	initialState,
	name: 'root',
	reducers: {
		createChatRoomUser: (
			state: ReduxStore,
			action: { payload: ChatRoomUser }
		) => {
			state.currentUser.chatRoomUsers.items.push(action.payload);
			state.browseChatRooms = state.browseChatRooms.filter(
				chatRoom => chatRoom.id !== action.payload.chatRoomId
			);
		},
		createFollowee: (state: ReduxStore, action: { payload: Contact }) => {
			const contact = action.payload;
			state.currentUser.followees.items.push(contact);
		},
		createFollower: (state: ReduxStore, action: { payload: Contact }) => {
			const contact = action.payload;
			state.currentUser.followers.items.push(contact);
		},
		createMessage: (state: ReduxStore, action: { payload: Message }) => {
			state.currentUser.chatRoomUsers.items.forEach(chatRoomUser => {
				if (chatRoomUser.chatRoom.id !== action.payload.chatRoomId) return;
				const { messages } = chatRoomUser.chatRoom;
				if (!messages.items) messages.items = [];
				messages.items.push(action.payload);
			});
		},
		deleteChatRoomUser: (
			state: ReduxStore,
			action: { payload: ChatRoomUser }
		) => {
			const { chatRoomUsers } = state.currentUser;
			chatRoomUsers.items = chatRoomUsers.items.filter(
				chatRoomUser => chatRoomUser.id !== action.payload.id
			);
		},
		deleteFollowee: (state: ReduxStore, action: { payload: Contact }) => {
			const contact = action.payload;
			state.currentUser.followees.items =
				state.currentUser.followees.items.filter(
					followee => followee.id !== contact.id
				);
		},
		deleteFollower: (state: ReduxStore, action: { payload: Contact }) => {
			const contact = action.payload;
			state.currentUser.followers.items =
				state.currentUser.followers.items.filter(
					follower => follower.id !== contact.id
				);
		},
		setBrowseChatRooms: (
			state: ReduxStore,
			action: { payload: BrowseChatRooms }
		) => {
			// Filter out any chatRooms currentUser is already in
			// or has no chatRoomUsers
			state.browseChatRooms = action.payload.filter(
				chatRoom =>
					!chatRoom.chatRoomUsers.items.find(
						chatRoomUser => chatRoomUser.userId === state.currentUser.id
					) // && chatRoom.chatRoomUsers.items.length
			);
		},
		setCurrentUser: (state: ReduxStore, action: { payload: User }) => {
			state.currentUser = action.payload;
		},
	},
});

export const Actions = slice.actions;
export default configureStore({ reducer: slice.reducer });
