const router = require("express").Router();
const Theatres = require("../model/theatreModel");
const authMiddleware = require("../middleware/authMiddleware");
const Show = require("../model/showModel");
// Add a Theatre

router.post("/add-theatres", async (req, res) => {
  try {
    const newTheatre = new Theatres(req.body);
    await newTheatre.save();

    res.send({
      success: true,
      message: "Theatre Added Successfully",
    });
  } catch (error) {
    //console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.get("/get-all-theatres", async (req, res) => {
  try {
    const theatres = await Theatres.find().sort({ createdAt: -1 });

    res.send({
      success: true,
      message: "Theatres fetched Successfully",
      data: theatres,
    });
  } catch (error) {
    //console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//edit theatre
router.post("/update-theatre", async (req, res) => {
  try {
    await Theatres.findByIdAndUpdate(req.body.theatreId, req.body);

    res.send({
      success: true,
      message: "Theatre Edited Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
//owner

router.post("/get-all-theatres-by-owner", async (req, res) => {
  try {
    const theatreowner = await Theatres.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });

    res.send({
      success: true,
      message: "Theatres fetched Successfully",
      data: theatreowner,
    });
  } catch (error) {
    //console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});
//delete
router.post("/delete-theatre", async (req, res) => {
  try {
    await Theatres.findByIdAndDelete(req.body.theatreId);

    res.send({
      success: true,
      message: "Theatre Deleted Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//add show
router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();

    res.send({
      success: true,
      message: "Show Added Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
//get shows

router.post("/get-all-shows-by-theatre", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId })
      .populate("movie")
      .sort({
        createdAt: -1,
      });

    res.send({
      success: true,
      message: "Shows fetched Successfully",
      data: shows,
    });
  } catch (error) {
    //console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//delete show
router.post("/delete-show", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "show deleted Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all unique thetres of shows

router.post("/get-all-theatres-by-movie", async (req, res) => {
  try {
    const { movie, date } = req.body;

    const shows = await Show.find({ movie, date }).populate("theatre").sort({
      createdAt: -1,
    });

    let uniquetheatres = [];
    shows.forEach((show) => {
      const theatres = uniquetheatres.find(
        (theatre) => theatre._id == show.theatre._id
      );
      if (!theatres) {
        const showsfortheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniquetheatres.push({
          ...show.theatre._doc,
          shows: showsfortheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "Shows Theatre fetched Successfully",
      data: uniquetheatres,
    });
  } catch (error) {
    //console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get show by id
router.post("/get-shows-by-id", async (req, res) => {
  
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");

    res.send({
      success: true,
      message: "show fetched Successfully",
      data:show
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
