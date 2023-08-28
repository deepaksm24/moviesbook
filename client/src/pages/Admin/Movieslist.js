import React, { useEffect } from "react";
import Moviesform from "./Moviesform";
import moment from "moment";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllmovie, deleteMovie } from "../../api/movies";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { pink } from "@mui/material/colors";

function Movieslist() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModel, setShowMovieFormModel] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formtype, setFormtype] = React.useState("add");

  const disptach = useDispatch();

  const getData = async () => {
    try {
      disptach(ShowLoading());
      const response = await GetAllmovie();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
        disptach(Hideloading());
      }
      disptach(Hideloading());
    } catch (error) {
      disptach(Hideloading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (moviesId) => {
    try {
      disptach(ShowLoading());
      const response = await deleteMovie({moviesId,});
      if (response.success) {
        message.success("Deleted");
        getData();
      } else {
        message.error(response.message);
        disptach(Hideloading());
      }
      disptach(Hideloading());
    } catch (error) {
      disptach(Hideloading());
    }
  };

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return (
          <img
            src={record.poster}
            alt="poster"
            className="rounded float-left img-fluid"
            // style = {{width:120, height:100}}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "ReleaseDate",
      dataIndex: "releasedate",
      render: (text, record) => {
        return moment(record.releasedate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="d-flex gap-2">
            <EditNoteSharpIcon
              onClick={() => {
                setSelectedMovie(record);
                setFormtype("edit");
                setShowMovieFormModel(true);
              }}
            />
            <DeleteSharpIcon sx={{ color: pink[500] }} 
            
            onClick={() => {
              handleDelete(record._id)
              
            }} />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            setShowMovieFormModel(true);
            setFormtype("add");
          }}
        >
          Add Movie
        </button>
      </div>
      <Table columns={columns} dataSource={movies} className="border rounded" />

      {showMovieFormModel && (
        <Moviesform
          showMovieFormModel={showMovieFormModel}
          setShowMovieFormModel={setShowMovieFormModel}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formtype={formtype}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Movieslist;
