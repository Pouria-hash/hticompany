import { combineReducers, createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userProfileUpdateReducer } from '../reducer/userReducer';
import {
	projectListReducer,
	projectCreateNewReducer,
	projectDetailReducer,
	projectAdminListReducer,
	projectEditReducer,
	projectDeleteReducer
} from '../reducer/projectReducer';
import {
	postListReducer,
	postCreateReducer,
	postDetailReducer,
	postEditReducer,
	postDeleteReducer,
	postHomeListReducer
} from '../reducer/blogReducer';

import { reviewListReducer, reviewNewReducer } from '../reducer/reviewReducer';
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userProfileUpdate: userProfileUpdateReducer,
	projectList: projectListReducer,
	projectCreateNew: projectCreateNewReducer,
	projectDetail: projectDetailReducer,
	projectAdminList: projectAdminListReducer,
	projectEdit: projectEditReducer,
	projectDelete: projectDeleteReducer,
	postList: postListReducer,
	postCreate: postCreateReducer,
	postDetail: postDetailReducer,
	postEdit: postEditReducer,
	postDelete: postDeleteReducer,
	postHomeList: postHomeListReducer,
	reviewList: reviewListReducer,
	reviewNew: reviewNewReducer
});

const initialState = {
	userLogin: {
		userInfo: userInfoFromStorage
	}
};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
