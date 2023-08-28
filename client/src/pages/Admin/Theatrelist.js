import { Table, message } from "antd";
import React, { useState, useEffect } from "react";
import { GetAlltheatres, updatetheatre } from "../../api/theatres";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

function Thetreslist() {
  const [theatres = [], setTheatres] = useState([]);
  const disptach = useDispatch();

  const getData = async () => {
    try {
      disptach(ShowLoading());
      const response = await GetAlltheatres();

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
            {record.isActive && (
              <span className="">
                <button type="button" classname="btn btn-outline-success"
                 onClick={()=>handleStatusChange(record)}
                >
                  Block
                </button>
              </span>
            )}
            {!record.isActive && (
              
                <button type="button" classname="btn btn-outline-success"
                onClick={()=>handleStatusChange(record)}
                >
                  Approve
                </button>
              
            )}
          </div>
        );
      },
    },
  ];

  const handleStatusChange = async (theatres) => {
    try {
      disptach(ShowLoading());

      const response = await updatetheatre({
        theatreId: theatres._id,
        ...theatres,
        isActive: !theatres.isActive,
      });

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      disptach(Hideloading());
    } catch (error) {
      disptach(Hideloading());
      message.error(error.message);
    }
  };
  return (
    <div className="border">
      <Table columns={columns} dataSource={theatres} />
    </div>
  );
}

export default Thetreslist;
