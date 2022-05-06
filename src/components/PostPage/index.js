import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GlobalContext from '../../contexts/globalContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export default function PostPage() {

    const [postItem, setPostItem] = useState(null)
    const params = useParams()
    const { favorites, favoriteCounter, addFavorite, removeFavorite, currentPosts } = useContext(GlobalContext)
    
  
    useEffect(() => {
        api.getPosts(params.postID)
            .then((data) => setPostItem(data))
            .catch((err) => alert(err))
    }, [])

    
    return (
       
        <Card sx={{ maxWidth: 345 }} style = {{margin: "20px", padding: "10px"}}>
            <CardMedia
                component="img"
                alt="image"
                height="140"
                image={postItem?.image}
            />
            <CardContent>
            <Avatar alt="author" src={postItem?.author !== null && postItem?.author.avatar !== null ? postItem?.author.avatar : ''} />
            <Typography variant="body2" color="text.secondary">
                    {postItem?.author.name}
                </Typography>
                <Typography gutterBottom variant="h4" component="div" style={{paddingTop:"20px",}}>
                    {postItem?.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {postItem?.text}
                </Typography>
            </CardContent>
            <CardActions>
                {favorites.includes(postItem?._id) ? (
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
            </CardActions>
        </Card>
    );

}