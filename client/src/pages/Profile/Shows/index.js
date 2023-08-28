import { Button, Col, Form, Row, Table, message } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllmovie } from "../../../api/movies";
import { Hideloading, ShowLoading } from "../../../redux/loadersSlice";
import { AddShow, DeleteShow,GetAllShowsbyTheatre } from "../../../api/theatres";
import moment from "moment";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { pink } from "@mui/material/colors";

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
  const [view, setView] = React.useState("table");
  const [shows, setShows] = React.useState([]);
  const dispatch = useDispatch();
  const [movies, setMovies] = React.useState([]);

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteShow({
        showId: id,
      });
      if (response.success) {
        dispatch(ShowLoading());
        getData();
        message.success(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      message.error(error.message);
      dispatch(Hideloading());
    }
  };

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const moviesresponse = await GetAllmovie();

      if (moviesresponse.success) {
        setMovies(moviesresponse.data);
      } else {
        message.error(moviesresponse.message);
      }
      const showsresponse = await GetAllShowsbyTheatre({
        theatreId: theatre._id,
      });
 
      if (showsresponse.success) {
        setShows(showsresponse.data);
      } else {
        message.error(showsresponse.message);
      }

      dispatch(Hideloading());
    } catch (error) {
      message.error(error.message);
      dispatch(Hideloading());
    }
  };
  const handleAddShow = async (values) => {
    // const movieresult = movies.filter((movie) => {movie.title === values.movie});
    //console.log("result",movieresult);
    try {
      dispatch(ShowLoading());
      const response = await AddShow({
        ...values,
        theatre: theatre._id,
      });

      if (response.success) {
        message.success(response.message);
        getData();
        setView("table");
      } else {
        message.error(response.message);
      }

      dispatch(Hideloading());
    } catch (error) {
      message.error(error.message);
      dispatch(Hideloading());
    }
  };
  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, action) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, record) => {
        return record.movie.title;
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketprice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalseats",
    },
    {
      title: "Available Seats",
      dataIndex: "availableseats",
      render: (text, record) => {
        return record.totalseats - record.bookedseats.length;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="d-flex gap-2">
            {record.bookedseats.length === 0 && (
              <DeleteSharpIcon
                sx={{ color: pink[500] }}
                onClick={() => {
                  handleDelete(record._id);
                }}
              />
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      className="w-100"
      title="SHOWS"
      open={openShowsModal}
      onCancel={() => {

        setOpenShowsModal(false)
        setShows(null);
      }
      
      }
      footer={null}
    >
      <h1 className="">THEATRE: {theatre.name}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <h5 className=""> {view === "table" ? "Shows" : "Add Show"}</h5>
        {view === "table" && (
          <Button
            onClick={() => {
              setView("form");
            }}
          >
            Add Show
          </Button>
        )}
      </div>
      {view === "table" && (
        <Table className="border mt-3" columns={columns} dataSource={shows} />
      )}

      {view === "form" && (
        <Form
          layout="vertical"
          onFinish={handleAddShow}
          // onSubmitCapture={handleAddShow}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please input Show name" }]}
              >
                <input className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input Show Date" }]}
              >
                <input
                  className="w-75"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please input Show TIME" }]}
              >
                <input className="w-50" type="time" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Movie"
                name="movie"
                rules={[{ required: true, message: "Please Select Movie" }]}
              >
                <select className="w-100">
                  <option value="">Select Movie</option>
                  {movies.map((movie) => (
                    <option value={movie._id}>{movie.title}</option>
                  ))}
                </select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ticket Price"
                name="ticketprice"
                rules={[
                  { required: true, message: "Please enter price in Rupees" },
                ]}
              >
                <input className="w-75" type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Seats"
                name="totalseats"
                rules={[
                  { required: true, message: "Please input total Seats" },
                ]}
              >
                <input className="w-50" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button type="primary" className="m-2" htmlType="submit">
              Save
            </Button>
            <Button
              danger
              className="m-2"
              onClick={() => {
                setView("table");
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default Shows;
