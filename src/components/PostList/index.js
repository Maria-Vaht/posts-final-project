import React, { useContext } from 'react'
import { Post } from '../Post'
import PostListContext from '../../contexts/postListContext'
import style from './style.module.css'

export const PostList = () => {
    const { postList } = useContext(PostListContext)

    return (
        <div className={style.postListContainer}>
            {postList?.map(post => (
                <Post key={post._id}
                    post={post}
                />))}
        </div>
    )
}
