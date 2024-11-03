import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    {
        id:"1",
        name:"John",
    },
    {
        id:"2",
        name:"David",
    },
    {
        id:"3",
        name:"Alex",
    },
]

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{

    }
})

export default userSlice.reducer;