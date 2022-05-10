import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PostList } from '../PostList';
import { Pagination } from '../Pagination';
import style from './style.module.css'
import GlobalContext from '../../contexts/globalContext'

export const TabsPanel = () => {
    const { postList, postListLiked, currentPostsAll, currentPostsLiked } = useContext(GlobalContext)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    return (
        <>
            <div className={style.tabsPanel}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="All posts" />
                    <Tab label="You liked" />
                </Tabs>
            </div >
            <TabPanel value={value} index={0}>
                <PostList postList={currentPostsAll} />
                <Pagination postList={postList} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PostList postList={currentPostsLiked} />
                <Pagination postList={postListLiked} />
            </TabPanel>
        </>
    );
}