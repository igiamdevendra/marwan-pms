import { Modal } from "antd";
import { FC } from "react";
import CustomForm from "./CustomForm";
import { FormikValues } from "formik";

// Type definitions for the form fields
interface FieldType {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface CustomModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

const CustomModal: FC<CustomModalProps> = ({
  open,
  title,
  onClose,
  className,
  children,
}) => {
  return (
    <Modal
      open={open}
      title={<h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
      onCancel={onClose}
      footer={null}
      className={`rounded-lg shadow-lg ${className}`}
    >
      {children}
      <div className="space-y-4">
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
