import { useState, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import { useDispatch } from 'react-redux'
 
export default function SignIn() {
    const [localEmail, setLocalEmail] = useState('')
    const [localPassword, setLocalPassword] = useState('')
    const [clicked, setClicked] = useState(false)
    const [checkedEmail, setCheckedEmail] = useState(false)
    const [checkedPassword, setCheckedPassword] = useState(false)

    const emailRegex = /^[\w\.-]+@[a-zA-A\d\.=]+\.[a-zA-Z]{2,}$/;
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        if (!clicked) {
            setClicked(true)
        }

        if (checkedEmail && checkedPassword) {
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
        if (emailRegex.test(localEmail)){
            setCheckedEmail(true)
        } else {
            setCheckedEmail(false)
        }     
    }, [localEmail])

    useEffect(() => {
        if (localPassword.length <= 20 && localPassword.length >= 8) {
            setCheckedPassword(true)
        }  else {
            setCheckedPassword(false)
        }
    }, [localPassword])

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
                            clicked && !checkedEmail && <p style={{color: 'red'}}>Please enter a valid email</p>
                        }
                    </div>
                    <div style={{padding: '0 5px'}}>
                        <label>Password</label>
                        <br />
                        <input className='input-box-style' type="text" onChange={(e) => setLocalPassword(e.target.value)} value={localPassword}/>
                        {
                            clicked && !checkedPassword && <p style={{color: 'red'}}>Password needs to have length between 8 to 20</p>
                        }
                    </div>
                    <button className='btn-signin' style={{width: '8vw', height: '4vh'}}>Submit</button>
                </form>
            </div>
        </div>
    )
}
