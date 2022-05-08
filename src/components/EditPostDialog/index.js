import React, { useState, useEffect, useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import { Dialog, Button, TextField, DialogActions, DialogTitle, DialogContent } from '@mui/material'
import api from '../../utils/api'
import { useNavigate, useParams } from 'react-router-dom';

export const EditPostDialog = () => {
    const { editPostDialogState, setEditPostDialogState, setPostList } = useContext(GlobalContext)

    const params = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        api.getPosts(params.PostId)
            .then(({ title, text, image, tags }) => {
                setTitle(title)
                setText(text)
                setImage(image)
                setTags(tags.join(', '))
            })
            .catch(err => alert(err));
    }, []);

    const handleClose = () => {
        setEditPostDialogState(() => {
            return {
                isOpen: false,
            };
        })
        navigate('/')
    }

    const handleSubmit = () => {
        api.editPost(params.PostId, title, text, image, tags)
            .then(() => handleClose())
            .catch(err => alert(err))
    };

    return (
        <div>
            <Dialog disablePortal={true} open={editPostDialogState.isOpen} onClose={handleClose}>
                <DialogTitle>Edit post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        // id="title"
                        label="Title"
                        fullWidth
                        variant="standard"
                        value={title || ''}
                        onChange={({ target }) => {
                            setTitle(target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        // id="text"
                        label="Text"
                        fullWidth
                        variant="standard"
                        value={text}
                        onChange={({ target }) => {
                            setText(target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        // id="image"
                        label="Image"
                        fullWidth
                        variant="standard"
                        value={image}
                        onChange={({ target }) => {
                            setImage(target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        // id="tags"
                        label="Tags"
                        fullWidth
                        variant="standard"
                        value={tags}
                        onChange={({ target }) => {
                            setTags(target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

