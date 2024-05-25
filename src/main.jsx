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

const mainEndpoint = 'https://crudcrud.com/api/f65a67b05b704452a59234ef4f041cc3' 
const userEndpoint = mainEndpoint + '/users'


let users;

const handleLogIn = async (userLogIn, state) => {
  users = await axios.get(userEndpoint)
  const filteredArray = await users.data.filter((user) => user.user.email === userLogIn.email)
  const created = filteredArray.length === 0 
  if (!created) {
    if (userLogIn.password === filteredArray[0].user.password) {
      console.log('successfully login')
      localStorage.setItem('user', JSON.stringify(filteredArray[0].user))
      location.reload()
    } else {
      alert('Please recheck your email and password.')
    }
  } else {
    alert('Please recheck your email and password.')
  }
}

const handleRegister = async (userRegister) => {
  users = await axios.get(userEndpoint)
  const filteredArray = await users.data.filter((user) => user.user.email === userRegister.email)
  const created = filteredArray.length === 0 

  if (created) {
    const newUser = await axios.post(userEndpoint, {
      user: {
        name: userRegister.name,
        username: userRegister.username,
        email: userRegister.email,
        password: userRegister.password,
        movieList: userRegister.movieList
      }
    })
    axios.get(userEndpoint).then((r)=> console.log(r.data))
    alert("You're succesfully create new id.")
  } else {
    alert("This email is already used, please try again with other email.")
  }
}

const handleLogOut = async (state) => {
  const newState = cloneDeep(state)
  newState.name = ''
  newState.username = ''
  newState.email = ''
  newState.password = ''
  newState.movieList = []
  return newState
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
  },
])


const userReducer = (state = { email: '', password: '', name: '', username: '', movieList: []}, action) => {
  if (action.type === 'SET_STATE') {
    const newState = cloneDeep(state);
    newState.email = action.payload.email;
    newState.name = action.payload.name;
    newState.username = action.payload.username;
    newState.password = action.payload.password;
    newState.movieList = action.payload.movieList

    return newState

  } else if (action.type === 'REGISTER') {
    handleRegister(action.payload)

  } else if (action.type === 'LOG_IN') {
    handleLogIn(action.payload, state)
  
  } else if (action.type === 'LOG_OUT') {
    handleLogOut(state)
  }

  return state
}

const storeReducer = combineReducers({
  user: userReducer
})

const store = createStore(storeReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
