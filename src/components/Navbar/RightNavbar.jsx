import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export default function RightNavbar(props) {
    const navigate = useNavigate()
    const location = props.location

    const user = useSelector((state) => state.user)
    console.log(user)
    const handleLogOut = () => {
        localStorage.setItem('user', JSON.stringify({"name":"","username":"","email":"","password":""}));
        navigate('/')
    }
    return (
        <div>

            {
                location === 'register'? 
                <button className="btn-signin" onClick={() => navigate('/login')}>
                    Sign in
                </button>:
                location === 'login'? 
                <button className="btn-signin" onClick={() => navigate('/register')}>
                    Sign up
                </button>:
                <div>
                    <b>Welcome</b> { user.username }    
                    <button className="btn-signin" onClick={() => handleLogOut()}>
                        Log out
                    </button>
                </div>
            }
            
        </div>
    )
}