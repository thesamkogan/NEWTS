import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_NEWTS = 'GET_NEWTS';
const NEW_NEWT = 'NEW_NEWT';
const EDIT_NEWT = 'EDIT_NEWT';
const DELETE_NEWT = 'DELETE_NEWT';

/**
 * ACTION CREATORS
 */
const getNewts = newts => ({ type: GET_NEWTS, newts });
const newNewt = newt => ({ type: NEW_NEWT, newt });
const editNewt = newt => ({ type: EDIT_NEWT, newt });
const killNewt = id => ({ type: DELETE_NEWT, id });

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_NEWTS:
      return action.newts;
    case NEW_NEWT: {
      console.log('hereeeeee');
      return [action.newt, ...state];
    }
    case EDIT_NEWT:
      return state.map(
        newt => (action.newt.id === newt.id ? action.newt : newt)
      );
    case DELETE_NEWT:
      return state.filter(newt => newt.id !== action.id);
    default:
      return state;
  }
}

/**
 * THUNK CREATORS
 */
export const fetchNewts = () => dispatch =>
  axios
    .get('/api/newts')
    .then(res => dispatch(getNewts(res.data)))
    .catch(err => console.log(err));

export const createNewt = newt => dispatch =>
  axios
    .post('/api/newts', newt)
    .then(res => dispatch(newNewt(res.data)))
    .catch(err => console.log(err));

export const updateNewt = (id, newt) => dispatch =>
  axios
    .put(`/api/newts/${id}`, newt)
    .then(res => {
      return dispatch(editNewt(res.data));
    })
    .catch(err => console.log(err));

export const deleteNewt = id => dispatch => {
  axios
    .delete(`/api/newts/${id}`)
    .then(() => dispatch(killNewt(id)))
    .catch(err => console.error(`Removing newt: ${id} unsuccessful`, err));
};
