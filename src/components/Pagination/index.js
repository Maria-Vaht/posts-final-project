import React, { useContext } from 'react'
import usePagination from '@mui/material/usePagination'
import GlobalContext from '../../contexts/globalContext'
import { styled, Button, Typography } from '@mui/material'
import style from './style.module.css'

export const Pagination = () => {
    const { isTabLiked, postList, postListLiked, postsPerPage, setCurrentPage } = useContext(GlobalContext)
    const list = isTabLiked ? postListLiked : postList

    const { items } = usePagination({
        count: Math.ceil(list?.length / postsPerPage),
        hidePrevButton: true,
        hideNextButton: true,
    });

    const handleClick = (event) => {
        const {
            target: { textContent: pageNumber },
        } = event
        setCurrentPage(pageNumber)
    };

    const List = styled('ul')({
        listStyle: 'none',
        padding: 0,
        margin: 10,
        display: 'flex',
    });

    return (
        <div className={style.paginationContainer}>
            <nav>
                <List>
                    {items.map(({ page, type, selected, ...item }, index) => {
                        let children = null;
                        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                            children = (
                                <Typography variant="h5" color="black" >
                                    ...
                                </Typography>
                            )
                        } else if (type === 'page') {
                            children = (
                                <button
                                    style={{
                                        fontWeight: selected ? 'bold' : 'undefined',
                                    }}
                                    {...item}
                                >
                                    {page}
                                </button>
                            );
                        } else {
                            children = (
                                <button
                                    {...item}>
                                    {type}
                                </button>
                            );
                        }

                        return <li key={index} onClick={handleClick}>{children}</li>;
                    })}
                </List>
            </nav>
        </div>
    );
}