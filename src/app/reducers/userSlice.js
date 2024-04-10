
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAlertNotify, alertNotify } from "../../AppFunction";
import { getCategories, getProfileDetails } from "../../components/APIServices/AppAPI";
const emptyModalObj = {signup:false,login:false,raiseIssue:false,forgotPassword:false}
const initialState = {
    user:null,
    isLoading:false,
    profileData:{},
    categories:[],
    stack:[],
    showModal:{...emptyModalObj}
}
 
export const fetchProfileDetails = createAsyncThunk("user/fetchProfileDetails",async()=>{
    try{
        const res = await getProfileDetails()
        if(res.status === 200){
            return res.data.data
        }else{
            if(res.status === 401){
                localStorage.removeItem("token")
                alertNotify("Session expired.")
            }else{
                throw new Error(res)
            }
        }
    }catch(error){
        APIAlertNotify(error)
    }
})

export const fetchCategories = createAsyncThunk("user/fetchCategories",async()=>{
    try{
        const res = await getCategories()
        if(res.status === 200){
            return res.data.data
        }else{
            throw new Error(res)
        }
    }catch(error){
        APIAlertNotify(error)
    }
})

const makeProfileObj = (data) =>{
      return  {
        _id:data._id,
        name:data.name,
        email: data.email,
        mobile:data.mobile,
        role :data.role,
        status :data.status,
        profile_pic:data.profile_pic,
        address:data.address,
        gender:data.gender, 
        identity_proof:data.identity_proof }
     
}
export const userSlice = createSlice({
    name:"userData",
    initialState,
    reducers:{
        setUserData:(state,{payload})=>{
            state.user = payload
        },
        setProfileData :(state,{payload})=>{
            state.profileData = payload&&makeProfileObj(payload)
        },
        updateStack:(state, {payload})=>{
            state.stack = payload
        },
        clearSession:(state)=>{
            state.user = null
            state.profileData = {}
            state.stack = []
        },
        updateModal:(state, {payload})=>{
            state.showModal = {...emptyModalObj, [payload.key]:payload.value}
        },
        updateLoading:(state,{payload})=>{
            state.isLoading=payload
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProfileDetails.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(fetchProfileDetails.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.profileData = payload&&makeProfileObj(payload)
        });
         
        builder.addCase(fetchCategories.fulfilled,(state,{payload})=>{
            state.categories = payload?payload:[]
        })

    }
});

export const {
    setUserData,
    clearSession,
    setProfileData,
    updateStack,
    updateModal,
    updateLoading,
} = userSlice.actions

export default userSlice.reducers