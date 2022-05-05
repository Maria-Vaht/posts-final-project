import React, { useContext } from 'react'
import usePagination from '@mui/material/usePagination'
import GlobalContext from '../../contexts/globalContext'
import { styled, Button } from '@mui/material'

const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 10,
    display: 'flex',
});

export const Pagination = () => {
    const { postList, postsPerPage, setCurrentPage } = useContext(GlobalContext)

    const { items } = usePagination({
        count: Math.ceil(postList?.length / postsPerPage),
        hidePrevButton: true,
        hideNextButton: true,
    });

    const handleClick = (event) => {
        const {
            target: { textContent: pageNumber },
        } = event
        setCurrentPage(pageNumber)
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <nav>
                <List>
                    {items.map(({ page, type, selected, ...item }, index) => {
                        let children = null;
                        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                            children = '…';
                        } else if (type === 'page') {
                            children = (
                                <Button
                                    // className={style.paginationButton}
                                    size="small"
                                    type="button"
                                    style={{
                                        fontWeight: selected ? 'bold' : undefined,
                                    }}
                                    {...item}
                                >
                                    {page}
                                </Button>
                            );
                        } else {
                            children = (
                                <Button
                                    // className={style.paginationButton}
                                    size="small"
                                    type="button" {...item}>
                                    {type}
                                </Button>
                            );
                        }

                        return <li key={index} onClick={handleClick}>{children}</li>;
                    })}
                </List>
            </nav>
        </div>
    );
}