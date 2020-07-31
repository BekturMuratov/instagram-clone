import React from 'react'
import './styles/Post.css'
import Avatar from "@material-ui/core/Avatar"

function Post({username,caption,imageUrl,avatar}) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar 
            className="post__avatar"
            alt="Tupac Amaru Shakur"
            src={avatar}
            />
            <h3>{username}</h3>
            </div>
           
            <img 
            className="post__image" 
            src ={imageUrl}
            alt=""
            />

            <h4 
            className="post__text">
            <strong>{username}  </strong>{caption}</h4>
        </div>
    )
}

export default Post
