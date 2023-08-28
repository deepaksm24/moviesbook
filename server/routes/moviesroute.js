const router = require("express").Router();
const Movie = require("../model/movieModel");
const authMiddleware = require("../middleware/authMiddleware")

// Add a movie

router.post("/add-movie", async (req, res) => {
    try {
    
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.send({
        success: true,
        message: "Movie Added Successfully",
      });
    } catch (error) {
      //console.log(error);
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  router.get("/get-all-movies", async (req, res) => {
    try {

      const movies =  await Movie.find();
      

      res.send({
        success: true,
        message: "Movie fetched Successfully",
        data: movies
      });
    } catch (error) {
      //console.log(error);
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  //edit movie
  router.post("/update-movie", authMiddleware, async (req, res) => {
    try {
     

      await Movie.findByIdAndUpdate(req.body.moviesId,req.body);
      
      res.send({
        success: true,
        message: "Movie Edited Successfully",
      });


    } catch (error) {
      
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

// delete a movie
router.post("/delete-movie", authMiddleware, async (req, res) => {
  try {
   
    
    await Movie.findByIdAndDelete(req.body.moviesId);
    
    res.send({
      success: true,
      message: "Movie Deleted Successfully",
    });


  } catch (error) {
    
    res.send({
      success: false,
      message: error.message,
    });
  }
});
//get movie by id
router.get("/get-movie-by-id/:id", async (req, res) => {
  try {
   
    
    const movie = await Movie.findById(req.params.id);
    
    res.send({
      success: true,
      message: "Movie fetched Successfully",
      data : movie
    });


  } catch (error) {
    
    res.send({
      success: false,
      message: error.message,
    });
  }
});




  module.exports = router;