import React , {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

// Nav bar items and additional backend calls
const Navbar = (props) => {

    const navigate = useNavigate();

    const get_cookie = (name) => {
        return document.cookie.split(';').some(c => {
            return c.trim().startsWith(name + '=');
        });
    }

    const delete_cookie = ( name ) => {
        if( get_cookie( name ) ) {
          document.cookie = name + "=" +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
      }

    const logout = () => {
        const url = 'https://accounts.spotify.com/en/logout';
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');
        delete_cookie('access');
        delete_cookie('refresh');
        setTimeout(() => {
            props.updateUserInfo({})
            props.updateIsLoggedIn(false)
            navigate('/');
            spotifyLogoutWindow.close()
        }, 1000);
    }

    const loginPage = () => {
        navigate('/')
    }

    return (
        <>
            <nav id='navBar'>
                <ul className="navList">
                    {props.isLoggedIn ? <li className='links' id='logoutButton' onClick={logout}><a className='bye'>Logout</a></li> : <li className='links' id='logoutButton' onClick={loginPage}><a className='bye'>Login</a></li> }
                    {props.isLoggedIn ? <li className='links' id='create-playlist' onClick={() => navigate('/playlistform')}><a className='bye' id='create-playlist1'>Create a new Playlist</a></li> : <li></li>}
                    {props.isLoggedIn ? <li className='links' id='play-beats' onClick={() => navigate('/player')}><a className='bye'>Play some beats!</a></li>:<li></li>}
                </ul>
            </nav>
        </>
    )
}

export default Navbar