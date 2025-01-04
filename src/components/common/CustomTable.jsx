import { Table } from "antd";
import React from "react";

const CustomTable = ({ columns, data, className }) => {
  return <Table columns={columns} dataSource={data} scroll={{ y: 'calc(100vh - 50px)' }} className={className}/>;
};

export default CustomTable;
