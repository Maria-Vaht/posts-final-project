import React, { useState, useEffect, useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import { Dialog, Button, TextField, DialogActions, DialogTitle, DialogContent } from '@mui/material'
import api from '../../utils/api'

export const EditPostDialog = () => {
    const { editPostDialogState, setEditPostDialogState, setPostList } = useContext(GlobalContext)
    const [open, setOpen] = useState(true);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        api.getPosts('626049750cdd7d3fd52f85d9')
            .then((post) => {
                setTitle(post?.title)
            })
            .catch(err => alert(err));
    }, []);

    const handleClose = () =>
        setEditPostDialogState(() => {
            return {
                isOpen: false,
            };
        });

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleSubmit = () => {
        const tagList = tags.trim().split(/[,]\s*|\s+/g)
        api.createPost(title, text, image, tagList)
            .then((newPost) => setPostList(prevState => [newPost, ...prevState]))
            .catch(err => alert(err))
            .finally(() => handleClose())
    };

    return (
        <div>
            <Dialog disablePortal={true} open={editPostDialogState.isOpen} onClose={handleClose}>
                <DialogTitle>Create new post</DialogTitle>
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
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

