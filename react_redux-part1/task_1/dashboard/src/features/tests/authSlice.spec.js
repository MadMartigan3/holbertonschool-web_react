import mockAxios from 'jest-mock-axios';
import authReducer, { login, logout } from '../auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
      isLoggedIn: false,
    },
  };

  test('returns the initial state by default', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('login sets the user email, password, and isLoggedIn to true', () => {
    const state = authReducer(initialState, login({ email: 'test@example.com', password: 'password123' }));
    expect(state.user).toEqual({
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true,
    });
  });

  test('logout resets the user email and password and sets isLoggedIn to false', () => {
    const loggedInState = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
    };
    const state = authReducer(loggedInState, logout());
    expect(state.user).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  });
});
