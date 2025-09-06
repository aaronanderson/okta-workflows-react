import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface EntitlementBundle {
  id: string
  name: string    
}

export interface Application {
  id: string
  name: string
  
}

export interface ResourceAccess {
  id: string
  contractId: string
  userId: string
  contractNumber: string
  login: string
  application: Application
  bundles: EntitlementBundle[]
}

export interface AccessState {

}

const initialState: AccessState = {
  
}

export const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    increment: (state) => {
      //state.value += 1
    },
    decrement: (state) => {
      //state.value -= 1
    },
    
    
  },
})

export const { increment, decrement} = accessSlice.actions

export default accessSlice.reducer