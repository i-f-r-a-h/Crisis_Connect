import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CommunityNavbar from "scenes/communityNavbar";
import { setPosts } from "state";

import CommunitySubNav from "scenes/communityHomePage/components/community-nav";

const PostPage = () => {
  const [postInfo,setPostInfo] = useState(null);
  const [status, setStatus] = useState(null); // new state variable
  const { postId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getPostById = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}/fullPost`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    setStatus(response.status); // update status
    const data = await response.json();
    setPostInfo(data);
    console.log(data);
  };

  useEffect(() => {
    getPostById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <CommunityNavbar/>

      <Box
        width="100%"
        padding="2rem 4%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "22%" : undefined}>
          <CommunitySubNav />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "46%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {status === 404 && <h1>Page not found</h1>} {/* check status */}
          {postInfo && status !== 404 && <h1>{postInfo.description}</h1>} {/* check postInfo and status */}
        </Box>

        <Box flexBasis="26%">tet</Box>
      </Box>
    </Box>
  );
};

export default PostPage;