import { axiosInstance } from ".";

//make payment

export const makePayment = async (token, amount) => {
  try {
    const response = await axiosInstance.post(
      "bookings/make-payment",
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
      "/bookings/book-show",
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
      "movie/1234567/book-show/bookings/get-bookings"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
