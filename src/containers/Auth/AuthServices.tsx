import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

interface IAuth0User {
  nickname: string;
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  sub: string;
  updated_at: string;
}

interface IAuth0Context {
  isAuthenticated: boolean;
  user: IAuth0User;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup(options: PopupLoginOptions): Promise<void>;
  handleRedirectCallback(): Promise<RedirectLoginResult>;
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>;
  loginWithRedirect(o: RedirectLoginOptions): Promise<void>;
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>;
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>;
  logout(o?: LogoutOptions): void;
}
interface IAuth0ProviderOptions {
  children: React.ReactElement;
  onRedirectCallback?(result: RedirectLoginResult): void;
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<IAuth0Context | null>(null);

export const useAuth0 = () => useContext<IAuth0Context>(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: IAuth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [user, setUser] = useState<IAuth0User>();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState<boolean>(true);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        let appState: RedirectLoginResult = {};
        try {
          ({ appState } = await auth0FromHook.handleRedirectCallback());
        } finally {
          onRedirectCallback(appState);
        }
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);

    const result = await auth0Client!.handleRedirectCallback();
    const userProfile = await auth0Client!.getUser();

    setLoading(false);
    setIsAuthenticated(true);
    setUser(userProfile);

    return result;
  };

  const loginWithRedirect = (options?: RedirectLoginOptions) =>
    auth0Client!.loginWithRedirect(options);

  const getTokenSilently = (options?: GetTokenSilentlyOptions) =>
    auth0Client!.getTokenSilently(options);

  const logout = (options?: LogoutOptions) => auth0Client!.logout(options);

  const getIdTokenClaims = (options?: getIdTokenClaimsOptions) =>
    auth0Client!.getIdTokenClaims(options);

  const getTokenWithPopup = (options?: GetTokenWithPopupOptions) =>
    auth0Client!.getTokenWithPopup(options);

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims,
        loginWithRedirect,
        getTokenSilently,
        getTokenWithPopup,
        logout
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
