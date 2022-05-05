import React, { useState, useEffect, useContext } from 'react'
import api from '../../utils/api'
import GlobalContext from '../../contexts/globalContext'
import style from './style.module.css'
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, CardHeader, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteIcon from '@mui/icons-material/Delete'

export const Post = ({ post }) => {
    console.log(post)
    const { setPostList, currentUser, favorites, setFavorites } = useContext(GlobalContext)
    const [favoriteCounter, setFavoriteCounter] = useState(post.likes.length)

    let dayjs = require('dayjs')
    let dateParsed = dayjs(post['created_at']).format('DD-MM-YYYY HH:mm:ss')

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
        writeLS('favorites', post._id)
        setFavorites((prevState) => [...prevState, post._id])
        setFavoriteCounter((prevState) => prevState + 1)
        api.addLike(post._id)
            .then(() => {
                alert('Лайк поставлен');
            })
            .catch(() => {
                alert('Не удалось поставить лайк');
            });
    }

    const removeFavorite = () => {
        removeLS('favorites', post._id)
        setFavorites((prevState) => prevState.filter((postId) => postId !== post._id))
        setFavoriteCounter((prevState) => prevState - 1)
        api.deleteLike(post._id)
            .then(() => {
                alert('Лайк убран');
            })
            .catch(() => {
                alert('Не удалось убрать лайк')
            })
    }

    const deletePost = () => {
        if (confirm('Вы действительно хотите удалить пост?')) {
            api.deletePostById(post._id)
                .then((deletedPost) => setPostList(prevState => prevState.filter((post) => post._id !== deletedPost._id)))
                .catch(err => alert(err))
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src={post.author.avatar}></Avatar>
                }
                title={post.author.name}
            />
            <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt="post"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {dateParsed}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.text}
                </Typography>
                <Typography>
                    <div className={style.tagListContainer}>
                        {post.tags.map((tag) => <div className={style.tag}>{tag}</div>)}
                    </div>
                </Typography>
            </CardContent>
            <CardActions>
                {favorites.includes(post._id) ? (
                    <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                        <FavoriteIcon />
                    </IconButton>
                ) : (
                    <IconButton aria-label='add to favorites' onClick={addFavorite}>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                )}
                <Typography variant="body2" color="text.secondary">
                    {favoriteCounter}
                </Typography>
                {currentUser?._id === post.author._id ? (
                    (<IconButton aria-label="delete" onClick={deletePost}>
                        <DeleteIcon />
                    </IconButton>)
                ) : (
                    null
                )}
            </CardActions>
        </Card>
    )
}
