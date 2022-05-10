import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GlobalContext from '../../contexts/globalContext';
import { Grid, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useApi } from '../../hooks/useApi';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const AuthModal = () => {
    const { setCurrentUser, setFormDialogState} = useContext(GlobalContext)
    const api = useApi()
    const { authState, setAuthState } = useContext(GlobalContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleClose = () =>
    setAuthState(() => {
            return { isOpen: false, msg: null };
        });

        const handleEmailChange = ({ target }) => {
            setEmail(target.value);
        };
    
        const handlePasswordChange = ({ target }) => {
            setPassword(target.value);
        };
        
const signUp = () => {
   api.signUp({email, password}) 
   .then((createdUser) => {
       console.log(createdUser);
    return api.signIn({email, password});
})
.then((signedInUser) => {
    console.log(signedInUser);
    const {token, data} = signedInUser
    localStorage.setItem('token', JSON.stringify(token));
    setCurrentUser(data)
    setAuthState(() => {
        return{
            isOpen: false,
            msg: null
        }
    })
     setEmail('');
                setPassword('');
            })
            .catch((err) => {
              if(err.includes('409')) {
                setModalState(() => {
                  return {
                    isOpen: true,
                    msg: 'Пользователь уже существует.',
                  };
                });
              }else{
                setModalState(() => {
                  return {
                    isOpen: true,
                    msg: 'Поля заполнены неверно.',
                  };
                });
              }
            });
    };


const signIn = () => {
    api.signIn({ email, password })
    .then((signedUser) => {
    const { token, data } = signedUser;
    localStorage.setItem('token', JSON.stringify(token));
    setCurrentUser(data);
    setAuthState (() => {
        return {
            isOpen: false,
            msg: null,
        };
    })
    setEmail('');
              setPassword('');
})
    .catch((err) => {
        if(err.includes('401')) {
            setFormDialogState(() => {
            return {
              isOpen: true,
              msg: 'Неверный логин или пароль.',
            };
          });
        }else{
          setModalState(() => {
            return {
              isOpen: true,
              msg: 'Поля заполнены неверно.',
            };
          });
        }
      });
}
        

return (
            <Modal open={authState.isOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography id='modal-modal-title' variant='h6' component='h2'>
                                Введите ваши данные
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Email' variant='outlined' required value={email} onChange={handleEmailChange}  />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Password'
                                type='password'
                                variant='outlined'
                                required value={password}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={signUp} fullWidth variant='contained' color='primary' size='small' >
                                Регистрация
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={signIn}  fullWidth variant='contained' color='primary' size='small' >
                                Логин
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        );
    };