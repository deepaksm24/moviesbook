import { Button, Col, Row, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import Shows from "./Shows";
import { useNavigate } from "react-router-dom";
import { GetBookingsofUser } from "../../api/bookings";
import moment from "moment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import emailjs from "@emailjs/browser";

function Bookings() {
  const [bookings = [], setBookings] = useState([]);
  const disptach = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      disptach(ShowLoading());

      const response = await GetBookingsofUser();
      if (response.success) {
        setBookings(response.data);
        disptach(Hideloading());
      } else {
        message.error(response.message);
        disptach(Hideloading());
      }
      disptach(Hideloading());
    } catch (error) {
      disptach(Hideloading());
      message.error(error.message);
    }
  };

  const sendmail = () => {
    bookings.map((booking) => {
     
      let templateParams = {
        bookingid: booking._id,
        address: booking.show.theatre.name,
        bookingtitle: booking.show.movie.title,
        date: moment(booking.show.date).format("MMM Do YYYY"),
        time: moment(booking.show.time, "HH:mm").format("hh:mm A"),
        seats:booking.seats.join(" , "),
        notes: "Check this out!",
        to_name: "deepaksm",
        from_name: "deepakyuga@gmail.com",
        message: "Ticket Booked Thank You Visit again",
        email: booking.user.email,
      };

      emailjs
        .send(
          "service_qylmbj8",
          "template_flcmxac",
          templateParams,
          "CkfuDJ-duNCfP-K5L"
        )
        .then(
          function (response) {
            //console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
           // console.log("FAILED...", error);
          }
        );
    });
  };

  useEffect(() => {
    getData();
    sendmail();
  }, []);
  return (
    <div>
      <Row gutter={[16, 16]}>
        {bookings.map((booking) => (
          <Col span={12}>
            <div className=" d-flex justify-content-around shadow-lg p-3 mb-5 bg-white rounded bookings-user">
              <div>
                <h1>
                  {booking.show.movie.title}-({booking.show.movie.language})
                </h1>
                <h3>
                  {booking.show.theatre.name}-({booking.show.theatre.address})
                </h3>
                <h4>
                  Date & Time: {moment(booking.show.date).format("MMM Do YYYY")}
                  -({moment(booking.show.time, "HH:mm").format("hh:mm A")})
                </h4>
                <h4>
                  <CurrencyRupeeIcon />
                  {booking.show.ticketprice * booking.seats.length}
                </h4>
                <h6>Booking Id: {booking._id}</h6>
              </div>
              <div>
                <h5 className="border  p-2 ">
                  Seats : {booking.seats.join(" , ")}
                </h5>
                <img
                  className="card-img-top"
                  height={220}
                  width={200}
                  src={booking.show.movie.poster}
                  alt="Card image cap"
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Bookings;
