import { axiosInstance } from ".";

// Add a movie

export const Addtheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/theatres/add-theatres",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// GET A MOVIE
export const GetAlltheatres = async () => {
  try {
    const response = await axiosInstance.get(
      "/theatres/get-all-theatres"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAlltheatresByOwner = async (request) => {
  try {
    const response = await axiosInstance.post(
      "/theatres/get-all-theatres-by-owner",
      request
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit a theatre
export const updatetheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/theatres/update-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete

export const deleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// add show
export const AddShow = async (payload) => {
  
  try {
    const response = await axiosInstance.post(
      "/theatres/add-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all shows
export const GetAllShowsbyTheatre = async (request) => {
  try {
    const response = await axiosInstance.post(
      "/theatres/get-all-shows-by-theatre",
      request
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// delete show

export const DeleteShow = async (payload) =>{
  try {
    const response = await axiosInstance.post(
      "/theatres/delete-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// get all theatres of a movie

export const GetAllTheatresbyMovie = async (payload) =>{
  try {
    const response = await axiosInstance.post(
      "/theatres/get-all-theatres-by-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}
// get Shows by id

export const GetShowsById = async (payload) =>{
  
  try {
    const response = await axiosInstance.post(
      "/theatres/get-shows-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}