const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key);
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../model/bookingModel");
const Show = require("../model/showModel");

//make payment

router.get("/make-payment", async (req, res) => {
  try {
    // const { token, amount } = req.body;
    // // create customer
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });
    // //charge
    // const charge = await stripe.charges.create(
    //   {
    //     amount: amount,
    //     currency: "usd",
    //     customer: customer.id,
    //     receipt_email: token.email,
    //     description: "Purchased the movie ticket",
    //   },
    //   {
    //     idempotencyKey: Math.random().toString(36).substring(7),
    //   }
    // );
    // console.log(charge);
    // const transactionId = charge.id;
    res.send({
      success: true,
      message: "Payment -Successful",
      data: "123",
    });
  } catch (error) {
    res.send({
      success: true,
      message: "Payment Successful",
    });
  }
});

//book-show
router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // update seats
    const show = await Show.findById(req.body.show);

    await Show.findByIdAndUpdate(req.body.show, {
      bookedseats: [...show.bookedseats, ...req.body.seats],
    });
    res.send({
      success: true,
      message: "Show Booked succesfully",
      data: newBooking,
    });
  } catch (error) {
    res.send({
      success: true,
      message: error.message,
    });
  }
});

//get all booking by user

router.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId }).populate({
      path: "show",
      populate:{
        path:"movie",
        model:"movies"
      }
    }).populate("user").populate({
      path: "show",
      populate:{
        path:"theatre",
        model:"theatres",
      }
    });

    res.send({
      success: true,
      message: "fetched",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "failed at server",
    });
  }
});

module.exports = router;
