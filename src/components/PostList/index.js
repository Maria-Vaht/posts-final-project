import React from 'react'
import { Post } from '../Post'
import style from './style.module.css'

export const PostList = ({ postList }) => {
    return (
        <div className={style.postListContainer}>
            {postList?.map(post => (
                <Post className={style.post} key={post._id}
                    post={post}
                />))}
        </div>
    )
}
