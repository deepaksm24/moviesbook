import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { Col, Row, message } from "antd";
import { GetShowsById } from "../../api/theatres";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { BookShowTickets, makePayment } from "../../api/bookings";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedseats, setSelectedseats] = React.useState([]);

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await makePayment(
        token,
        selectedseats.length * show.ticketprice * 100
      );
      if (response.success) {
        message.success("Payment Success");
        book("123");
      } else {
        // message.error(response.message);
        dispatch(Hideloading());
        book("123");
      }
      book("123");
      dispatch(Hideloading());
    } catch (error) {
      book("123");
      dispatch(Hideloading());
     
    }
  };

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedseats,
        transactionId,
        user: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
        dispatch(Hideloading());
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
    }
  };

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowsById({
        showId: params.id,
      });

      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);

        dispatch(Hideloading());
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
    }
  };
  const getSeats = () => {
    const columns = 10;
    const totalSeats = show.totalSeats;
    console.log("123", show.bookedseats);
    console.log("222", show.selectedseats);
    const rows = Math.ceil(totalSeats / columns);
    return (
      <div className="d-flex flex-column justify-content-between pe-auto">
        {Array.from(Array(10).keys()).map((seat, index) => {
          return (
            <div className="d-flex gap-1 justify-content-center allshow">
              {Array.from(Array(columns).keys()).map((column, index) => {
                let seatclass = "seat  cursor-pointer ";
                const seatNumber = seat * columns + column + 1;

                if (selectedseats.includes(seat * columns + column + 1)) {
                  seatclass = "selected-seat";
                }
                if (show.bookedseats.includes(seat * columns + column + 1)) {
                  seatclass = "booked-seats";
                }
                return (
                  <div
                    className={seatclass}
                    onClick={() => {
                      if (selectedseats.includes(seatNumber)) {
                        setSelectedseats(
                          selectedseats.filter((item) => item != seatNumber)
                        );
                      } else {
                        setSelectedseats([...selectedseats, seatNumber]);
                      }
                    }}
                  >
                    <h1 className="mb-1 ">{seat * columns + column + 1}</h1>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    show && (
      <div className="container">
        <div className="d-flex justify-content-evenly p-2 border border-secondary">
          <div>
            <h3>{show.theatre.name}</h3>
            <h3>{show.theatre.address}</h3>
          </div>
          <div>
            <h3>
              {show.movie.title} ({show.movie.language})
            </h3>
          </div>
          <div>
            <h4>
              {moment(show.date).format("MMM Do yyyy")}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-center">{getSeats()}</div>
        <div className="w100 d-flex justify-content-center mt-2 mb-5">
          {selectedseats.length > 0 && (
            <StripeCheckout
              // currency="INR"
              className=""
              token={onToken}
              amount={selectedseats.length * show.ticketprice * 100}
              stripeKey="pk_test_51NjrtxSAknDNhCmWShNdt0Phm1TqtLj7fl8CUqULWolfYTxwbZ6FExNXNZn0TTQ5BkQbJiBbHscxBjyD6OHLmedq00nWD0zvUE"
            >
              <button className="btn btn-info">Book Now</button>
            </StripeCheckout>
          )}
        </div>
      </div>
    )
  );
}

export default BookShow;
