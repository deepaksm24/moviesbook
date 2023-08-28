import { Button, Form, Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, Hideloading } from "../../redux/loadersSlice";
import { Addtheatre, updatetheatre } from "../../api/theatres";

function Theatreform({
  showTheatreFormModel,
  setShowTheatreFormModel,
  formtype,
  setFormtype,
  selectedTheatre,
  setSelectedTheatre,
  getData

}) {
  const dispatch = useDispatch();
 const {user} = useSelector((state) => state.users)
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
     values.owner = user._id;
      let response = null;
      if (formtype === "add") {
        response = await Addtheatre(values);
      } else {
        dispatch(ShowLoading());
        values.theatreId = selectedTheatre._id;
        response = await updatetheatre(values);

      }

      if (response.success) {
        message.success(response.message);
        setSelectedTheatre(null);
        setShowTheatreFormModel(false);
        getData();
        
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
        title={formtype === "add" ? "Add Theatre" : "Edit Theatre"}
        open={showTheatreFormModel}
        onCancel={() => {
          setShowTheatreFormModel(false);
          setSelectedTheatre(null);
        }}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}
        initialValues={selectedTheatre}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter theatre name" }]}
          >
            <input className="w-100" type="text" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter theatre address" },
            ]}
          >
            <textarea className="w-100" type="text" />
          </Form.Item>
          <div className="d-flex justify-content-around gap-2">
            <Form.Item
              label="PhoneNo"
              name="phoneno"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <input className="w-100" type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <input className="" type="text" />
            </Form.Item>
          </div>
          <div className="d-flex justify-content-end gap-3">
            <Button
              type="primary"
              danger
              ghost
              onClick={() => {
                setShowTheatreFormModel(false);
                setSelectedTheatre(null);
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

export default Theatreform;
