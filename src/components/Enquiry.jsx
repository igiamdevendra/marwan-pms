import React from "react";
import CustomTable from "./common/CustomTable";
import { data } from "../tempData/tempData";
import CustomButton from "./common/CustomButton";

const Enquiry = () => {
  const columns = [
    {
      title: "SI",
      dataIndex: "SI",
      key: "name",
    },
    {
      title: "Enq No.",
      dataIndex: "Enq No.",
      key: "Enq No.",
    },
    {
      title: "Enq Type",
      dataIndex: "Enq Type",
      key: "Enq Type",
    },
    {
      title: "Enq Title",
      dataIndex: "Enq Title",
      key: "Enq Title",
      ellipsis: true,
    },
    {
      title: "End-User",
      dataIndex: "End-User",
      key: "End-User",
    },
    {
      title: "Plant",
      dataIndex: "Plant",
      key: "Plant",
    },
    {
      title: "Client",
      dataIndex: "Client",
      key: "Client",
    },
    {
      title: "Vendor",
      dataIndex: "Vendor",
      key: "Vendor",
    },
    {
      title: "Offer Status",
      dataIndex: "Offer Status",
      key: "Offer Status",
    },
    {
      title: "Resp",
      dataIndex: "Resp",
      key: "Resp",
    },
    {
      title: "Closing Date",
      dataIndex: "Closing Date",
      key: "Closing Date",
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <CustomButton
          type="ghost"
          title="Edit"
           className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md disabled disabled:cursor-not-allowed"
          disabled={true}
        />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <CustomButton
          type="danger"
          title="Delete"
          className="border border-red-500 text-red-500 hover:bg-red-100 px-4 py-2 rounded-md disabled disabled:cursor-not-allowed"
          disabled={true}
        />
      ),
    },
    // {
    //   title: "Copy",
    //   key: "Copy",
    // },
    // {
    //   title: "Edit",
    //   key: "Edit",
    // },
    // {
    //   title: "Delete",
    //   key: "Delete",
    // },
  ];
  return (
    <div className = "w-full">
       <CustomTable columns={columns} data={data} className="w-full h-screen" />
    </div>
  );

};

export default Enquiry;
