import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Contract } from './contracts/contractsSlice'
import type { Person, CreatePerson, UpdatePerson } from './people/peopleSlice'
import type { ResourceAccess, Application, EntitlementBundle } from './access/accessSlice'
export type { Contract, Person, CreatePerson, UpdatePerson, ResourceAccess, Application, EntitlementBundle }
//https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced
//https://help.okta.com/wf/en-us/content/topics/workflows/function-reference/http/http_accept.htm
//The Okta Workflows API doesn't allow authenticated cross-origin resource sharing (CORS) for browser-initiated flow invocations. 
// Instead of directly accessing the workflow endpoint from the browser in a SPA express will be used as the backend server to access the workflow API endpoint

export interface User {
  userName: string
  orgName: string
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }),
  tagTypes: ['Contract', 'Person', 'ResourceAccess'],
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => '/user'
    }),

    getContracts: builder.query<Contract[], void>({
      query: () => '/contracts',
      transformResponse: (response: { data: Contract[] }, meta, arg) => response.data,
      providesTags: (result = [], error, arg) => [
        'Contract',
        ...result.map(({ id }) => ({ type: 'Contract', id }) as const)
      ]
    }),
    getPeople: builder.query<Person[], void>({
      query: () => '/people',
      transformResponse: (response: { data: Person[] }, meta, arg) => response.data,
      providesTags: (result = [], error, arg) => [
        'Person',
        ...result.map(({ id }) => ({ type: 'Person', id }) as const)
      ]
    }),
    getAccess: builder.query<ResourceAccess[], void>({
      query: () => '/access',
      transformResponse: (response: { data: ResourceAccess[] }, meta, arg) => response.data,
      providesTags: (result = [], error, arg) => [
        'ResourceAccess',
        ...result.map(({ id }) => ({ type: 'ResourceAccess', id }) as const)
      ]
    }),
    createPerson: builder.mutation<Person, CreatePerson>({
      query: person => ({
        url: '/people',
        method: 'POST',
        body: person
      }),
      invalidatesTags: ['Person']
    }),
    updatePerson: builder.mutation<Person, UpdatePerson>({
      query: person => ({
        url: `/people/${person.personId}`,
        method: 'PUT',
        body: person
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Person', id: arg.personId }]
    }),
    getPerson: builder.query<Person, string>({
      query: personId => `/people/${personId}`
    }),

  })
})

export const {
  useGetUserQuery,
  useGetContractsQuery,
  useGetPeopleQuery,
  useGetAccessQuery,
  useGetPersonQuery,
  useCreatePersonMutation,
  useUpdatePersonMutation
} = apiSlice