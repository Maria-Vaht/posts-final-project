import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import GlobalContext from '../../contexts/globalContext'
import style from './style.module.css'
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, CardHeader, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteIcon from '@mui/icons-material/Delete'

export const Post = ({ post }) => {
    const { _id: postId,
        title,
        image,
        text,
        tags,
        likes,
        author: { avatar,
            name,
            _id: authorId },
    } = post

    const { setPostList, currentUser, favorites, setFavorites } = useContext(GlobalContext)
    const [favoriteCounter, setFavoriteCounter] = useState(likes.length)



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
        writeLS('favorites', postId)
        setFavorites((prevState) => [...prevState, postId])
        setFavoriteCounter((prevState) => prevState + 1)
        api.addLike(postId)
            .then(() => {
                alert('Лайк поставлен');
            })
            .catch(() => {
                alert('Не удалось поставить лайк');
            });
    }

    const removeFavorite = () => {
        removeLS('favorites', postId)
        setFavorites((prevState) => prevState.filter((postId) => postId !== postId))
        setFavoriteCounter((prevState) => prevState - 1)
        api.deleteLike(postId)
            .then(() => {
                alert('Лайк убран');
            })
            .catch(() => {
                alert('Не удалось убрать лайк')
            })
    }

    const deletePost = () => {
        if (confirm('Вы действительно хотите удалить пост?')) {
            api.deletePostById(postId)
                .then((deletedPost) => setPostList(prevState => prevState.filter((post) => postId !== deletedPost._id)))
                .catch(err => alert(err))
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src={avatar}></Avatar>
                }
                title={name}
            />
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt="post"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {dateParsed}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                <Link to={`post/${postId}`}> {title} </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
                <div className={style.tagListContainer}>
                    {tags.map((tag, i) => <div key={i} className={style.tag}>{tag}</div>)}
                </div>
            </CardContent>
            <CardActions>
                {favorites.includes(postId) ? (
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
                {currentUser?._id === authorId ? (  //нет уверенности, что работает
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
