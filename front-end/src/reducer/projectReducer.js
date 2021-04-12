import {
	project_list_request,
	project_list_success,
	project_list_faild,
	project_create_new_request,
	project_create_new_success,
	project_create_new_faild,
	project_create_new_reset,
	project_detail_request,
	project_detail_success,
	project_detail_faild,
	project_admin_list_request,
	project_admin_list_success,
	project_admin_list_faild,
	project_admin_list_reset,
	project_edit_request,
	project_edit_success,
	project_edit_faild,
	project_edit_reset,
	project_delete_request,
	project_delete_success,
	project_delete_faild,
	project_delete_reset,
	project_detail_reset
} from '../constans/projectConstans';

export const projectListReducer = (state = { projects: [] }, action) => {
	switch (action.type) {
		case project_list_request:
			return { loading: true };
		case project_list_success:
			return { loading: false, projects: action.payload, success: true };
		case project_list_faild:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const projectCreateNewReducer = (state = {}, action) => {
	switch (action.type) {
		case project_create_new_request:
			return { loading: true };
		case project_create_new_success:
			return { loading: false, success: action.payload.success, message: action.payload.message };
		case project_create_new_faild:
			return { loading: false, error: action.payload };
		case project_create_new_reset:
			return {};
		default:
			return state;
	}
};

export const projectDetailReducer = (state = { project: {} }, action) => {
	switch (action.type) {
		case project_detail_request:
			return { loading: true };
		case project_detail_success:
			return { loading: false, project: action.payload };
		case project_detail_faild:
			return { loading: false, error: action.payload };
		case project_detail_reset:
			return { project: {} };
		default:
			return state;
	}
};

export const projectAdminListReducer = (state = {}, action) => {
	switch (action.type) {
		case project_admin_list_request:
			return { loading: true };
		case project_admin_list_success:
			return { loading: false, projects: action.payload };
		case project_admin_list_faild:
			return { loading: false, error: action.payload };
		case project_admin_list_reset:
			return {};
		default:
			return state;
	}
};

export const projectEditReducer = (state = { project: {} }, action) => {
	switch (action.type) {
		case project_edit_request:
			return { loading: true };
		case project_edit_success:
			return { loading: false, success: action.payload.success, message: action.payload.message };
		case project_edit_faild:
			return { loading: false, error: action.payload };
		case project_edit_reset:
			return {};
		default:
			return state;
	}
};

export const projectDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case project_delete_request:
			return { loading: true };
		case project_delete_success:
			return { laoding: false, message: action.payload.message, success: action.payload.success };
		case project_delete_faild:
			return { laoding: false, error: action.payload };
		case project_delete_reset:
			return {};
		default:
			return state;
	}
};
