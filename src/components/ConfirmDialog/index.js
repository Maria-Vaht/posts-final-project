import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import api from '../../utils/api'
import { Dialog, Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'

export const ConfirmDialog = () => {
  const { confirmDialogState: { isOpen, currentPostId }, setConfirmDialogState, setPostList } = useContext(GlobalContext)

  const handleClose = () =>
    setConfirmDialogState(() => {
      return {
        isOpen: false,
      };
    });

  const deletePost = () => {
    api.deletePostById(currentPostId)
      .then((deletedPost) => setPostList(prevState => prevState.filter((post) => currentPostId !== deletedPost._id)))
      .catch(err => alert(err))
      .finally(() => handleClose())
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить пост? :(
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <Button onClick={deletePost} >
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
