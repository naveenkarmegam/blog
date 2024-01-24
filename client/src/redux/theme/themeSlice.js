import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    theme:'light'
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleThemeMode:(state)=>{
            state.theme= state.theme==='light'?'dark':'light'
        }
    }
}) 

export const {toggleThemeMode} = themeSlice.actions;

export default themeSlice.reducer