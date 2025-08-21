import React, { useState, useEffect } from "react";
import { baseUrl } from "../utils/api.env";
import { apiCall } from "../services/api.calls";
import { HttpConstants } from "../utils/stores";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});
  const { customerName, acctBalance, currency, accountType } = customerProfile;

  const [form, setForm] = useState({
    customerName: "",
    acctBalance: "",
    currency: "Naira",
    accountType: "Savings",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdateChange = (event) => {
    setCustomerProfile({
      ...customerProfile,
      [event.target.name?.trim()]: event.target.value,
    });
  };

  const handleAddCustomer = async () => {
    try {
      setForm({
        customerName: "",
        acctBalance: "",
        currency: "Naira",
        accountType: "Savings",
      });
      setShowModal(false);
      const response = await apiCall(HttpConstants.POST, form, undefined);
      setTimeout(() => window.location.reload(), 200);
      return response.data;
    } catch (error) {
      console.error("error from creating new customer>>", error);
    }
  };

  const handleUpdate = async (e, customer) => {
    e.preventDefault();
    try {
      setShowUpdateModal(true);
      setCustomerProfile(customer);
    } catch (err) {
      console.error("Err from update Customer>>", err);
    }
  };

  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall(
        HttpConstants.PATCH,
        customerProfile,
        customerProfile.id
      );
      setShowUpdateModal(true);
      setTimeout(() => window.location.reload(), 200);
      return response.data;
    } catch (err) {
      console.error("err from update customer>>", err);
    }
  };

  const handleDelete = async (e, customerId) => {
    try {
      const response = await apiCall(
        HttpConstants.DELETE,
        undefined,
        customerId
      );
      setTimeout(() => window.location.reload(), 200);
      return response.data;
    } catch (error) {
      console.error("err from delete customer>>>", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const fetchRequests = await apiCall(
        HttpConstants.GET,
        undefined,
        undefined
      );
      setCustomers(fetchRequests?.data);
      return fetchRequests?.data;
    } catch (err) {
      console.error("err from GET request>>", err);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              <span className="text-blue-600">Customer</span> Accounts
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Customer
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Account Balance
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Currency
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Account Type
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <p className="text-lg">No customers found</p>
                        <p className="text-sm mt-1">
                          Add your first customer to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((customer, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {customer.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {customer.acctBalance}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {customer.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            customer.accountType === "Savings"
                              ? "bg-green-100 text-green-800"
                              : customer.accountType === "Current"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {customer.accountType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => handleUpdate(e, customer)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, customer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  New Customer
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Balance
                  </label>
                  <input
                    type="number"
                    name="acctBalance"
                    value={form.acctBalance}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="0.00"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option>Naira</option>
                      <option>USD</option>
                      <option>Pounds</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      name="accountType"
                      value={form.accountType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option>Savings</option>
                      <option>Current</option>
                      <option>Fixed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:shadow-md transition"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Customer Name</label>
              {/* form.customerName */}
              <input
                type="text"
                name="customerName"
                value={customerName}
                onChange={(event) => handleUpdateChange(event)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Account Balance</label>
              {/* form.acctBalance */}
              <input
                type="number"
                name="acctBalance"
                value={acctBalance}
                onChange={(event) => handleUpdateChange(event)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Currency</label>
              {/* form.currency */}
              <select
                name="currency"
                value={currency}
                onChange={(event) => handleUpdateChange(event)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option>Naira</option>
                <option>USD</option>
                <option>Pounds</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-medium">Account Type</label>
              {/* form.accountType */}
              <select
                name="accountType"
                value={accountType}
                onChange={(event) => handleUpdateChange(event)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option>Savings</option>
                <option>Current</option>
                <option>Fixed</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={(e) => updateCustomer(e)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;
