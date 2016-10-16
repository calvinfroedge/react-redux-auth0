# Use Auth0 with React + Redux

```
import { AuthComponents, AuthMiddleware, AuthReducer } from 'react-redux-auth0'
```

### When starting your app, include the following environment variables:

```
AUTH0_CLIENTID=client-id-string AUTH0_DOMAIN=domain npm your-start-command
```

Include [Auth0](https://auth0.com/) from CDN in your template (believe me, you don't want to build it):

```
<script src="http://cdn.auth0.com/js/lock/10.4.0/lock.min.js"></script>
```

Make sure you have this webpack plugin so that webpack will compile in proper environment variables:

```
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    'process.env.AUTH0_CLIENTID': JSON.stringify(AUTH0_CLIENTID),
    'process.env.AUTH0_DOMAIN': JSON.stringify(AUTH0_DOMAIN)
  })
```

...here is an example of reading those env variables in webpack config:

```
const env = process.env.NODE_ENV;
const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
```

# AuthComponents

## LoginSignup

Can be used to render either a 'Sigup' or 'Login' button:

```
<LoginSignup login />

<LoginSignup signup />
```

### Optional parameters

 - href: String
 > Specify the href attribute of the link to support disabled JavaScript (the user will be redirected to this url after clicking the button if he has disabled JavaScript). 
Example: 
```js
<LoginSignup login href="/login" />
// --> <a href="/login" onClick="..." ...>Sign in</a>
```

 - children: element
 > Link value
Example: 
```js
<LoginSignup login>My custom login</LoginSignup>
// --> <a ...>My custom login</a>
```

## Logout

A simple logout button.

# Examples

## Usage with React Redux Router (for checking redirect logic based on authentication state)

```js
import { replace } from 'react-router-redux'

const getRoute = (state)=>{
  return state.routing.locationBeforeTransitions.pathname;
}

const checkToken = (state)=>{
  const token = localStorage.getItem('auth.token');

  return !(!token && !state.auth.token); //Checking both token and state.auth.token because they are sometimes temporarily out of sync with each other, but we only assume the user should be logged out if logout action is dispatched or both of these conditions hold true simultaneously.
}

export default [
  {
    type: 'auth_signin',
    func: (payload, state, dispatch)=>{
      if(getRoute(state) != "/dashboard"){
        dispatch(replace("/dashboard"));
      }
    }
  },
  { //Checked on initial load, route change
    type: 'auth_check',
    func: (payload, state, dispatch)=>{

      if(!checkToken(state) && getRoute(state) != "/"){
        dispatch(replace("/"));
      }
    }
  },
  { //Checked on every route change
   type: '@@router/LOCATION_CHANGE',
   func: (payload, state, dispatch)=>{
     const token = localStorage.getItem('auth.token');
     if(!checkToken(state) && getRoute(state) != "/"){
      dispatch(replace("/"));
     }
   }
  },
  {
    type: 'auth_logout',
    func: (payload, state, dispatch)=>{
      dispatch(replace("/"));
    }
  }
]
```
