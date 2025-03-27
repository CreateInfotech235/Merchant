import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { manageSubscription } from "../../Components_admin/Api/Subscription";
import { AiOutlinePlus, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import ToggleSwitch from "./ToggleSwitch";

const SubscriptionModel = ({ onHide, types, subscription, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDesable, setIsDesable] = useState(subscription ? subscription.isDesable : false);
  const [discount, setDiscount] = useState(subscription ? subscription.discount : 0);
  const [amount, setAmount] = useState(subscription ? subscription.amount : 0);
  const convertSecondsToDays = (seconds) => {
    return Math.floor(seconds / (24 * 60 * 60));
  };

  const days = convertSecondsToDays(subscription ? subscription.seconds : 0)
  const initialValues = {
    subscriptionId: subscription ? subscription._id : "",
    type: subscription ? subscription.type : "",
    amount: subscription ? subscription.amount : "",
    discount: subscription ? subscription.discount : "",
    features: subscription ? subscription.features : [""],
    days: subscription ? days : "",
    isDesable: subscription ? subscription.isDesable : false,
    poulartext: subscription ? subscription.poulartext : "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Subscription type is required"),
    amount: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
      .required("Amount is required"),
    discount: Yup.number()
      .typeError("Discount must be a number")
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%"),
    features: Yup.array()
      .of(Yup.string().required("Feature cannot be empty"))
      .required("At least one feature is required"),
    days: Yup.number()
      .typeError("Days must be a number")
      .min(1, "Days must be at least 1")
      .required("Days are required"),
    isDesable: Yup.boolean().required("Status is required"),
    poulartext: Yup.string().required("Poular text is required"),
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        ...values,
        amount: values.amount === "" ? 0 : values.amount,
        discount: values.discount === "" ? 0 : values.discount,
        isDesable: isDesable,
        poulartext: values.poulartext
      };
      console.log(payload);
      const response = await manageSubscription(payload);
      if (response) {
        onHide();
        onUpdate();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed rounded-lg  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h5 className="text-xl font-bold">
            {types === "Add" ? "Add New" : "Update"} Subscription Plan
          </h5>
          <button
            onClick={onHide}
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className="space-y-4">
                <div className="space-y-4">
                  {/* Subscription Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Subscription Type
                    </label>
                    <Field
                      type="text"
                      name="type"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter subscription type"
                    />
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Popular Text
                    </label>
                    <Field
                      type="text"
                      name="poulartext"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter poular text"
                    />
                    <ErrorMessage
                      name="poulartext"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Amount and Discount Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Amount
                      </label>
                      <Field
                        type="number"
                        name="amount"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter amount"
                      />
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Discount (%)
                      </label>
                      <Field
                        type="number"
                        name="discount"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter discount"
                        min={0}
                        max={100}

                      />
                      <ErrorMessage
                        name="discount"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Final Amount After Discount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Amount After Discount
                    </label>
                    <div className="w-full px-4 py-2 border rounded-lg bg-gray-50">
                      {formik.values.amount
                        ? formik.values.discount
                          ? (
                            formik.values.amount -
                            (formik.values.amount * (formik.values.discount || 0)) / 100
                          ).toFixed(2)
                          : formik.values.amount
                        : "0.00"}
                    </div>
                  </div>

                  {/* Days */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Days
                    </label>
                    <Field
                      type="number"
                      name="days"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter number of days"
                    />
                    <ErrorMessage
                      name="days"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Features */}
                  <div>

                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-600">
                        Status
                      </label>
                      <ToggleSwitch
                        checked={isDesable}
                        setChecked={setIsDesable}
                        className="ml-2"
                      />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-600">
                        Features
                      </label>
                      <button
                        type="button"
                        className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                        onClick={() =>
                          formik.setFieldValue("features", [
                            ...formik.values.features,
                            "",
                          ])
                        }
                      >
                        <AiOutlinePlus className="mr-1" /> Add Feature
                      </button>
                    </div>
                    <FieldArray
                      name="features"
                      render={(arrayHelpers) => (
                        <div className="space-y-2 max-h-60 overflow-y-auto border border-[#ff0000a1] rounded-lg p-2">
                          {formik.values.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Field
                                name={`features.${index}`}
                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter feature description"
                              />
                              <button
                                type="button"
                                className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <AiOutlineDelete size={20} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      onHide();
                      formik.resetForm();
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <BiLoaderAlt className="animate-spin mr-2" />
                        {types === "Add" ? "Adding..." : "Updating..."}
                      </>
                    ) : (
                      types === "Add" ? "Add Plan" : "Update Plan"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModel;
