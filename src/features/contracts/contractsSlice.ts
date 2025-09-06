import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Contract {
  id: string
  contractNumber: string
  name: string
  startDate: string
  endDate: string
}

export interface ContractsState {

}

const initialState: ContractsState = {
  
}

export const contractsSlice = createSlice({
  name: 'contracts',
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

export const { increment, decrement} = contractsSlice.actions

export default contractsSlice.reducer