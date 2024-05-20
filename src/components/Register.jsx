import { useDispatch, useSelector } from 'react-redux'
import '../register.css'
import Navbar from './Navbar/Navbar'
import React, {useState, useEffect}  from 'react'
import { useNavigate } from 'react-router'

export default function Register() {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.=]+\.[a-zA-Z]{2,}$/;
    const dispatch = useDispatch()

    const email = useSelector((state) => state.registerUser.email)
    const [localName, setLocalName] = useState('')
    const [localUsername, setLocalUsername] = useState('')
    const [localEmail, setLocalEmail] = useState(email)
    const [localPassword, setLocalPassword] = useState('')
    const [localConfirmPassword, setLocalConfirmPassword] = useState('')
    const [checkFormats, setCheckFormats] = useState({
        name: false,
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch({type: 'REGISTER', payload: {
            name: e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }})
        

    }

    useEffect(() => {
        if (localName) {
            setCheckFormats((prev) => {
                prev.name = true
                return prev
            })
        } else {
            setCheckFormats((prev) => {
                prev.name = false
                return prev
            })
        }
    }, [localName])

    useEffect(() => {
        if (localUsername) {
            setCheckFormats((prev) => {
                prev.username = true
                return prev
            })
        } else {
            setCheckFormats((prev) => {
                prev.username = false
                return prev
            })
        }
    }, [localUsername])

    useEffect(() => {

    }, [localEmail])

    return (
        <div>
            <div style={{border: '1px solid black', padding: '0 0 2.5vh'}}>
                <Navbar location="register"/>
            </div>
            <div style={{padding: '2vh'}}>
                <h1 style={{padding: '0 0 2vh 0'}}>Register</h1>
                <form style={{alignItems: 'center', display: 'grid', gap: '1.5vh'}} onSubmit={onSubmit}>
                    <div  style={{padding: '0 5px'}}>
                        <label>Name</label>
                        <br />
                        <input className='input-box-style' name='name' type="text" onChange={(e) => setLocalName(e.target.value)} value={localName}/>
                    </div>
                    <div  style={{padding: '0 5px'}}>
                        <label>Username</label>
                        <br />
                        <input className='input-box-style' name='username' type="text" onChange={(e) => setLocalUsername(e.target.value)} value={localUsername}/>
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Email address</label>
                        <br />
                        <input className='input-box-style' name='email' type="text" onChange={(e) => setLocalEmail(e.target.value)} value={localEmail}/>
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Password</label>
                        <br />
                        <input className='input-box-style' name='password' type="text" onChange={(e) => setLocalPassword(e.target.value)} value={localPassword}/>
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Confirm password</label>
                        <br />
                        <input className='input-box-style' type="text" onChange={(e) => setLocalConfirmPassword(e.target.value)} value={localConfirmPassword}/>
                    </div>
                    <button className='btn-signin' style={{width: '8vw', height: '4vh'}}>Submit</button>
                </form>
            </div>
        </div>
    )
}