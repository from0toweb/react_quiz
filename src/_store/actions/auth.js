import Axios from 'axios';
import { AUTH_SUCCESS, LOG_OUT } from './actionTypes';

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token,
    };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    return {
        type: LOG_OUT,
    };
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem('expirationDate')
            );

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(
                    autoLogout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
}

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true,
        };

        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHh1pI0f6KDZEw9rbUSgrmjNXcIup6UKA';

        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHh1pI0f6KDZEw9rbUSgrmjNXcIup6UKA';
        }
        const response = await Axios.post(url, authData);
        const data = response.data;

        const expirationDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
        );

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('localId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    };
}
