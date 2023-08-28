import { axiosInstance } from ".";

// Add a movie

export const Addmovie = async(payload)=>{
    
try{
   
    const response = await axiosInstance.post("http://localhost:5000/movies/add-movie",payload);
    return response.data;
}
catch(error){
return error.message;
}

}

// GET A MOVIE
export const GetAllmovie = async()=>{
    
try{
   
    const response = await axiosInstance.get("http://localhost:5000/movies/get-all-movies");
    return response.data;
}
catch(error){
return error.message;
}

}

// edit a movie
export const updateMovie = async(payload)=>{
    
    try{
       
        const response = await axiosInstance.post("http://localhost:5000/movies/update-movie",payload);
        return response.data;
    }
    catch(error){
    return error.message;
    }
    
    }

    // delete

    export const deleteMovie = async(payload)=>{
    
        try{
           
            const response = await axiosInstance.post("http://localhost:5000/movies/delete-movie",payload);
            return response.data;
        }
        catch(error){
        return error.message;
        }
        
        }

        //get a movie by id

        export const GetMoviebyid = async(id)=>{
    
            try{
               
                const response = await axiosInstance.get(`http://localhost:5000/movies/get-movie-by-id/${id}`);
                return response.data;
            }
            catch(error){
            return error.message;
            }
            
            }   
