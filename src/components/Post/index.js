import React, { useState, useEffect, useContext } from 'react'
import api from '../../utils/api'
import GlobalContext from '../../contexts/globalContext'
import style from './style.module.css'
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, CardHeader, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'

export const Post = ({ post }) => {
    const { _id: postId,
        title,
        image,
        text,
        tags,
        likes,
        author: { avatar,
            _id: authorId,
            name,
            about, },
    } = post

    const { setPostList, currentUser, favorites, setFavorites, setSnackBarState, setConfirmDialogState, setEditPostDialogState} = useContext(GlobalContext)
    const [favoriteCounter, setFavoriteCounter] = useState(likes.length)

    const dayjs = require('dayjs')
    const dateParsedCreatedAt = dayjs(post['created_at']).format('DD-MM-YYYY HH:mm:ss')

    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || []
        storage.push(value)
        localStorage.setItem(key, JSON.stringify(storage))
    }

    const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key))
        const filteredStorage = storage.filter((item) => item !== value)
        localStorage.setItem(key, JSON.stringify(filteredStorage))
    }

    const addFavorite = () => {
        writeLS('favorites', postId)
        setFavorites((prevState) => [...prevState, postId])
        setFavoriteCounter((prevState) => prevState + 1)
       
 api.addLike(postId)
            .then(() => {
                setSnackBarState({
                    isOpen: true, msg: 'Лайк поставлен :)'
                })
            })
            .catch(() => {
                setSnackBarState({
                    isOpen: true, msg: 'Не удалось поставить лайк :('
                })
            });
    }

    const removeFavorite = () => {
        removeLS('favorites', postId)
        setFavorites((prevState) => prevState.filter((postId) => postId !== postId))
        setFavoriteCounter((prevState) => prevState - 1)
        
        api.deleteLike(postId)
            .then(() => {
                setSnackBarState({
                    isOpen: true, msg: 'Лайк убран :)'
                })
                    .catch(() => {
                        setSnackBarState({
                            isOpen: true, msg: 'Не удалось убрать лайк :('
                        })
                    })
            })
    }

    return (
        <div className={style.post}>
            <Card sx={{ maxWidth: 345 }}>
                <div>
                    <CardHeader
                        avatar={
                            <Avatar src={avatar}></Avatar>
                        }
                        title={name}
                        subheader={about}
                    />
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt="post"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {dateParsedCreatedAt}
                        </Typography>
                        <div className={style.title}>
                            <Typography gutterBottom variant="h5" component="div">
                                <Link to={`post/${postId}`}> {title} </Link>
                            </Typography>
                        </div>
                        <div className={style.text}>
                            <Typography variant="body2" color="text.secondary">
                                {text}
                            </Typography>
                        </div>
                        <div className={style.tagListContainer}>
                            {tags.map((tag, i) => <div key={i} className={style.tag}>{tag}</div>)}
                        </div>
                    </CardContent>
                    <CardActions>
                        {favorites.includes(postId) ? (
                            <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                                <FavoriteIcon color='warning' />
                            </IconButton>
                        ) : (
                            <IconButton aria-label='add to favorites' onClick={addFavorite}>
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                        )}
                        <Typography variant="body2" color="text.secondary">
                            {favoriteCounter}
                        </Typography>
                        <Link to={'post/${postId}/edit'} onClick={() => {
                            setEditPostDialogState({
                                isOpen: true,
                            })
                        }}>
                            {currentUser?._id === authorId ? (
                                (<IconButton>
                                    <EditIcon />
                                </IconButton>)
                            ) : (
                                null
                            )}
                        </Link>
                        {currentUser?._id === authorId ? (
                            (<IconButton onClick={() => {
                                setConfirmDialogState({
                                    isOpen: true,
                                    currentPostId: postId
                                })
                            }}>
                                <DeleteOutlinedIcon />
                            </IconButton>)
                        ) : (
                            null
                        )}
                    </CardActions>
                </div>
            </Card>
        </div >
    )
}
