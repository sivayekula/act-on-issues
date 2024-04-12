
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIAlertNotify } from "../../AppFunction";
import {getHotIsues, getIssueDetails, getIssues, getTrendingNews } from "../../components/APIServices/AppAPI";

const initialState = {
    trendingNews:[],
    issues:[],
    totalRecords:0,
    hotIssues: [],
    generalIssues:[],
    swatchBharathIssuses:[],
    issueDetails:null,
    isLoading:false
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
            return res.data.data
        }else{
            throw new Error(res)
        }
    }catch(error){
        APIAlertNotify(error)
    }
})

export const fecthHotIssues = createAsyncThunk("issue/fecthHotIssues",async()=>{
    try{
        const res = await getHotIsues()
        if(res.status === 200){
            return res.data.data
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
            // state.isLoading = false
            state.trendingNews = payload
        });
        builder.addCase(fecthIssues.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(fecthIssues.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.issues = payload.data?payload.data:[]
            state.totalRecords = payload.metadata[0]?.totalIssues||0
        });
        builder.addCase(fecthIssueDetails.fulfilled,(state,{payload})=>{
            // state.isLoading = false
            state.issueDetails = payload
        });
        builder.addCase(fecthHotIssues.fulfilled,(state,{payload})=>{
            // state.isLoading = false
            state.hotIssues = payload.hotIssues
            state.swatchBharathIssuses = payload.swatchBharathIsues
        });
    }
});

export const {
    setTrendingNews
} = issueSlice.actions

export default issueSlice.reducers