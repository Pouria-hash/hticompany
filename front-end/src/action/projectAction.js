import axios from 'axios';
import {
	project_list_request,
	project_list_success,
	project_list_faild,
	project_create_new_request,
	project_create_new_success,
	project_create_new_faild,
	project_detail_request,
	project_detail_success,
	project_detail_faild,
	project_admin_list_request,
	project_admin_list_success,
	project_admin_list_faild,
	project_edit_request,
	project_edit_success,
	project_edit_faild,
	project_delete_success,
	project_delete_request,
	project_delete_faild
} from '../constans/projectConstans';

export const listOfProject = () => async (dispatch) => {
	try {
		dispatch({ type: project_list_request });
		const { data } = await axios.get('/api/projects');
		dispatch({ type: project_list_success, payload: data });
	} catch (error) {
		dispatch({
			type: project_list_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const createNewProject = (projectData) => async (dispatch) => {
	try {
		dispatch({ type: project_create_new_request });
		const { data } = await axios.post('/api/projects/new', projectData);
		dispatch({ type: project_create_new_success, payload: data });
	} catch (error) {
		dispatch({
			type: project_create_new_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const detailProject = (projectId) => async (dispatch) => {
	try {
		dispatch({ type: project_detail_request });
		const { data } = await axios.get(`/api/projects/${projectId}`);
		dispatch({ type: project_detail_success, payload: data });
	} catch (error) {
		dispatch({
			type: project_detail_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const adminListOfProject = () => async (dispatch) => {
	try {
		dispatch({ type: project_admin_list_request });
		const { data } = await axios.get('/api/projects');
		dispatch({ type: project_admin_list_success, payload: data });
	} catch (error) {
		dispatch({
			type: project_admin_list_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const editProject = (id, projectData) => async (dispatch) => {
	try {
		dispatch({ type: project_edit_request });
		console.log(projectData);
		const { data } = await axios.put(`/api/projects/${id}`, projectData);
		dispatch({ type: project_edit_success, payload: data });
	} catch (error) {
		dispatch({
			type: project_edit_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const deleteProject = (id) => async (dispatch) => {
	try {
		dispatch({ type: project_delete_request });
		const { data } = await axios.delete(`/api/projects/${id}`);
		dispatch({ type: project_delete_success, payload: data });
	} catch (error) {
		dispatch({
			type: project_delete_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
