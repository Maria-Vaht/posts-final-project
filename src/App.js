import React, { useEffect, useState } from 'react'
import { PostList } from './components/PostList'
import GlobalContext from './contexts/globalContext'
import api from './utils/api.js'
import './index.css'
import { Pagination } from './components/Pagination'
import { FormDialog } from './components/FormDialog'

export const App = () => {
  const [postList, setPostList] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12

  useEffect(() => {
    api.getPosts()
      .then((posts) => setPostList(posts))
      .catch(err => alert(err));

  }, []);

  useEffect(() => {
    api.getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch(err => alert(err));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = postList?.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <GlobalContext.Provider value={{
      postList,
      setPostList,
      currentPosts,
      postsPerPage,
      setCurrentPage,
      currentUser,
      favorites,
      setFavorites,
    }}>
      <div className='appContainer'>
        <FormDialog />
        <PostList />
        <Pagination />
      </div>
    </GlobalContext.Provider>
  )
}