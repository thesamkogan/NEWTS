import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_NEWTS = 'GET_NEWTS'
const NEW_NEWT = 'NEW_NEWT'
const EDIT_NEWT = 'EDIT_NEWT'
const DELETE_NEWT = 'DELETE_NEWT'

/**
 * ACTION CREATORS
 */
const getNewts = newts => ({type: GET_NEWTS, newts})
const newNewt = newt => ({type: NEW_NEWT, newt})
const editNewt = newt => ({type: EDIT_NEWT, newt})
const killNewt = id => ({type: DELETE_NEWT, id})

/**
 * THUNK CREATORS
 */
export const fetchNewts = () =>
  dispatch =>
    axios
      .get('/api/newts')
      .then(res => dispatch(getNewts(res.data)))
      .catch(err => console.log(err))

export const createNewt = newt =>
  dispatch =>
    axios
      .post('/api/newts', newt)
      .then(res => {
        console.log('thunk test');
        return dispatch(newNewt(res.data))
      })
      .catch(err => console.log(err))

export const updateNewt = (id, newt) =>
  dispatch =>
    axios
    .put(`/api/newts/${id}`, newt)
    .then(res => {
      console.log('HELP');

      return dispatch(editNewt(res.data))
    })
    .catch(err => console.log(err))

export const deleteNewt = id =>
    dispatch =>
      axios
      .delete(`/api/newts/${id}`)
      .then(res => dispatch(killNewt(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  console.log(action);

  switch (action.type) {
    case GET_NEWTS:
      return action.newts
    case NEW_NEWT:
      return [action.newt, ...state]
    case EDIT_NEWT:
    return state.map(newt => (
      action.newt.id === newt.id ? action.newt : newt
    ))
    case DELETE_NEWT:
    return state.filter( newt => newt.id !== action.id );
    default:
      return state
  }
}
