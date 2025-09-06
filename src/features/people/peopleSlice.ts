import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Person {
  id: string
  login: string
  name: string
  contracts: string[]  
}

export interface CreatePerson {
  contractId: string
  email: string
  firstName: string
  lastName: string
 
}

export interface UpdatePerson {  
  personId: string
  email: string
  firstName: string
  lastName: string
}

export interface PeopleState {

}

const initialState: PeopleState = {
  
}

export const peopleSlice = createSlice({
  name: 'people',
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

export const { increment, decrement} = peopleSlice.actions

export default peopleSlice.reducer