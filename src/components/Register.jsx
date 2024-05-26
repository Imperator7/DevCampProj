import { useDispatch, useSelector } from 'react-redux'
import '../register.css'
import Navbar from './Navbar/Navbar'
import React, {useState, useEffect}  from 'react'
import { useNavigate } from 'react-router'

export default function Register() {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.=]+\.[a-zA-Z]{2,}$/;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector((state) => state.user)
    const [localName, setLocalName] = useState('')
    const [localUsername, setLocalUsername] = useState('')
    const [localEmail, setLocalEmail] = useState(userState.email)
    const [localPassword, setLocalPassword] = useState('')
    const [localConfirmPassword, setLocalConfirmPassword] = useState('')
    const [clicked, setClicked] = useState(false)
    const [checkFormats, setCheckFormats] = useState({
        name: false,
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || { email: '', password: '', name: '', username: '', movieList: [] }
      }
      useEffect(() => {
        if (initialState.user.name !== '') {
          navigate('/home')
        }
      }, [])
    
    const onSubmit = (e) => {
        e.preventDefault()
        setClicked(true)
        if (checkFormats.name && checkFormats.username && checkFormats.email && checkFormats.password && checkFormats.confirmPassword) {
            dispatch({type: 'REGISTER', payload: {
                name: e.target.name.value,
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            }})
        } 
    }

    useEffect(() => {
        setCheckFormats((prev) => ({
            ...prev,
            name: localName.length > 3,
            username: localUsername.length > 3,
            email: emailRegex.test(localEmail),
            password: localPassword.length <= 20 && localPassword.length >= 8,
            confirmPassword: localConfirmPassword === localPassword && localConfirmPassword !== ''
        }))
    }, [localPassword, localConfirmPassword, localEmail, localName, localUsername])

    return (
        <div>
            <div style={{border: '0.5px solid gray', padding: '0 0 2.5vh', borderTop: 0, borderLeft: 0, borderRight: 0}}>
                <Navbar location="register"/>
            </div>
            <div style={{padding: '2vh'}}>
                <h1 style={{padding: '0 0 2vh 0'}}>Register</h1>
                <form style={{alignItems: 'center', display: 'grid', gap: '1.5vh'}} onSubmit={onSubmit}>
                    <div  style={{padding: '0 5px'}}>
                        <label>Name</label>
                        <br />
                        <input className='input-box-style' name='name' type="text" onChange={(e) => setLocalName(e.target.value)} value={localName}/>
                        {
                            clicked && !checkFormats.name && <label style={{color: 'red'}}>Please recheck your name</label>
                        }
                    </div>
                    <div  style={{padding: '0 5px'}}>
                        <label>Username</label>
                        <br />
                        <input className='input-box-style' name='username' type="text" onChange={(e) => setLocalUsername(e.target.value)} value={localUsername}/>
                        {
                            clicked && !checkFormats.username && <label style={{color: 'red'}}>Please recheck your username</label>
                        }
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Email address</label>
                        <br />
                        <input className='input-box-style' name='email' type="text" onChange={(e) => setLocalEmail(e.target.value)} value={localEmail}/>
                        {
                            clicked && !checkFormats.email && <label style={{color: 'red'}}>Please recheck your email</label>
                        }
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Password</label>
                        <br />
                        <input className='input-box-style' name='password' type="text" onChange={(e) => setLocalPassword(e.target.value)} value={localPassword}/>
                        {
                            clicked && !checkFormats.password && <label style={{color: 'red'}}>Please recheck your password</label>
                        }
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Confirm password</label>
                        <br />
                        <input className='input-box-style' type="text" onChange={(e) => setLocalConfirmPassword(e.target.value)} value={localConfirmPassword}/>
                        {
                            clicked && !checkFormats.confirmPassword && <label style={{color: 'red'}}>Please recheck your confirm password</label>
                        }
                    </div>
                    <button className='btn-signin' style={{width: '8vw', height: '4vh'}}>Submit</button>
                </form>
            </div>
        </div>
    )
}