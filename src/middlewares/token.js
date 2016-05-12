import { auth, token, profile } from '../constants'
import { createAction as act } from 'redux-actions'

export default ()=>{
  return store => next => action => {
    let result = next(action);
    var t, p;
    let { payload } = action;

    if(action.type == auth.check){
      t = localStorage.getItem(token);
      if(t){
        t = JSON.parse(t);
        p = JSON.parse(localStorage.getItem(profile));
        store.dispatch(act(auth.signin)({profile: p, token: t}));
      }
    } else if(action.type == auth.signin){
      localStorage.setItem(token, JSON.stringify(payload.token));
      localStorage.setItem(profile, JSON.stringify(payload.profile));
    } else if(action.type == auth.logout){
      localStorage.removeItem(token);
      localStorage.removeItem(profile);
    }

    return result;
  }
}
