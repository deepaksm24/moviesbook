import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { Col, Row, message } from "antd";
import { GetAllmovie, GetMoviebyid } from "../../api/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { GetAllTheatresbyMovie } from "../../api/theatres";

function TheatresforMovie() {
  //GET DATE FROM QUERY
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );
  const [movie, setMovie] = React.useState([]);
  const [theatres, setTheatres] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMoviebyid(params.id);

      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
        dispatch(Hideloading());
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
    }
  };
  const gettheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresbyMovie({ date, movie: params.id });

      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
        dispatch(Hideloading());
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    gettheatres();
  }, [date]);

  return (
    movie && (
      //movie info
      <div>
        <div className="d-flex justify-content-between m-1">
          <div>
            <h3>
              {movie.title} ({movie.language})
            </h3>
            <h4>Duration: {movie.duration} </h4>
            <h6>
              Release Date: {moment(movie.releasedate).format("MMM Do yyyy")}{" "}
            </h6>
            <h6>Genre: {movie.genre} </h6>
          </div>
          <div>
            <h3>Select Date</h3>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>
        <hr />
        <div>
          <h2>THEATRES</h2>
          <div>
            {theatres.map((theatre) => (
              <div className="container-fluid border rounded m-2">
                <h1 className="m-1">{theatre.name}</h1>
                <h4 className="m-1">{theatre.address}</h4>
                <div className="d-flex align-items-start m-1">
                  {theatre.shows
                    .sort(
                      (a, b) =>
                        moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                    )
                    .map((show) => (
                      <div>
                        <button
                          type="button"
                          className="btn btn-light border-dark border-1 m-2"
                          onClick={() => {
                            navigate(`book-show/${show._id}`);
                          }}
                        >
                          {moment(show.time, "HH:mm").format("hh:mm A")}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default TheatresforMovie;
