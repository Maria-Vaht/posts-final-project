import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PostList } from './components/PostList'
import GlobalContext from './contexts/globalContext'
import { Pagination } from './components/Pagination'
import { Snackbar } from './components/Snackbar'
import { TabsPanel } from './components/TabsPanel'
import { ConfirmDialog } from './components/ConfirmDialog'
import { Header } from './components/Header'
import { Info } from './components/Info'
import Footer from './components/Footer'
import PostPage from './components/PostPage'
import { FormDialog } from './components/FormDialog'
import { ComboBox } from './components/ComboBox'
import { useApi } from './hooks/useApi'
import { useLocalStorage } from './hooks/useLocalStorage'
import { AuthModal } from './components/AuthModal'
import { Button, createTheme, ThemeProvider } from '@mui/material'
import './index.css'

export const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#9db25c',
      },
      secondary: {
        main: '#eadb5c',
      },
    },
  });

  const api = useApi()
  const { readLS } = useLocalStorage()
  const [postList, setPostList] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [favorites, setFavorites] = useState(readLS('favorites') || []);
  const [currentPage, setCurrentPage] = useState(1)
  const [comboBoxSelected, setComboBoxSelected] = useState('recent')
  const [isTabLiked, setIsTabLiked] = useState(false)
  const postsPerPage = 12
  const dayjs = require('dayjs')

  const [snackBarState, setSnackBarState] = useState({
    isOpen: false,
    msg: null,
  });

  const [formDialogState, setFormDialogState] = useState({
    isOpen: false,
    postId: null,
  })

  const [confirmDialogState, setConfirmDialogState] = useState({
    isOpen: false,
    postId: null,
  })
  const [modalState, setModalState] = useState({
    isOpen: false,
    msg: null,
  });

  const [authState, setAuthState] = useState({
    isOpen: false,
    msg: null,
  });

  const sortFunctions = {
    recent: (post1, post2) => dayjs(post2['created_at']).unix() - dayjs(post1['created_at']).unix(),
    old: (post1, post2) => dayjs(post1['created_at']).unix() - dayjs(post2['created_at']).unix(),
    likes: (post1, post2) => post2.likes.length - post1.likes.length,
    comments: (post1, post2) => post2.comments.length - post1.comments.length,
  }

  useEffect(() => {
    const token = readLS('token');
    if (!token) {
      setAuthState(() => {
        return {
          isOpen: true,
          msg: "Вы не авторизованы",
        }
      })
    }
  }, [])

  useEffect(() => {
    api.getPosts()
      .then((posts) => setPostList(posts.sort(sortFunctions[comboBoxSelected])))
      .catch(err => alert(err))
  }, [comboBoxSelected, currentUser]);

  useEffect(() => {
    api.getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch(err => alert(err));
  }, []);

  const postListLiked = postList?.filter((post) => favorites.includes(post._id))
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPostsAll = postList?.slice(indexOfFirstPost, indexOfLastPost)
  const currentPostsLiked = postListLiked?.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={{
        postList,
        setPostList,
        isTabLiked,
        setIsTabLiked,
        postListLiked,
        currentPostsAll,
        currentPostsLiked,
        postsPerPage,
        setCurrentPage,
        currentUser,
        setCurrentUser,
        favorites,
        setFavorites,
        snackBarState,
        setSnackBarState,
        confirmDialogState,
        setConfirmDialogState,
        formDialogState,
        setFormDialogState,
        comboBoxSelected,
        setComboBoxSelected,
        modalState,
        setModalState,
        authState,
        setAuthState,
        sortFunctions,
      }}>
        <div className='appContainer'>
          <Header>
            <Button className='buttonMUI' variant='contained' color='secondary' onClick={() => {
              setFormDialogState({
                isOpen: true,
                postId: null,
              })
            }}>
              New post
            </Button>
            <ComboBox />
            <Info />
          </Header>
          <Routes>
            <Route path="/"
              element={<>
                <TabsPanel />
                <PostList />
                <Pagination />
              </>
              }
            />
            <Route path="post/:postID" element={<PostPage />} />
          </Routes>
          <FormDialog />
          <ConfirmDialog />
          <Snackbar />
          <AuthModal />
          <Footer />
        </div>
      </GlobalContext.Provider>
    </ThemeProvider>
  )
}