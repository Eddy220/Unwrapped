import React from 'react'
import './SplashPage.css'
import document from '../../../src/images/z-document.png'
import giftbox from '../../../src/images/z-gift-box.png'
import gift from '../../../src/images/z-gift.png'

const SplashPage = () => {
    return (
        <div className='SplashPageContainer'>
            <div className='SplashOuter'>
                <div className='SplashPageImages'>
                    <img className='SplashPageImage' src={document}></img>
                </div>
                <div className='SplashPageText'>
                    <h2> Active wishlists made by our friends, family, colleages, etc. </h2>
                </div>
            </div>
            <div className='SplashOuter'>
                <div className='SplashPageImages'>
                    <img className='SplashPageImage' src={giftbox}></img>
                </div>
                <div className='SplashPageText'>
                    <h2> Gift the perfect present - no gift receipt needed! </h2>
                </div>
            </div>
            <div className='SplashOuter'>
                <div className='SplashPageImages'>
                    <img className='SplashPageImage' src={gift}></img>
                </div>
                <div className='SplashPageText'>
                    <h2> An app to stop guessing, and to start giving! </h2>
                </div>
            </div>
        </div>
    )
}

export default SplashPage
