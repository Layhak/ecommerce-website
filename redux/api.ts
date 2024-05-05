// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/redux/store';
import { setAccessToken } from '@/redux/feature/auth/authSlice';
import { getSession } from 'next-auth/react';

// Setting up prepareHeaders to include the token in the headers
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const session = await getSession();
    // if we have a token, let's set the authorization header
    if (session) {
      headers.set('authorization', `Bearer ${session?.user?.id}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const session = await getSession();
    console.log('sessionapi', session);
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}token/refresh/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: session?.user?.name }),
        }
      );
      const resultResponse = await response.json();
      console.log('resultResponse', resultResponse);
      if (resultResponse?.access) {
        console.log('refresh token success');
        const refreshedResult = await fetchBaseQuery({
          baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL,
          prepareHeaders: async (headers) => {
            const session = await getSession();
            console.log('after refreshed', session);
            if (session) {
              headers.set('authorization', `Bearer ${resultResponse.access}`);
            }
            return headers;
          },
        })(args, api, extraOptions);
        return refreshedResult;
      } else {
        console.error('refresh token failed');
        return result;
      }
    }
  }
  return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
