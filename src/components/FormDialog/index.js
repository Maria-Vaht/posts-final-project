import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import { Dialog, Button, TextField, DialogActions, DialogTitle, DialogContent } from '@mui/material'
import api from '../../utils/api'

export const FormDialog = () => {
    const { setPostList } = useContext(GlobalContext)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const {
            target: { title, text, image, tags },
        } = e;
        // console.log(tags.value.trim().split(/[,]\s*|\s+/g))
        const tagList = tags.value.trim().split(/[,]\s*|\s+/g)
        api.createPost(title.value, text.value, image.value, tagList)
            .then((newPost) => setPostList(prevState => [...prevState, newPost]))
            .catch(err => alert(err))
    };

    return (
        <div>
            <Button style={{ background: "green" }} onClick={handleClickOpen}>
                New Post
            </Button>
            <form onSubmit={handleSubmit}>
                <Dialog disablePortal={true} open={open} onClose={handleClose}>
                    <DialogTitle>Create new post</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="text"
                            label="Text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="image"
                            label="Image"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="tags"
                            label="Tags"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' onClick={handleClose}>Create</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}

