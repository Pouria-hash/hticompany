import {
	review_list_faild,
	review_list_request,
	review_list_reset,
	review_list_success,
	review_new_faild,
	review_new_request,
	review_new_reset,
	review_new_success
} from '../constans/reviewConstans';

export const reviewListReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case review_list_request:
			return { loading: true };
		case review_list_success:
			return { loading: false, reviews: action.payload, errorBackend: action.payload.message };
		case review_list_faild:
			return { loading: false, error: action.payload };
		case review_list_reset:
			return { reviews: [] };
		default:
			return state;
	}
};

export const reviewNewReducer = (state = {}, action) => {
	switch (action.type) {
		case review_new_request:
			return { loading: true };
		case review_new_success:
			return { loading: false, message: action.payload.message, success: action.payload.success };
		case review_new_faild:
			return { loading: false, error: action.payload };
		case review_new_reset:
			return {};
		default:
			return state;
	}
};
