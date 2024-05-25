import { useSelector } from "react-redux"

export default function Waitlist() {
    const user = useSelector((state) => state.user)

    return (
        <div>
            <div className="movie-card">
                <img src="DevCampProj\src\assets\posters\ANTMAN.jpg"/>
                <label>batman</label>
                <button>Add to WaitList</button>
            </div>
            
        </div>
    )
}