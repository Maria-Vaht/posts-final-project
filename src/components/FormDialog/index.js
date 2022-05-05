import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
        const { target } = e
        api.createPost(target.title.value, target.text.value)
            .then((newPost) => setPostList(prevState => [...prevState, newPost]))
            .catch(err => alert(err))
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
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
                        {/* <TextField
                            margin="dense"
                            id="tags"
                            label="Tags"
                            fullWidth
                            variant="standard"
                        /> */}
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

