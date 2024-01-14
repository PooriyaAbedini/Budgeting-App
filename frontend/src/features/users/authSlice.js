import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import Cookies from 'js-cookies'

const user = JSON.parse(Cookies.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', 
    async(user, thunkAPI) => {
        try {
          return await authService.registerUser(user)
        } 
        catch (error) {

            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    });

export const login = createAsyncThunk('auth/login',
    async(user, thunkAPI) => {
        try {
            return await authService.loginUser(user);
        } 
        catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    });

export const logout = createAsyncThunk('auth/logout',
async(user, thunkAPI) => {
    try {
        return await authService.logoutUser(user);
    }
    catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })  
        .addCase(logout.fulfilled, state => {
            state.user = null
        })  
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer