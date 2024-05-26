import React, { act, useId } from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, combineReducers } from "redux";
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import Register from "./components/Register.jsx";
import SignIn from "./components/Signin.jsx";
import Home from "./components/Home.jsx";
import axios from "axios";

const removeKeys = (obj, keys) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
const mainEndpoint =
  "https://crudcrud.com/api/fc48a2a443aa4dde812c10344ee9b082";
const userEndpoint = mainEndpoint + "/users";

let users;

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {
    email: "",
    password: "",
    name: "",
    username: "",
    movieList: [],
  },
};

const handleLogIn = async (userLogIn) => {
  users = await axios.get(userEndpoint);
  const filteredArray = await users.data.filter(
    (user) => user.email === userLogIn.email
  );

  const created = filteredArray.length === 0;
  if (!created) {
    if (userLogIn.password === filteredArray[0].password) {
      console.log("successfully login");
      localStorage.setItem("user", JSON.stringify({ ...filteredArray[0] }));
      location.href = "/home";
    } else {
      alert("Please recheck your email and password.");
    }
  } else {
    alert("Please recheck your email and password.");
  }
};

const handleRegister = async (userRegister) => {
  users = await axios.get(userEndpoint);
  const filteredArray = await users.data.filter(
    (user) => user.email === userRegister.email
  );
  const created = filteredArray.length === 0;

  if (created) {
    const newUser = await axios.post(userEndpoint, {
      name: userRegister.name,
      username: userRegister.username,
      email: userRegister.email,
      password: userRegister.password,
      movieList: userRegister.movieList || [],
    });
    axios.get(userEndpoint).then((r) => console.log(r.data));
    alert("You're succesfully create new id.");
    location.href = "/login";
  } else {
    alert("This email is already used, please try again with other email.");
  }
};

const handleLogOut = async (state) => {
  const newState = cloneDeep(state);
  console.log("LOG_OUT", newState);
  newState.name = "";
  newState.username = "";
  newState.email = "";
  newState.password = "";
  newState.movieList = [];
  console.log("LOG_OUT", newState);
  return newState;
};

const updateEndpoint = async (state) => {
  const users = await axios.get(userEndpoint);
  const userTarget = users.data.find((user) => user.email === state.email);
  const userId = userTarget._id;
  try {
    const res = await axios.put(
      `${userEndpoint}/${userId}`,
      removeKeys(state, ["_id"])
    );
  } catch (error) {
    console.error(error);
  }
};

const cloneDeep = (state) => {
  return JSON.parse(JSON.stringify(state));
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

const userReducer = (state = initialState.user, action) => {
  if (action.type === "SET_STATE") {
    const newState = cloneDeep(state);
    newState.email = action.payload.email || "";
    newState.name = action.payload.name || "";
    newState.username = action.payload.username || "";
    newState.password = action.payload.password || "";
    newState.movieList = action.payload.movieList || [];

    return newState;
  } else if (action.type === "REGISTER") {
    handleRegister(action.payload);
  } else if (action.type === "LOG_IN") {
    handleLogIn(action.payload, state);
  } else if (action.type === "LOG_OUT") {
    handleLogOut(state);
  } else if (action.type === "ADD_MOVIE") {
    const newState = cloneDeep(state);

    if (!newState.movieList.includes(action.payload)) {
      newState.movieList.push(action.payload);
    }
    updateEndpoint(newState);
    return newState;
  } else if (action.type === "REMOVE_MOVIE") {
    const newState = cloneDeep(state);
    newState.movieList = newState.movieList.filter(
      (movie) => movie !== action.payload
    );
    updateEndpoint(newState);
    return newState;
  }
  return state;
};

const storeReducer = combineReducers({
  user: userReducer,
});

const store = createStore(storeReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
