import axios from 'axios';
import {PUBLISHER_REGISTRATION} from './types';

export const registration = values => async dispatch => {
	console.log(values);
	await axios.post('localhost:8080/publisher/requests', values).then(response => {
		dispatch({type: PUBLISHER_REGISTRATION, payload: response.data});
	});
};
