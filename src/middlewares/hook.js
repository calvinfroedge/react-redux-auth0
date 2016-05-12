import { auth } from '../constants'
import { createAction as act } from 'redux-actions'

/* [eventList]:
 * {
 *  type: An event to check for (such as a route change),
 *  func: (action.payload, AuthState, dispatch) //Callback with user info, state and dispatch
 * }
 */
export default (eventList=[])=>{
  return store => next => action => {
    let result = next(action);
    var t, p;
    let { payload } = action;

    eventList.forEach((e)=>{
      const { type, func } = e;
      if(action.type == type){
        func(action.payload, store.getState(), store.dispatch);
      }
    });

    return result;
  }
}
