
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIAlertNotify, alertNotify } from "../../AppFunction";
import {getIssueDetails, getIssues, getTrendingNews } from "../../components/APIServices/AppAPI";

const initialState = {
    trendingNews:[],
    issues:[],
    hotIssues: [],
    issueDetails:null
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

export const fecthIssues = createAsyncThunk("issue/fecthIssues",async(params)=>{
    try{
        const res = await getIssues(params)
        if(res.status === 200){
            return res.data
        }else{
            throw new Error(res)
        }
    }catch(error){
        APIAlertNotify(error)
    }
})

export const fecthIssueDetails = createAsyncThunk("issue/fecthIssueDetails",async(issueId)=>{
    try{
        const res = await getIssueDetails(issueId)
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
            console.log(payload)
            state.isLoading = false
            state.issues = payload.data?payload.data:[]
            state.hotIssues = payload.hotIssues?payload.hotIssues:[]
        });
        builder.addCase(fecthIssueDetails.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.issueDetails = payload
        });
    }
});

export const {
    setTrendingNews
} = issueSlice.actions

export default issueSlice.reducers