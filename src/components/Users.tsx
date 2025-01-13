import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAsync,
  deleteUserAsync,
  editUserAsync,
  fetchUsers,
  User,
} from "../Redux/UsersSlice";
import CustomTable from "./common/CustomTable";
import CustomButton from "./common/CustomButton";
import CustomModal from "./common/CustomModal";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { FidgetSpinner } from "react-loader-spinner";
import { Input } from "antd";
import type { RootState, AppDispatch } from "../store/store";
import CustomForm from "./common/CustomForm";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );
  console.log("trying console", users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  console.log("editing userrrrrrr", editingUser);
  const [searchText, setSearchTest] = useState("");

  // Fetch users on page load
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Form initial values for Formik
  const initialValues = {
    name: "",
    coName: "",
    contact: "",
    description: "",
  };

  // Yup validation schema
  const validationSchema = yup.object({
    name: yup.string().required("Client Name is required"),
    coName: yup.string().required("Contact Person is required"),
    contact: yup
      .string()
      .matches(/^[0-9]+$/, "Contact must be a number")
      .required("Contact is required"),
    description: yup.string(), // Optional field
  });

  // Form fields
  const fields = [
    { name: "name", label: "Client Name", placeholder: "Enter Client Name" },
    {
      name: "coName",
      label: "Contact Person",
      type: "text",
      placeholder: "Enter Client Contact Name",
    },
    {
      name: "contact",
      label: "Contact",
      placeholder: "Enter Client Contact Info.",
      type: "number",
    },
    {
      name: "description",
      type: "text-area",
      label: "Brief Description (Optional)",
      placeholder: "Enter Client Description",
    },
  ];

  // Handle form submission
  const handleFormSubmit = (values: User, { resetForm }: any) => {
    console.log("reset form", resetForm);
    if (editingUser) {
      dispatch(editUserAsync({ ...(editingUser as any), ...values }));
    } else {
      const userWithId = {
        ...values,
        id: uuidv4(),
      };
      dispatch(addUserAsync(userWithId));
    }
    setIsModalOpen(false);
    setEditingUser(null);
    resetForm();
  };

  // Table columns
  const columns = [
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Edit",
      key: "edit",
      render: (_: any, record: any) => (
        <CustomButton
          title="Edit"
          className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md"
          onClick={() => {
            setIsModalOpen(true);
            setModalTitle("Edit User");
            setEditingUser(record);
          }}
        />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_: any, record: any) => (
        <CustomButton
          title="Delete"
          className="border border-red-500 text-red-500 hover:bg-red-100 px-4 py-2 rounded-md"
          onClick={() => {
            dispatch(deleteUserAsync(record.id));
          }}
        />
      ),
    },
  ];

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-3 bg-gray-100 min-h-screen w-full">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Manage Users
        </h1>
        <div className="flex justify-between items-center">
          <CustomButton
            type="primary"
            title="Add User"
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md mb"
            onClick={() => {
              setModalTitle("Add User");
              setIsModalOpen(true);
            }}
          />
          <div>
            <Input
              value={searchText}
              onChange={(e: any) => setSearchTest(e.target.value)}
              type="search"
              placeholder="Search"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-5">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <FidgetSpinner
                visible={isLoading}
                height="80"
                width="80"
                ariaLabel="fidget-spinner-loading"
                wrapperStyle={{}}
                wrapperClass="fidget-spinner-wrapper"
              />
            </div>
          ) : (
            <CustomTable
              columns={columns}
              data={filteredUsers}
              className="w-full"
            />
          )}
        </div>
      </div>
      <CustomModal
        open={isModalOpen}
        title={modalTitle}
        onClose={() => {
          setEditingUser(null);
          setIsModalOpen(false);
        }}
        className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6"
      >
        <CustomForm
          initialValues={editingUser || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit as any}
          fields={fields}
        />
      </CustomModal>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Users;
