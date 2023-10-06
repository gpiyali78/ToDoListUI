import React, { Component, useContext } from "react";
import AuthService from "../services/authService";

export type AuthContextType = {
    isAuthenticated: any,
}

export const AuthContext = React.createContext<AuthContextType>({
   // isAuthenticated: () => ({})
    isAuthenticated: () => {
        let str = localStorage.getItem('token');
        if (str === null)
        {
            return false;            
        }
        else
        {
           return true;
        }

    }
});

export const AuthConsumer = AuthContext.Consumer;
interface AuthProviderProps {
    children: React.ReactNode
}

export class AuthProvider extends Component<AuthProviderProps> {
    
    //Private variables
    authService: AuthService;

    //constructor
    constructor(props: AuthProviderProps) {
        super(props);
        this.authService = new AuthService();
    }

    //Public methods

    ///Sign in redirect callback
   // public getAccessToken = () => this.authService.getAccessToken();

    //Render
    render() {
        return <AuthContext.Provider value={{ 
            isAuthenticated: this.authService.isAuthenticated
        }}>{this.props.children}</AuthContext.Provider>;
    }
}

///Hook to use authentication context
export const useAuthentication = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuthentication must be used within a AuthenticationProvider. Wrap a parent component in <AuthenticationProvider> to fix this error.")
    }
    return context;
}
