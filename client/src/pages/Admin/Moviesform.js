import React from "react";
import { Button, Col, Form, Modal, Row, message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, Hideloading } from "../../redux/loadersSlice";
import { Addmovie, updateMovie } from "../../api/movies";
import moment from "moment";

function Moviesform({
  showMovieFormModel,
  setShowMovieFormModel,
  selectedMovie,
  setSelectedMovie,
  formtype,
  getData
}) {
  const dispatch = useDispatch();

  if(selectedMovie){
    selectedMovie.releasedate= moment(selectedMovie.releasedate).format("YYYY-MM-DD");

  }
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      let response = null;
      if (formtype === "add") {
        response = await Addmovie(values);
      } else {

        response = await updateMovie(
          {
            ...values,
            moviesId: selectedMovie._id
          }
          
          );
      }

      if (response.success) {
        getData();
        message.success(response.message);

        setShowMovieFormModel(false);
      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        title={formtype === "add" ? "Add Movie" : "Edit Movie"}
        open={showMovieFormModel}
        onCancel={() => {
          setShowMovieFormModel(false);
          setSelectedMovie(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedMovie}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Movie Name" name="title">
                <input className="w-100" type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Movie Description" name="description">
                <textarea className="w-100" type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Movie Duration" name="duration">
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Language" name="language">
                <select className="w-80">
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Movie Release Date" name="releasedate">
                <input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Genre" name="genre">
                <select className="w-80">
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Love">Love</option>
                  <option value="Crime">Crime</option>
                </select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="PosterURL" name="poster">
                <input className="w-100" type="text" />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-3">
            <Button
              type="primary"
              danger
              ghost
              onClick={() => {
                setShowMovieFormModel(false);
                setSelectedMovie(null);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" success>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Moviesform;
