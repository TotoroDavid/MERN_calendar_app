import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //'auth', 'no_auth'
        user: {},//{'name','uid'}
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state, /* action */) => {
            state.status = 'checking'
            state.user = {}
            state.errorMessage = undefined
        },
        onLogin: (state, { payload }) => {
            state.status = 'auth'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }) => {
            state.status = 'not_auth'
            state.user = {}
            state.errorMessage = payload
        },
        onClearMessage: (state) => {
            state.errorMessage = undefined
        },
    }
});

export const { onChecking, onLogin, onLogout, onClearMessage } = authSlice.actions;