import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "scenes/widgets/UserWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import CommunityNavbar from "scenes/communityNavbar";
import Chip from '@mui/material/Chip';
import PostsWidget from "scenes/widgets/PostsWidget";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import CommunitySubNav from "scenes/communityHomePage/components/community-nav";
import { width } from "@mui/system";

const TopicPage = () => {
  const { category } = useParams();
   const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

console.log(category);

  return (
    <Box>
      <CommunityNavbar />
        <Box mt="4rem" paddingLeft={isNonMobileScreens ? "22%" : "7%"}>
            
                <div className="community-intro">
                    <Chip color="primary" icon={<KeyboardBackspaceIcon />} label="Back home" component="a" href="/home" clickable/>
                    <h1 className="community-intro__heading"> <span
                  className={`category__heading--${category.replace(/\s+/g, '-')}`}
          ></span>{category}</h1>
<Typography variant="h4" sx={{ m: "-2rem 0rem -0.5rem 0rem", width: "80%", maxWidth:"700px" }}>{`Discover ${category}-related posts and make a difference to those in need. Explore all the posts related to this topic and stay up-to-date with the latest developments.`}</Typography>

                </div>
                {/* <div className="community-btn__wrapper">
                <Link to="/create" className='profile community-btn'>Create a Post! <CreateIcon /> </Link>
                </div> */}
        </Box>

      <Box
        width="100%"
        padding="3rem 4%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "18%" : undefined}>
 <CommunitySubNav/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "54%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
            <PostsWidget category={category} isTopic />
         
        </Box>

        <Box flexBasis="26%">
           <Box flexBasis="26%" mt={"2rem"}>
             <UserWidget userId={user._id} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <FriendListWidget userId={user._id} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopicPage;
