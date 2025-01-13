import { Form, Field, ErrorMessage, Formik, FormikHelpers } from "formik";
import { FC } from "react";

// Type definitions for the form fields
interface FieldType {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface CustomFormProps<T = Record<string, any>> {
  initialValues: T;
  validationSchema: any;
  onSubmit: (values: T, actions: FormikHelpers<T>) => void;
  fields: FieldType[];
}

const CustomForm: FC<CustomFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              {field.type === "text-area" ? (
                <Field
                  as="textarea"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  rows={5}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              ) : (
                <Field
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors[field.name] && touched[field.name]
                      ? "border-red-600"
                      : "border-gray-300"
                  }`}
                />
              )}
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
