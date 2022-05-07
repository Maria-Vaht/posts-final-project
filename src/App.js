import React, { useEffect, useState } from 'react'
import { PostList } from './components/PostList'
import GlobalContext from './contexts/globalContext'
import api from './utils/api.js'
import './index.css'
import { Pagination } from './components/Pagination'
import { CreatePostDialog } from './components/CreatePostDialog'
import { EditPostDialog } from './components/EditPostDialog'
import { Snackbar } from './components/Snackbar'
import { ConfirmDialog } from './components/ConfirmDialog'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import Logo from './components/Logo'
import { Info } from './components/Info'
import Footer from './components/Footer'
import PostPage from './components/PostPage'
import { Button } from '@mui/material'


export const App = () => {
  const [postList, setPostList] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12

  const [snackBarState, setSnackBarState] = useState({
    isOpen: false,
    msg: null,
  });

  const [createPostDialogState, setCreatePostDialogState] = useState({
    isOpen: false,
  })

  const [editPostDialogState, setEditPostDialogState] = useState({
    isOpen: false,
  })


  const [confirmDialogState, setConfirmDialogState] = useState({
    isOpen: false,
    currentPostId: null
  })

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
      snackBarState,
      setSnackBarState,
      confirmDialogState,
      setConfirmDialogState,
      createPostDialogState,
      setCreatePostDialogState,
      editPostDialogState,
      setEditPostDialogState,

    }}>
      <div className='appContainer'>
        <Header>
          <Logo />
          <Button onClick={() => {
            createPostDialogState({
              isOpen: true,
            })
          }}>
            New post
          </Button>
          <Info />
        </Header>
        <Routes>
          <Route path="/"
            element={<div className='content__cards'>
              <PostList />
              <Pagination />
            </div>
            }
          />
          <Route path="post/:postID" element={<PostPage />} />
          <Route path='post/:PostId/edit' element={<EditPostDialog />} />
        </Routes>
        <CreatePostDialog />
        <Snackbar />
        <ConfirmDialog />
        <Footer />
      </div>
    </GlobalContext.Provider>
  )
}
