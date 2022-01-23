import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'


import FoodTypes from './components/foodtypes'
import Grid from './components/grid/'
import Login from './components/login'
import TopScores from './components/topscores'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [player_name, setPlayer_name] = useState('')
    const [updatedScore, setUpdatedScore] = useState(null)
    const [error, setError] = useState(null)
    
    const location = useLocation()

    const {pathname} = location
    const url = (pathname === '/register') ?  '/api/register' : '/api/login'
    

    function onVerifyPlayer () {
        if(token) {
            axios.get('/api/verifyplayer', {
            headers: {
                token
            }
        }).then(res => {
            setIsLoggedIn(true)
            setPlayer_name(res.data.player_name)
        }).catch(error => setError(error.response.data))
        }
        
    }

    function handleSubmit(e, data) {
            e.preventDefault()
            axios.post(url, data).then(res => {
                setIsLoggedIn(true)
                setPlayer_name(res.data.player_name)
                localStorage.setItem('token', res.data.token)
            }
          ).catch(err => setError(err.response.data))
    }

   
    function updateScore(points) {
        axios.put('/api/updatescore', {
            player_name,
            score: points
        }).then(res => {
            if(res.data) {
            setUpdatedScore(res.data.rows[0].score)
            setPlayer_name(res.data.rows[0].player_name)
            }
            
        }).catch(error => setError(error.response.data))
    }

    
    function handleLogout() {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }
    
    
    useEffect(() => {
        onVerifyPlayer()
    }, [])

   

  
    return (
        <div className='app'>
           <div className='dashboard'>
                <Login  isLoggedIn={isLoggedIn} 
                    player_name={player_name} 
                    handleSubmit={handleSubmit}
                    handleLogout={handleLogout}
                    errorMessage={error}
                    />
                <TopScores updatedScore={updatedScore} player_name={player_name}/>
            </div> 
           
            <Grid updateScore={updateScore} player_name={player_name}/>
            <FoodTypes />
        </div>
    )
}
