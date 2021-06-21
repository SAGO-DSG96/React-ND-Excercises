import React from 'react'
import { connect } from 'react-redux'
import { formatDate, formatTweet } from '../utils/helpers'

import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index'

import { handleToggleTweet } from '../actions/tweets'

import { Link, withRouter } from "react-router-dom";

function Tweet(props){

    const { tweet } = props

    if( tweet === null ){
        return <p>This tweet does not exist</p>
    }

    const { name, avatar, timestamp, text, hasLiked, likes, replies, id, parent } = tweet
    
    const toParent = (e, id) => {
        e.preventDefault()
        props.history.push(`tweet/${id}`)
    }

    const handleLike = (e) =>{
        e.preventDefault()
        
        const { dispatch, tweet, authedUser } = props

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    }

    return(
        <Link to={`tweet/${id}`} className='tweet'>
            <img 
                src={avatar} 
                alt={`Profile of ${name}`}
                className='avatar'/>
            <div className='tweet-info'>
                <div>
                    <span>{ name }</span>
                    <div>{ formatDate(timestamp) }</div>
                    {parent && (
                            <button className='replying-to' onClick={(e) => toParent(e, parent.id) }>
                                Replying to @{parent.author}
                            </button>
                    )}
                    <p>{ text }</p>
                </div>
                <div className='tweet-icons'>
                    <TiArrowBackOutline className='tweet-icon'/>
                    <span>{ replies !== 0 && replies }</span>
                    <button className='heart-button' onClick={ handleLike }>
                        {
                            hasLiked === true ? 
                            <TiHeartFullOutline color='#e0245e' className='tweet-icon'/> :
                            <TiHeartOutline className='tweet-icon'/>
                        }
                    </button>
                    <span>{ likes !== 0 && likes }</span>
                </div>
            </div>
        </Link>
    )
}

function mapStateToProps({authedUser, users, tweets}, {id}){
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null
    return{
        authedUser,
        tweet: tweet ?
         formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
         : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))