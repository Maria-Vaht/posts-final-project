import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { PostList } from '../PostList';
import style from './style.module.css'
import GlobalContext from '../../contexts/globalContext'

export const TabsPanel = () => {
    const { currentPostsAll, currentPostsLiked, setIsTabLiked } = useContext(GlobalContext)

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
                    <Tab onClick={() => setIsTabLiked(false)} label="All posts" />
                    <Tab onClick={() => setIsTabLiked(true)} label="You liked" />
                </Tabs>
            </div >
            <TabPanel value={value} index={0}>
                <PostList postList={currentPostsAll} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PostList postList={currentPostsLiked} />
            </TabPanel>
        </>
    );
}