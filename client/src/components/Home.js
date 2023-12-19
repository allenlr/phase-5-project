import React from 'react'
import { useSelector } from 'react-redux';

function Home(){
    const currentUser = useSelector(state => state.user.currentUser);

    return(
        <div className="home">

            <div className="home-h">
                {currentUser === null ? `Welcome to Servyces!` : `Welcome to Servyces, ${currentUser.username}!`}
            </div>
            <p className="home-p">
                A Denver based app to find the people to help you get things done!
            </p>
        </div>
    )
}

export default Home;