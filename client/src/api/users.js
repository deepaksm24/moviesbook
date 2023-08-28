import { axiosInstance } from ".";

//register

export const Registeruser = async(payload)=>{
    // console.log("hi",payload);
try{
   
    const response = await axiosInstance.post("http://localhost:5000/users/register",payload);
    return response.data;

}
catch(error){
return error.message;
}

}

//login
export const Loginuser = async(payload)=>{

    try{
        const response = await axiosInstance.post("http://localhost:5000/users/login",payload);
        return response.data;
    
    }
    catch(error){
    return error.message;
    }
    
    }

    //get user protected
    export const GetCurrentuser = async()=>{

        try{
            const response = await axiosInstance.get("http://localhost:5000/users/get-current-user");
            
            return response.data;
        
        }
        catch(error){
        return error.message;
        }
        
        }
        