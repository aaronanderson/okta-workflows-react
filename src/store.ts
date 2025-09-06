import { configureStore } from '@reduxjs/toolkit'
import contractsReducer from './features/contracts/contractsSlice';
import peopleReducer from './features/people/peopleSlice';
import accessReducer from './features/access/accessSlice';
import { apiSlice } from './features/apiSlice'
//import projectReducer from './features/project/projectSlice';
//import auditReducer from './features/audit/auditSlice';

//https://redux-toolkit.js.org/usage/usage-guide
//https://react.dev/reference/react/hooks
export const store = configureStore({
  reducer: {
    contracts: contractsReducer,
    people: peopleReducer,
    access: accessReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
})
console.log("store init");
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch