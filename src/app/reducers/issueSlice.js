
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIAlertNotify, alertNotify } from "../../AppFunction";
import {getIssues, getTrendingNews } from "../../components/APIServices/AppAPI";

const initialState = {
    trendingNews:[],
    issues:[]
}
 

export const fecthTrendingNews = createAsyncThunk("issue/fetchTrendingNews",async()=>{
    try{
        const res = await getTrendingNews()
        if(res.status === 200){
            return res.data.data
        }else{
            throw new Error(res)
        }
    }catch(error){
        APIAlertNotify(error)
    }
})

export const fecthIssues = createAsyncThunk("issue/fecthIssues",async()=>{
    try{
        const res = await getIssues()
        if(res.status === 200){
            return res.data.data
        }else{
            throw new Error(res)
        }
    }catch(error){
        APIAlertNotify(error)
    }
})

 

 
export const issueSlice = createSlice({
    name:"issueData",
    initialState,
    reducers:{
        setTrendingNews:(state,{payload})=>{
            state.trendingNews = payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fecthTrendingNews.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.trendingNews = payload
        });
        builder.addCase(fecthIssues.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.issues = payload
        });
    }
});

export const {
    setTrendingNews
} = issueSlice.actions

export default issueSlice.reducers