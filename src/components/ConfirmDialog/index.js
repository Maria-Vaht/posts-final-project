import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'

import { Dialog, Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
export const ConfirmDialog = () => {
  const { confirmDialogState: { isOpen, postId }, setConfirmDialogState, setPostList } = useContext(GlobalContext)

  // const params = useParams()
  const navigate = useNavigate()

  const handleClose = () => {
    setConfirmDialogState(() => {
      return {
        isOpen: false,
        postId: null,
      }
    })
  }

const deletePost = () => {
  const api = useApi()
  api.deletePostById(postId)
    .then(() => setPostList(prevState => prevState.filter((post) => post._id !== postId)))
    .catch(err => alert(err))
    .finally(() => {
      handleClose()
      navigate('/')
    })
}

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить пост?
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
