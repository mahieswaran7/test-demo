import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000'

export const cityApi = createApi({
    reducerPath: 'cityApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCities: builder.query({
            query: (name) => `/api/cities?name=${name}`,
        }),
    }),
});

export const { useGetCitiesQuery } = cityApi;
