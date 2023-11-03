import React from 'react'
import { useSelector } from 'react-redux';

function Home(){
    const currentUser = useSelector(state => state.user.currentUser);

    return(
        <div className="home">
            {currentUser === null ? `Welcome to Servyces!` : `Welcome to Servyces, ${currentUser.username}!`}
        </div>
    )
}

export default Home;