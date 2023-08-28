import { Button, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import Theatreform from "./theatreform";
import { GetAlltheatresByOwner, deleteTheatre } from "../../api/theatres";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { pink } from "@mui/material/colors";
import Shows from "./Shows";

function Thetreslist() {
  const [showTheatreFormModel = false, setShowTheatreFormModel] =
    useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formtype, setFormtype] = useState("add");
  const [theatres = [], setTheatres] = useState([]);
  const [openShowsModal = false, setOpenShowsModal] = useState(false);

  const { user } = useSelector((state) => state.users);
  const disptach = useDispatch();
  const handleDelete = async (id) => {
    try {
      disptach(ShowLoading());

      const response = await deleteTheatre({ theatreId: id });
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
  const getData = async () => {
    try {
      disptach(ShowLoading());
      const response = await GetAlltheatresByOwner({
        owner: user._id,
      });

      if (response.success) {
        setTheatres(response.data);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phoneno",
      dataIndex: "phoneno",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending/Blocked";
        }
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
                setSelectedTheatre(record);
                setFormtype("edit");
                setShowTheatreFormModel(true);
              }}
            />
            <DeleteSharpIcon
              sx={{ color: pink[500] }}
              onClick={() => {
                handleDelete(record._id);
              }}
            />

            {record.isActive && (
              <button
                type="button"
                classname="btn btn-outline-success"
                onClick={() => {
                  setSelectedTheatre(record);
                  setOpenShowsModal(true);
                  
                }}
              >
                Shows
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="border">
      <div className="d-flex justify-content-end m-2">
        <Button
          outlined
          onClick={() => {
            setFormtype("add");
            setShowTheatreFormModel(true);
          }}
        >
          Add Theatre
        </Button>
      </div>
      <Table columns={columns} dataSource={theatres} />
      {showTheatreFormModel && (
        <Theatreform
          showTheatreFormModel={showTheatreFormModel}
          setShowTheatreFormModel={setShowTheatreFormModel}
          formtype={formtype}
          setFormtype={setFormtype}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
      {openShowsModal && (
        <Shows
          openShowsModal={openShowsModal}
          setOpenShowsModal={setOpenShowsModal}
          theatre={selectedTheatre}
        />
      )}
    </div>
  );
}

export default Thetreslist;
