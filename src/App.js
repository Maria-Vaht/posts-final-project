import React, { useEffect, useState } from 'react'
import { PostList } from './components/PostList'
import PostListContext from './contexts/postListContext'
import api from './utils/api.js'
import './index.css'

export const App = () => {
  const [postList, setPostList] = useState(null)

  useEffect(() => {
    api.getPosts()
      .then((posts) => setPostList(posts))
      .catch(err => alert(err));

  }, []);

  return (
    <PostListContext.Provider value={{ postList, setPostList }}>
      <div className='appContainer'>
        <PostList />
      </div>
    </PostListContext.Provider>
  )
}
