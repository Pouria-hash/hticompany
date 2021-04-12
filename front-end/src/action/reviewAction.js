import axios from 'axios';
import {
	review_list_faild,
	review_list_request,
	review_list_success,
	review_new_faild,
	review_new_request,
	review_new_success
} from '../constans/reviewConstans';

export const listReview = () => async (dispatch) => {
	try {
		dispatch({ type: review_list_request });
		const { data } = await axios.get('/api/review');
		dispatch({ type: review_list_success, payload: data });
	} catch (error) {
		dispatch({
			type: review_list_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: review_new_request });
		const { data } = await axios.post('/api/review', reviewData);
		dispatch({ type: review_new_success, payload: data });
	} catch (error) {
		dispatch({
			type: review_new_faild,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
