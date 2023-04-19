import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import CommunityNavbar from "scenes/communityNavbar";
import { Outlet, Link, useLocation } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import CommunitySubNav from "./components/community-nav";

const CommunityHomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);

  return (
    <Box>
      <CommunityNavbar />
       <header className="community-page-header">
                <div></div>
                <div className="community-intro">
                    <p className="community-intro__subheading">Our Community Hub</p>
                    <h1 className="community-intro__heading">join the conversation, make a difference</h1>
                </div>
                {/* <div className="community-btn__wrapper">
                <Link to="/create" className='profile community-btn'>Create a Post! <CreateIcon /> </Link>
                </div> */}
            </header>
      <Box
        width="100%"
        padding="2rem 4%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
<Box flexBasis={isNonMobileScreens ? "18%" : undefined} sx={{ position: "sticky", top: "2rem" }}>
  <CommunitySubNav/>
</Box>

        <Box
          flexBasis={isNonMobileScreens ? "54%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"} 
             sx={{ position: "sticky", top: "2rem" }} 
        >

        {user && (
           <>
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={user._id} />
          </>
          )}
   
        
     


        </Box>
        {isNonMobileScreens && user &&  (
          <Box flexBasis="26%">
             <UserWidget userId={user._id} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <FriendListWidget userId={user._id} />
          </Box>
        )}
      </Box>  
    </Box>
  );
};

export default CommunityHomePage;