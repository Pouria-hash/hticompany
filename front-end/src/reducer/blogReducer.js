import {
	post_list_request,
	post_list_success,
	post_list_faild,
	post_create_request,
	post_create_success,
	post_create_faild,
	post_create_reset,
	post_detail_request,
	post_detail_success,
	post_detail_faild,
	post_edit_request,
	post_edit_success,
	post_edit_faild,
	post_edit_reset,
	post_delete_request,
	post_delete_success,
	post_delete_faild,
	post_delete_reset,
	post_home_list_request,
	post_home_list_success,
	post_home_list_faild
} from '../constans/blogConstans';

export const postListReducer = (state = { posts: [] }, action) => {
	switch (action.type) {
		case post_list_request:
			return { loading: true };
		case post_list_success:
			return { loading: false, posts: action.payload };
		case post_list_faild:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const postCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case post_create_request:
			return { loading: true };
		case post_create_success:
			return { loading: false, message: action.payload.message, success: action.payload.success };
		case post_create_faild:
			return { loading: false, error: action.payload };
		case post_create_reset:
			return {};
		default:
			return state;
	}
};

export const postDetailReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case post_detail_request:
			return { loading: true };
		case post_detail_success:
			return { loading: false, post: action.payload };
		case post_detail_faild:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const postEditReducer = (state = {}, action) => {
	switch (action.type) {
		case post_edit_request:
			return { loading: true };
		case post_edit_success:
			return { loading: false, message: action.payload.message, success: action.payload.success };
		case post_edit_faild:
			return { loading: false, error: action.payload };
		case post_edit_reset:
			return {};
		default:
			return state;
	}
};

export const postDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case post_delete_request:
			return { loading: true };
		case post_delete_success:
			return { loading: false, message: action.payload.message, success: action.payload.success };
		case post_delete_faild:
			return { loading: false, error: action.payload };
		case post_delete_reset:
			return {};
		default:
			return state;
	}
};

export const postHomeListReducer = (state = { post: [] }, action) => {
	switch (action.type) {
		case post_home_list_request:
			return { loading: true };
		case post_home_list_success:
			return { loading: false, posts: action.payload };
		case post_home_list_faild:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
