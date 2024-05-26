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
    
    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || { _id: "", user: {email: '', password: '', name: '', username: '', movieList: []} }
      }
      useEffect(() => {
        if (initialState.user.name !== '') {
          navigate('/home')
        }
      }, [])

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

    // useEffect(() => {
    //     if (storedUser.email !== '') {
    //         navigate('/home') 
    //     } else {
    //         console.log('log out')
    //     }
    // }, [userEmail])
    
    return (
        <div>
            <div style={{border: '0.5px solid gray', padding: '0 0 2.5vh', borderTop: 0, borderLeft: 0, borderRight: 0}}>
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
