import React, { useState } from 'react'
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";

import { Redirect } from "react-router-dom";

function NewTweet(props){

    const [text, setText] = useState('');
    const [home, setHome] = useState(false);


    const handleChangedText = (e) => {
        const text =  e.target.value
        setText(text)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, id } = props
        dispatch(handleAddTweet(text, id))
        setText('')
        if (id) {
            setHome(false)
        }
        else{setHome(true)}

    }

    const tweetLeft = 280 - text.length

    if(home === true){
        return <Redirect to='/' />
    }
    return(
        <div>
            <h4 className='center'>Compose new Tweet</h4>
            <form className='new-tweet' onSubmit={handleSubmit}>
                <textarea 
                    placeholder="What's happening"
                    onChange={handleChangedText}
                    className='textarea'
                    maxLength={280}
                />
            {
                tweetLeft <= 100 && (
                    <div className='tweet-length'>
                        {tweetLeft}
                    </div>
                )
            }
            <button className='btn' type='submit' disabled={text === ''}>
                Submit
            </button>
            </form>
        </div>
    )
}

export default connect()(NewTweet)