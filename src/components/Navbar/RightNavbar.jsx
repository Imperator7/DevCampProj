import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

export default function RightNavbar(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = props.location

    const user = useSelector((state) => state.user)
    const handleLogOut = () => {
        localStorage.setItem('user', JSON.stringify({"name":"","username":"","email":"","password":"", "movieList":[]}));
        dispatch({
            type: "LOG_OUT"
        })
        navigate('/')
    }
    return (
        <div>

            {
                location === 'register'? 
                <button className="btn-signin-navbar" onClick={() => navigate('/login')}>
                    Sign in
                </button>:
                location === 'login'? 
                <button className="btn-signin-navbar" onClick={() => navigate('/register')}>
                    Sign up
                </button>:
                <div>
                    <b>Welcome</b> { user.name }    
                    <button className="btn-signin-navbar" onClick={() => handleLogOut()}>
                        Log out
                    </button>
                </div>
            }
            
        </div>
    )
}