import React, { useEffect, useState } from 'react'
import PostListContext from './contexts/postListContext'
import api from './utils/api.js'

export const App = () => {
  const [postList, setPostList] = useState(null)

  useEffect(() => {
    api.getPosts()
      .then((posts) => setPostList(posts))
      .catch(err => alert(err));

  }, []);

  return (
    <PostListContext.Provider value={{ postList, setPostList }}>
      <div>App</div>
    </PostListContext.Provider>
  )
}
