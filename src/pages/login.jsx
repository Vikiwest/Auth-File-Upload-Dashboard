import React, { useState } from "react";
import bicycleBoy from "../images/bicycle-boy.svg";
import { useNavigate } from "react-router-dom";
import { setRecord } from "../services/transmitters";
import { referenceVariableData } from "../utils/stores";

function Login() {
  const navigate = useNavigate();

  let [userData, setUserData] = useState({
    email: "",
    password: "",
    isRememberMe: false,
    isLoggedIn: false,
  });
  const { email, password, isRememberMe, isLoggedIn } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name?.trim()]:
        e.target.name === "remember-me" ? e.target.checked : e.target.value,
    });
  };

  // check if the form is completed
  async function formIsFilled(userData) {
    let isFilled = true;
    for (const key in userData) {
      if (userData[key] === "" && typeof userData[key] === "string") {
        isFilled = false;
      } else if (
        userData[key] === false &&
        typeof userData[key] === "boolean"
      ) {
        isFilled = false;
      } else if (userData[key] === undefined) {
        isFilled = false;
      } else if (userData[key] === null) {
        isFilled = false;
      } else {
        isFilled = true;
      }
    }
    return isFilled;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFilled = await formIsFilled(userData);
    // console.log("Is form filled?", isFilled);
    if (isFilled === true) {
      const currentTime = new Date();
      const payload = {
        ...userData,
        isLoggedIn: true, // ✅ Set login status to true
        dateLoggedIn: `${currentTime.getDate()}/${
          currentTime.getMonth() + 1
        }/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`,
      };
      await setRecord(referenceVariableData.localStorage, "user", payload);
      // Update the userData state to reflect the login status
      setUserData(payload);
      // setUserData({ ...userData, isLoggedIn: true });
      // Simulate a successful login
      // console.log("Login successful", userData);
      navigate("/dashboard");
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Login Form (full width on mobile, 50% on desktop) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-8 md:space-y-16">
          <div className="pt-8 md:pt-0 md:-mt-32 pb-10 md:pb-20">
            <h1 className="text-2xl text-[#3751FE] font-bold">Digital</h1>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3751FE]">
              Artificial Intelligence Driving Results For The Travel Industry
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please login to your account.
            </p>
          </div>

          <form className="mt-6 md:mt-8 space-y-6 md:space-y-10">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative border border-gray-300 group focus-within:border-l-[#3751FE] focus-within:border-l-4">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-3 md:py-4 border-0 focus:ring-0 placeholder-gray-500 text-gray-900 text-sm md:text-base bg-transparent placeholder:text-[#3751FE] placeholder:font-bold"
                    placeholder="hakeem@digital.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative border border-gray-300 group focus-within:border-l-[#3751FE] focus-within:border-l-4">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => handleChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-3 md:py-4 border-0 focus:ring-0 placeholder-gray-500 text-gray-900 text-sm md:text-base bg-transparent placeholder:text-[#3751FE] placeholder:font-bold"
                    placeholder="***********"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  value={isRememberMe}
                  onChange={(e) => handleChange(e)}
                  className="h-3 w-3 text-[#3751FE] focus:ring-[#3751FE] border-gray-300"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <button className="text-sm font-medium text-[#3751FE]">
                Forgot password?
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-1/2">
              <button
                value={isLoggedIn}
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full justify-center py-3 px-4 border border-transparent text-sm font-medium shadow-lg shadow-slate-400/50 text-white bg-[#3751FE] focus:outline-none "
              >
                Login
              </button>
              <button
                type="button"
                className="group relative w-full justify-center py-3 px-4 border border-[#3751FE] text-sm font-medium text-black bg-white focus:outline-none "
              >
                Sign Up
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-10 md:pt-20 space-y-4 sm:space-y-0">
              <p className="text-sm sm:text-base">Or login with</p>
              <div className="flex justify-between sm:justify-end sm:space-x-6">
                <button className="text-[#3751FE] font-bold text-sm sm:text-base">
                  Facebook
                </button>
                <button className="text-[#3751FE] font-bold text-sm sm:text-base">
                  LinkedIn
                </button>
                <button className="text-[#3751FE] font-bold text-sm sm:text-base">
                  Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Navbar + Image (hidden on mobile, 50% on desktop) */}
      <div className="hidden md:flex w-full h-screen bg-[#E5E5E5] md:w-1/2 flex-col bg-gradient-to-br min-h-[50vh] md:min-h-full">
        {/* Navbar */}
        <nav className="p-4 md:p-6 flex justify-center">
          <div className="flex space-x-6 lg:space-x-20">
            <button className="text-lg lg:text-xl text-gray-600 font-semibold hover:text-black border-b-2 border-[#3751FE]">
              Home
            </button>
            <button className="text-lg lg:text-xl text-gray-600 font-semibold hover:text-black">
              About
            </button>
            <button className="text-lg lg:text-xl text-gray-600 font-semibold hover:text-black">
              Blog
            </button>
            <button className="text-lg lg:text-xl text-gray-600 font-semibold hover:text-black">
              Pricing
            </button>
          </div>
        </nav>

        {/* Centered Image */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-12">
          <div className="text-center w-full">
            <img
              src={bicycleBoy}
              alt="Decorative"
              className="mx-auto w-full "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
