import { Modal } from "antd";
import React from "react";
import CustomForm from "./CustomForm";

const CustomModal = ({
  open,
  title,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
}) => {
  return (
    <Modal
      open={open}
      title={
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      }
      onCancel={onClose}
      footer={null}
      className="rounded-lg shadow-lg"
    >
      <div className="space-y-4">
        <CustomForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          fields={fields}
        />
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
