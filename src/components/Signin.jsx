import { useState, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
 
export default function SignIn() {
    const [localEmail, setLocalEmail] = useState('')
    const [localPassword, setLocalPassword] = useState('')
    const [clicked, setClicked] = useState(false)
    const [checkFormats, setCheckFormats] = useState({
        email: false,
        password: false
    })

    const emailRegex = /^[\w\.-]+@[a-zA-A\d\.=]+\.[a-zA-Z]{2,}$/;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const storedUser = JSON.parse(localStorage.getItem('user'))

    const userEmail = useSelector((state) => state.user.email)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!clicked) {
            setClicked(true)
        }

        if (checkFormats.email && checkFormats.password) {
            // dispatch to login
            dispatch({
                type: 'LOG_IN',
                payload: {
                    email: localEmail,
                    password: localPassword
                }
            })
            }
        }
    
    useEffect(() => {
        setCheckFormats({
            email: emailRegex.test(localEmail),
            password: localPassword.length <= 20 && localPassword.length >= 8
        })
    }, [localEmail, localPassword])

    useEffect(() => {
        if (storedUser.email !== '') {
            navigate('/home') 
        } else {
            console.log('log out')
        }
    }, [userEmail])
    
    return (
        <div>
            <div style={{border: '1px solid black', padding: '0 0 2.5vh'}}>
                <Navbar location="login"/>
            </div>
            <div style={{padding: '2vh'}}>
                <h1 style={{padding: '0 0 2vh 0'}}>Sign in</h1>
                <form onSubmit={onSubmit} style={{alignItems: 'center', display: 'grid', gap: '1.5vh'}}>
                    <div style={{padding: '0 5px'}}>
                        <label>Email address</label>
                        <br />
                        <input className='input-box-style' type="text" onChange={(e) => setLocalEmail(e.target.value)} value={localEmail}/>
                        {
                            clicked && !checkFormats.email && <p style={{color: 'red'}}>Please enter a valid email</p>
                        }
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Password</label>
                        <br />
                        <input className='input-box-style' type="text" onChange={(e) => setLocalPassword(e.target.value)} value={localPassword}/>
                        {
                            clicked && !checkFormats.password && <p style={{color: 'red'}}>Password needs to have length between 8 to 20</p>
                        }
                    </div>
                    <button className='btn-signin' style={{width: '8vw', height: '4vh'}}>Submit</button>
                </form>
            </div>
        </div>
    )
}
