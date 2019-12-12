![repo-banner](https://i.imgur.com/4nM6IJW.jpg)

A simple stack that groups a starting point for applications that support authentication using the Auth0 service. It uses Apollo Client with authenticated GraphQL endpoints, the token is passed from Auth0 to Apollo configuration without using LocalStorage. Made with hooks, includes useAuth0 hook.

**StackSign Features**:

- TypeScript Support
- Out of the box configuration with Auth0
- Token configuration between Apollo Client with Auth0 without using LocalStorage;
- Support for Private Routes with React-Router and Auth0
- Hook support with useAuth0

## Quick Start

```bash
git clone https://github.com/vacom/stacksign.git
cd stacksign
yarn install or npm install
//First set the Environment Variables
yarn start or npm start
```

Then open http://localhost:3000/ to see your app.

## Environment Variables

```js
// env.
REACT_APP_API_URL =
REACT_APP_API_SUBSCRIPTION_URL =
REACT_APP_AUTH_DOMAIN =
REACT_APP_AUTH_CLIENT_ID =
REACT_APP_AUTH_REDIRECT_URI =
```

#### Author

- [Vitor Amaral](https://twitter.com/vacom_me)

---

MIT License
