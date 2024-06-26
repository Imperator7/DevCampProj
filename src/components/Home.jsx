
import { useDispatch, useSelector } from "react-redux";
import Movielist from "./Movielist";
import Navbar from "./Navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
export default function Home() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser.email === '') {
            navigate('/')
        } else {
            dispatch({
                type: 'SET_STATE',
                payload: {
                    name: storedUser.name,
                    username: storedUser.username,
                    email: storedUser.email,
                    password: storedUser.password,
                    movieList: storedUser.movieList
                }
            })
        }
    }, [])
    return (
        <div>
            <div>
                <div style={{border: '1px solid black', padding: '0 0 2.5vh', margin: '0 0 10px 0'}}>
                    <Navbar location="home"/>
                </div>
                <Movielist />
            </div>
        </div>
    )
}