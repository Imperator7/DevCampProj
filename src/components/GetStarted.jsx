import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
export default function GetStarted() {

    const [localEmail, setLocalEmail] = useState('')
    const [clicked, setClicked] = useState(false)
    const [emailCheck, setEmailCheck] = useState()
    const emailRegex = /^[\w\.-]+@[a-zA-A\d\.=]+\.[a-zA-Z]{2,}$/;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClick = (e) => {
        if (!clicked) {
            setClicked(true)
        }

        setEmailCheck(emailRegex.test(localEmail))

        if (localEmail) {
            if (emailRegex.test(localEmail)) {
                /// go to register page 1
                dispatch({type: 'SET_STATE', payload: {
                    email: localEmail
                }})
                navigate('/register')
            }
        }
    }


    return (
        <div style={{color: 'white',textAlign: 'center', position: 'relative', top:'25vh', lineHeight: '5vh'}}>
            <h1>Unlimited movies, TV shows, and more</h1>
            <p>Watch anywhere. Cancel anytime.</p>
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
            <div>
                <div style={{position: 'absolute',textAlign: 'left', left: '50%', transform: 'translate(-50%,0%)'}}>
                    <div>
                        <input type="text" onChange={(e) => setLocalEmail(e.target.value)} value={localEmail} placeholder="Enter your email here" style={{borderRadius: '5px', height: '5vh', width: '37vw'}}/>
                        <button onClick={onClick} className="btn-signin">Get Started {">"}</button>
                    </div>
                    <b style={{color: 'red'}}>
                    {
                        !emailCheck && clicked ? "Please enter a valid email address." : ""
                    }
                    </b>
                </div>
            </div>
        </div>
    )
}