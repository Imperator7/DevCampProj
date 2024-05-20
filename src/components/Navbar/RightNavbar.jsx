import { useNavigate } from "react-router"

export default function RightNavbar(props) {
    const navigate = useNavigate()
    const location = props.location
    return (
        <div>
            {
                location === 'register'? 
                <button className="btn-signin" onClick={() => navigate('/login')}>
                    Sign in
                </button>:
                <button className="btn-signin" onClick={() => navigate('/register')}>
                    Sign up
                </button>
            }
            
        </div>
    )
}