# Use Auth0 with React + Redux

```
import { AuthComponents, AuthMiddleware, AuthReducer } from 'react-redux-auth0'
```

### When starting your app, include the following environment variables:

```
AUTH0_CLIENTID=client-id-string AUTH0_DOMAIN=domain npm your-start-command
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

## Logout

A simple logout button.
