import { Dispatch } from 'redux';

const authURL = 'http://localhost:8081/'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (userId: string, password: string, onSuccess: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log('Attempting to log in', { userId, password }); // Log credentials (be cautious with logging sensitive information)
      const response = await fetch(authURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      console.log('Login response', data); // Log response data

      if (response.ok) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data.token,
        });
        localStorage.setItem('token', data.token);
        console.log('Login successful', data.token); // Log success

        onSuccess(); // Execute the callback upon successful login

      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (error: unknown) {
      let errorMessage = 'Authentication failed';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Login error', errorMessage); // Log error
      dispatch({
        type: LOGIN_FAILURE,
        payload: errorMessage,
      });
    }
  };
};
