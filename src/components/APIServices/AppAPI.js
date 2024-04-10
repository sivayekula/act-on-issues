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

export const getViewCount= async (payload)=> {
    return await backendAPI.post(URL.VIEWS, payload)
}

export const saveComment = async(payload)=>{
    return await backendAPI.post(URL.SAVE_COMMENT, payload)
}
export const getComments = async(issueId)=>{
    return await backendAPI.get(URL.SAVE_COMMENT+"/"+issueId)
}

export const getHotIsues = async()=>{
    return await backendAPI.get(URL.GET_HOT_ISSUES)
}
export const getGeneralIsues = async()=>{
    return await backendAPI.get(URL.GET_GENERAL_ISSUES)
}
export const getSwatchBharathIsues = async()=>{
    return await backendAPI.get(URL.GET_SWATCHBHARATH_ISSUES)
}

export const findUserByNumber = async(payload)=>{
    return await backendAPI.post(URL.FIND_USER_BY_NUMBER,payload)
}
export const updatePassword = async(payload)=>{
    return await backendAPI.post(URL.UPDATE_PASSWORD,payload)
}
