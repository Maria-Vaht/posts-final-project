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
        <BrowserRouter>
          <Routes>
            {/* <Route path='post/create' element={<CreatePostDialog />} /> */}
            <Route path='post/:PostId/edit' element={<EditPostDialog />} />
          </Routes>
          <button onClick={() => {
            createPostDialogState({
              isOpen: true,
            })
          }}>
            New post
          </button>
          <CreatePostDialog />
          <Snackbar />
          <ConfirmDialog />
          <PostList />
          <Pagination />
        </BrowserRouter>
      </div>
    </GlobalContext.Provider>
  )
}
