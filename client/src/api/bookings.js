import { axiosInstance } from ".";

//make payment

export const makePayment = async () => {
  try {
    const response = await axiosInstance.get(
      "bookings/make-payment"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const BookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "bookings/book-show",
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
      "bookings/get-bookings"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
