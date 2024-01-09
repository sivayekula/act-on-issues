import * as URL from "./URL"
import {backendAPI} from "./BaseAPI"

export const signupAPI = async(payload) =>{
    return await backendAPI.post(URL.SIGNUP,payload )
}
export const loginAPI = async(payload) =>{
    return await backendAPI.post(URL.LOGIN,payload)
}

export const verifyOTPAPI = async(payload) =>{
    return await backendAPI.post(URL.VERIFY_OTP,payload )
}

export const updateProfileData = async(payload) =>{
    return await backendAPI.post(URL.PROFILE_UPDATE,payload )
}

export const getProfileDetails = async()=>{
    return await backendAPI.get(URL.PROFILE)
}

export const createIssue = async(payload)=>{
    return await backendAPI.post(URL.ISSUE_CREATION,payload)
}
export const getIssues = async(params=null)=>{
    let apiUrl = URL.GET_ISSUES
    if(params){apiUrl = apiUrl+"?"+params}
    return await backendAPI.get(apiUrl)
}
export const getMyIssues = async(userId)=>{
    return await backendAPI.get(URL.GET_MY_ISSUES+"/"+userId)
}
export const getIssueDetails = async(issueId)=>{
    return await backendAPI.get(URL.GET_ISSUE+"/"+issueId)
}
export const getCategories = async()=>{
    return await backendAPI.get(URL.GET_CATEGORIES)
}

export const getTrendingNews = async()=>{
    return await backendAPI.get(URL.GET_TRENDING_NEWS)
}

export const saveFlagStatus= async (payload)=> {
    return await backendAPI.post(URL.FLAG, payload)
}

export const saveComment = async(payload)=>{
    return await backendAPI.post(URL.SAVE_COMMENT, payload)
}
export const getComments = async(issueId)=>{
    return await backendAPI.get(URL.SAVE_COMMENT+"/"+issueId)
}
