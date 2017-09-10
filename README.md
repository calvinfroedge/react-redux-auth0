# Use Auth0 with React + Redux

```
import { AuthComponent, AuthMiddlewares, AuthReducer } from 'react-redux-auth0'
```

### When starting your app, include the following environment variables:

```
REACT_APP_AUTH0_CLIENTID=client-id-string REACT_APP_AUTH0_DOMAIN=domain npm your-start-command
```

Include [Auth0](https://auth0.com/) from CDN in your template (believe me, you don't want to build it):

```
<script src="//cdn.auth0.com/js/lock/10.11/lock.min.js"></script>

```

# Usage with Webpack

Make sure you have this webpack plugin so that webpack will compile in proper environment variables:

```
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    'process.env.REACT_APP_AUTH0_CLIENTID': JSON.stringify(REACT_APP_AUTH0_CLIENTID),
    'process.env.REACT_APP_AUTH0_DOMAIN': JSON.stringify(REACT_APP_AUTH0_DOMAIN)
  })
```

...here is an example of reading those env variables in webpack config:

```
const env = process.env.NODE_ENV;
const REACT_APP_AUTH0_CLIENTID = process.env.REACT_APP_AUTH0_CLIENTID;
const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
```

# AuthComponent

Can be used to render either a 'Sigup' or 'Login' button:


```

<AuthComponent login />

<AuthComponent signup />
```

...or will render both:

```
<AuthComponent onAuthenticated={callback} />
```

The component will automatically return a `Logout` button when the user is authenticated.

## Options

`auth0`: auth0 lock customization options detailed here https://auth0.com/docs/libraries/lock/v10/customization
`onAuthenticated (token, profile)`: A callback to receive when authentication has completed. 
