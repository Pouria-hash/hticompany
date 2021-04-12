import axios from 'axios';
import {
	post_list_request,
	post_list_success,
	post_list_faild,
	post_create_request,
	post_create_success,
	post_create_faild,
	post_detail_request,
	post_detail_success,
	post_detail_faild,
	post_edit_request,
	post_edit_success,
	post_edit_faild,
	post_delete_request,
	post_delete_success,
	post_delete_faild,
	post_home_list_request,
	post_home_list_success,
	post_home_list_faild
} from '../constans/blogConstans';

export const listOfPost = () => async (dispatch) => {
	try {
		dispatch({ type: post_list_request });
		const { data } = await axios.get('/api/blog');
		dispatch({ type: post_list_success, payload: data });
	} catch (error) {
		dispatch({
			type: post_list_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const createNewPost = (post) => async (dispatch) => {
	try {
		dispatch({ type: post_create_request });
		const { data } = await axios.post('/api/blog', post);
		dispatch({ type: post_create_success, payload: data });
	} catch (error) {
		dispatch({
			type: post_create_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const detailPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: post_detail_request });
		const { data } = await axios.get(`/api/blog/post/${id}`);
		dispatch({ type: post_detail_success, payload: data });
	} catch (error) {
		dispatch({
			type: post_detail_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const editPost = (id, postData) => async (dispatch) => {
	try {
		dispatch({ type: post_edit_request });
		const { data } = await axios.put(`/api/blog/post/${id}`, postData);
		dispatch({ type: post_edit_success, payload: data });
	} catch (error) {
		dispatch({
			type: post_edit_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		dispatch({ type: post_delete_request });
		console.log(id);
		const { data } = await axios.delete(`/api/blog/post/${id}`);
		dispatch({ type: post_delete_success, payload: data });
	} catch (error) {
		dispatch({
			type: post_delete_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const homeListPost = () => async (dispatch) => {
	try {
		dispatch({ type: post_home_list_request });
		const { data } = await axios.get(`/api/blog/home`);
		dispatch({ type: post_home_list_success, payload: data });
	} catch (error) {
		dispatch({
			type: post_home_list_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
