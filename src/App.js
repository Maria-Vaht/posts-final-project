import React, { useEffect, useState } from 'react'
import { PostList } from './components/PostList'
import GlobalContext from './contexts/globalContext'
import api from './utils/api.js'
import './index.css'
import { Pagination } from './components/Pagination'
import { FormDialog } from './components/FormDialog'
import { Header } from './components/Header'
import Logo from './components/Logo'
import  {Info}  from './components/Info'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import  PostPage from './components/PostPage'


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
        <div className='app-container'>
      <Header>
        <Logo />
      <FormDialog />
      <Info />
      </Header>
    
      <div className='content_container'>
      <Routes>
        <Route path="/" 
        element={<div className='content__cards'>
        <PostList/>
        </div>
        }
        />
        <Route path="post/:postID" element={<PostPage/>} />
      </Routes>
       
        </div>
  
      <Pagination />
      </div>
      <Footer />
   
    </GlobalContext.Provider>
  )
}
