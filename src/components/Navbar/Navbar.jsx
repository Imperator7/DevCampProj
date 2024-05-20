import RightNavbar from "./RightNavbar"
import LeftNavbar from "./LeftNavbar"

export default function Navbar(props) {
    const location = props.location
    
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', height: '5vh', alignItems: 'center', padding: '0 2vw', position: 'relative', top: '10px'}}>
            <LeftNavbar/>
            <RightNavbar location={location}/>
        </div>
    )
}