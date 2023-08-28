import { axiosInstance } from ".";

//make payment

export const makePayment = async (token, amount) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5000/bookings/make-payment",
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
      "http://localhost:5000/bookings/book-show",
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
      "http://localhost:5000/bookings/get-bookings"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
