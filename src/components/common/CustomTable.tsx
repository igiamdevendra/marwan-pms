import { FC } from 'react';
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

interface CustomTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  className?: string;
}

const CustomTable = <T extends object>({ columns, data, className }: CustomTableProps<T>) => {
  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      scroll={{ y: 'calc(100vh - 50px)' }} 
      className={className}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  );
};

export default CustomTable;
