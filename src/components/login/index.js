import React, {useState, useEffect} from 'react'
import {Routes, Route, useLocation} from 'react-router'
import {Link} from 'react-router-dom'


import Error from '../error'

export default function Login({isLoggedIn, 
                               player_name, 
                               handleSubmit, 
                               errorMessage, 
                               handleLogout
                            }) 
                        {

    const [name, setName] = useState('')
    
    const location = useLocation()

    const {pathname} = location
    
    const url = (pathname === '/register') ?  '/api/register' : '/api/login'
    
    const data = {
        player_name: name
    }

    function handleChange(e) {
        setName(e.target.value.trim())
    }

    if(isLoggedIn) {
        return (
          <div style={{textAlign: 'center'}}>
              <h2 className='player-name'>{player_name}</h2>
               <button className='logout-button' onClick={handleLogout}>Logout</button> 
          </div>  
            
            
        )
    }
    

    return (
        <div>
            <nav className='navigation'>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Log in</Link>
            </nav>
            {errorMessage && <Error errorMessage={errorMessage} />}
            <Routes>
            <Route path = '/register' element={<form onSubmit={(e) => handleSubmit(e, data)} 
                className='login-form'>
                <label htmlFor='register'>Register</label>
                <input
                    placeholder='type your name 5 symbols' 
                    name='register' 
                    type='text'
                    value={name} 
                    onChange={handleChange}
                />
                <button type='submit'>Send</button>
            </form>}>
            </Route>
            <Route path ='/login' element={<form onSubmit={(e) => handleSubmit(e, data)} 
            className='login-form'>
                <label htmlFor='login'>Login</label>
                <input
                placeholder='type your name' 
                    value={name}
                    name='login' 
                    type='text' 
                    onChange={handleChange}
                />
                <button type='submit'>Send</button>
            </form>}>
            </Route>
        </Routes>
    </div>
        
           
        
    )
}
