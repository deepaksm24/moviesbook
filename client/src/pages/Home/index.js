import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { Col, Row, message } from "antd";
import { GetAllmovie } from "../../api/movies";
import { useNavigate } from "react-router-dom";
import moment from "moment"

function Home() {
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllmovie();

      if (response.success) {
        setMovies(response.data);
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

  return (
    <div>
    

      <Row>
        {movies.map((movie) => (
          <div
            className="card m-2 p-1 cursor-pointer"
            style={{ width: "18rem" }}
            onClick={() => {
              navigate(
                `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
              );
            }}
          >
            <img
              className="card-img-top"
              height={220}
              width={200}
              src={movie.poster}
              alt="Card image cap"
            />
            <div className="card-body">
              <h2 className="card-text text-uppercase">{movie.title}</h2>
            </div>
          </div>
          // <div className="d-flex justify-content-start">
          //   <img
          //     src={movie.poster}
          //     className="shadow m-2 rounded bg-white"
          //     height ={220}
          //     width ={230}
          //     alt="Responsive image"
          //   />
          // </div>
        ))}
      </Row>
    </div>
  );
}

export default Home;
