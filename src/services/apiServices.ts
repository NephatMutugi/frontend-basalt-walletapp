import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
interface CustomError {
  data: {
    status: number;
    message: string;
  };
}
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).userLogin.userInfo?.token;

    //   if (token) {
    //     headers.set("x-auth-token", token);
    //   }
    //   return headers;
    // },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, object>,
  endpoints: () => ({}),
});
