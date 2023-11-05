import moment from "moment-timezone";
import { toast } from "react-hot-toast";

const textValidator = (text)=>{
    const re = /^[A-Za-z ]*$/;
    return re.test(text)
}

export const validateEmail = (email) =>{ //Validates the email address
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\+)*(\.\w{2,3})+$/;
    return emailRegex.test(email)
}

export const validatePhone = (phone) => { //Validates the phone number
    const phoneRegex = /\d{10}$/; // Change this regex based on requirement
    return phoneRegex.test(phone);
}


export const alertNotify = (msg,status = 400) =>{
    toast.dismiss()
    let isStatus = status ===200 || status ===201
    let toastOptions = {
        duration: 10000,
        className:isStatus?"toast-success":"toast-error",
        onClick:null
    }
    if(isStatus){
        toast.success((t)=>(
            <span>
                <div className="row">
                    <div className="col-10">{msg}</div>
                    <div className="col-2">
                        <span className="toaster-msg" onClick={()=>toast.dismiss(t.id)}> x </span>
                    </div>
                </div>
            </span>
        ),{...toastOptions});
    } else{
        let message = msg;
        switch(status){
            case 500:
                message = msg||"Server not found.";
                break;
            case 503:
                message = msg||"Server not found.";
                break;
            case 401:
                // localStorage.removeItem("token")
                message = msg||"401 error";
                break;
            case 400:
                message = msg||"400 error";
                break;
            case 404:
                message = msg||"404 page not found";
                break;
            default:
                message = "Something went wrong";
        }
        toast.error((t)=>(
            <span>
                <div className="row">
                    <div className="col-10">{message}</div>
                    <div className="col-2">
                    <span className="toaster-msg" onClick={()=>toast.dismiss(t.id)}> x </span>
                    </div>
                </div>
            </span>
        ),{...toastOptions});
    }
}

export const APIAlertNotify = (error) =>{
    if(error.response){
        alertNotify(error.response.data.message,error.response.status)
    }else{
        alertNotify(error.message,500)
    }
}

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
}

export const getTime = (postTimestamp) =>{
    const now = moment();
    const postTime = moment(postTimestamp);

    const diffMinutes = now.diff(postTime, 'minutes');
    const diffHours = now.diff(postTime, 'hours');
    const diffDays = now.diff(postTime, 'days');
    const diffWeeks = now.diff(postTime, 'weeks');
   
    let timeSincePosted = ''
    if (diffMinutes < 1) {
        timeSincePosted = 'Now';
    } else if (diffMinutes < 60) {
        timeSincePosted = `${diffMinutes} mins ago`;
    } else if (diffHours < 24) {
        timeSincePosted = postTime.format('h:mm A');
    } else if (diffDays < 7) {
        timeSincePosted = postTime.format('ddd');
    } else if (diffWeeks < 52) {
        timeSincePosted = postTime.format('MMM D');
    } else {
        timeSincePosted = postTime.format('MMM D, YYYY');
    }
    return timeSincePosted
}

export default textValidator;