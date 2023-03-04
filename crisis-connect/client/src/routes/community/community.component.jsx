import { Fragment } from "react";
import {Outlet, Link, useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CommunityNavBar from "./community-nav";
import CreateIcon from '@mui/icons-material/Create';



const Community = () => {

    return (
        <Fragment>
            <section className="community-page">
            <header className="community-page-header">
                <div></div>
                <div className="community-intro">
                    <p className="community-intro__subheading">Our Community Hub</p>
                    <h1 className="community-intro__heading">join the conversation, make a difference</h1>
                </div>
                <div className="community-btn__wrapper">
                <Link to="/create" className='profile community-btn'>Create a Post! <CreateIcon /> </Link>
                </div>
            </header>

   
   


       

      

<Box
        width="100%"
        display="grid"
        grid-template-columns="2fr 6fr 2fr"
        gap="0.5rem"
        justifyContent="space-between"
        >
                     {/* sidenav */}
            <Box flexBasis={"26%"}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', backgroundColor:'white' }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Search" variant="standard" />
            </Box>
          
            <CommunityNavBar />


            
            </Box>



  {/* posts */}
            <Box flexBasis={"42%"} className="posts">
                {/* <PostsWidget /> */}


            </Box>

            {/* stats */}
            <Box flexBasis={"26%"} className="stats">


            </Box>

            </Box>

            </section>
          
        </Fragment>
    )

}

export default Community;