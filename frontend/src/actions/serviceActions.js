import axios from 'axios';
import {
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
} from '../constants/serviceConstants';

export const listServices = () => async (dispatch) => {
  dispatch({ type: SERVICE_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/v1/services/list/');
    dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.detail || error.response.data
          : error.message,
    });
  }
};

export const detailsService = (id) => async (dispatch) => {
  dispatch({ type: SERVICE_DETAILS_REQUEST, payload: id });
  try {
    const { data } = await axios.get(`/api/v1/services/${id}/`);
    dispatch({ type: SERVICE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.detail || error.response.data
          : error.message,
    });
  }
};
