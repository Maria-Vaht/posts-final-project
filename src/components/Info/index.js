
import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import Avatar from '@mui/material/Avatar';
import './index.css';

export const Info = () => {
  const {currentUser} = useContext(GlobalContext);
  return (
    <div className='about'>
       { <Avatar src="currentUser?.avatar" /> }
        {currentUser?.name}
    </div>
  )
}