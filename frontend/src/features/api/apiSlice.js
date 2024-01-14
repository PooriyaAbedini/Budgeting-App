import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, { getState }) => {
            const state = getState();
            headers.set('Authorization', `Bearer ${state.auth.user.token}`)
            return headers
        }
    }),
    tagTypes: ['Item', 'Group', 'Budget', 'Expense', 'ChartData', 'DueDate'],
    endpoints: builder => ({})
});


