import { Link } from "react-router-dom"
export default function LeftNavbar() {
    return (
        <Link style={{color: "red", letterSpacing:'1.5px', fontSize: '30px', textDecoration: 'none'}} to="/">
            TV series 
            {
                location == 'home' && <b>d</b>
            }
        </Link>
    )
}