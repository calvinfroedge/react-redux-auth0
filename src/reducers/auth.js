import { handleActions } from 'redux-actions'
import { auth } from '../constants'

let fn = (obj={})=>{
  return Object.assign({}, {
    profile: '',
    token: '',
    id: '',
    submitting: false,
    error: false,
    newUser: false
  }, obj);
}

let obj = {};

obj[auth.signin] = (state, action)=>{
  let { payload } = action;
  let { profile, token } = payload;

  return fn({
    id: profile.global_client_id,
    profile,
    token
  })
}

obj[auth.logout] = (state, action)=>{
  return fn();
}

obj[auth.error] = (state, action)=>{
  let { payload } = action;
  let { error } = payload;

  return fn({error});
}

export default handleActions(obj, fn());
