const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key);
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../model/bookingModel");
const Show = require("../model/showModel");


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

    module.exports = router;