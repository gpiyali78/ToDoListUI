export default class AuthService {
    isAuthenticated = () => {
        let str = localStorage.getItem('token');
        if (str === null)
        {
            return false;            
        }

        else
        {
           return true;
        }

    };
}