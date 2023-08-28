import { axiosInstance } from ".";

//make payment

export const makePayment = async (token, amount) => {
  try {
    const response = await axiosInstance.post(
      "/make-payment",
      {
        token,
        amount,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const BookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/book-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
///get bookings of user
export const GetBookingsofUser = async () => {
  try {
    const response = await axiosInstance.get(
      "/get-bookings"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
