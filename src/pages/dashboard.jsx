import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecord, setRecord } from "../services/transmitters";
import { referenceVariableData } from "../utils/stores";
// Mock data exports
const statsData = [
  {
    name: "Total Users",
    value: "2,420",
    change: "+12%",
    changeType: "positive",
  },
  {
    name: "Active Sessions",
    value: "1,210",
    change: "+4%",
    changeType: "positive",
  },
  {
    name: "Failed Logins",
    value: "32",
    change: "-8%",
    changeType: "negative",
  },
  {
    name: "Avg. Session",
    value: "4m 32s",
    change: "+1.2%",
    changeType: "positive",
  },
];

// Sidebar component
function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  handleLogout,
}) {
  const navigate = useNavigate();
  const handleNavigate = (route, e) => {
    e.preventDefault();
    // navigate("/fileupload");
    navigate(route);
  };
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    },
    {
      id: "users",
      label: "Users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      id: "security",
      label: "Security",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      id: "fileuploads",
      label: "File Uploads",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      route: "/fileupload",
    },
    {
      id: "customer-data",
      label: "Customer Data",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      route: "/customer-data",
    },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-indigo-700 text-white transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold">Auth Dashboard</h1>
        ) : (
          <h1 className="text-xl font-bold">AD</h1>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-md hover:bg-indigo-600"
        >
          {sidebarOpen ? "«" : "»"}
        </button>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center px-4 py-3 cursor-pointer ${
              activeTab === item.id ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
            onClick={(e) => {
              setActiveTab(item.id);
              if (item.route) {
                handleNavigate(item.route, e);
              }
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={item.icon}
              />
            </svg>
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <button
          onClick={handleLogout}
          className="flex items-center  p-2 text-left rounded-md hover:bg-indigo-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}

// Header component
function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard Overview
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User profile"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// StatsCards component
function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                stat.changeType === "positive"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// RecentActivity component
export function RecentActivity({ loginDetails }) {
  let [loginRecord, setLoginRecord] = useState([]);
  // const location = useLocation();
  // const { state } = location;

  useEffect(
    () => {
      const fetchData = async () => {
        // const getLoggedInUser = localStorage.getItem("user");
        // //    const getLoggedInUser = sessionStorage.getItem("user");
        // if (getLoggedInUser !== null) {
        //   let parseData = JSON.parse(getLoggedInUser);
        //   let rows = [];
        //   rows.push(parseData);
        //   setLoginRecord(rows);
        // }
        // if (state) {
        //   let rows = [];
        //   rows.push(state);
        //   setLoginRecord(rows);
        // }

        const getData = await getRecord();
        setLoginRecord(getData);
        console.table(getData);
      };
      fetchData();
    },
    [
      // state
    ]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {loginRecord.map((item, index) => (
          <div key={item.id || index} className="px-6 py-4 flex items-center">
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                index.status === "success"
                  ? "bg-green-100 text-green-500"
                  : index.status === "failed"
                  ? "bg-red-100 text-red-500"
                  : "bg-blue-100 text-blue-500"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {item.action && item.action.includes("Login") ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                ) : item.action && item.action.includes("Password") ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                )}
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <p className="text-sm font-medium text-gray-900">
                    {index + 1}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {item?.email || "Unknown User"}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {item?.dateLoggedIn || "N/A"}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {item.isLoggedIn ? "✅ Logged In" : "❌ Logged Out"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View all activity
        </button>
      </div>
    </div>
  );
}

// Charts component
function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Login Activity
        </h3>
        <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Chart would go here</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          User Distribution
        </h3>
        <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Chart would go here</p>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard component
function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const currentUser = await getRecord();
    const updatedUser = { ...currentUser, isLoggedIn: false };
    await setRecord(referenceVariableData.localStorage, "user", updatedUser);

    navigate("/");
    console.log("User logged out");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <StatsCards stats={statsData} />
          <RecentActivity />
          <Charts />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
