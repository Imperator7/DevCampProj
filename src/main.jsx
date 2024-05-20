import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, combineReducers } from 'redux'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Register from './components/Register.jsx'
import SignIn from './components/Signin.jsx'
import Home from './components/Home.jsx'
import axios from 'axios'

const mainEndpoint = 'https://crudcrud.com/api/8dee5a6425e94d9198af5e48c3230298' 
const userEndpoint = mainEndpoint + '/users'
const waitListEndpoint = mainEndpoint + '/waitlist'

const users = await axios.get(userEndpoint)
const handleLogIn = () => {
  console.log("Log in")
}

const handleRegister = async (userRegister) => {
  console.log(users.data.map((user) => console.log(user.user.email)))
  console.log(userRegister.email)
  const created = await users.data.filter((user) => user.user.email === userRegister.email)
  console.log(users.data)
  console.log(created)
  if (!created) {
    const newUser = await axios.post(userEndpoint, {
      user: {
        name: userRegister.name,
        username: userRegister.username,
        email: userRegister.email,
        password: userRegister.password
      }
    })
    axios.get(userEndpoint).then((r)=> console.log(r.data))
  } else {
    console.log("This email is already used, please try again with other email. ")
  }
}

const cloneDeep = (state) => {
  return JSON.parse(JSON.stringify(state))
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <SignIn />
  },
  {
    path: "/home",
    element: <Home/>
  }
])

const loginUserReducer = (state = { username: '', userpassword: ''}, action) => {
  if (action.type === 'LOG_IN') {
    const newState = cloneDeep(state)
    newState.username = action.payload.username
    newState.userpassword = action.payload.userpassword
    handleLogIn()
    return newState
  }

  return state
}

const  registerUserReducer = (state = { email: '', password: ''}, action) => {

  if (action.type === 'SET_STATE') {
    const newState = cloneDeep(state);
    newState.email = action.payload.email;
    newState.password = action.payload.password;

    console.log(newState)
    return newState

  }

  if (action.type === 'REGISTER') {
    handleRegister(action.payload)
  }
  return state
}

const storeReducer = combineReducers({
  loginUser: loginUserReducer, 
  registerUser: registerUserReducer
})

const store = createStore(storeReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
