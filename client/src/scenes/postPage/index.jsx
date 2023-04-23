// this is the file that displays a single post
import { Box, useMediaQuery, Skeleton, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CommunityNavbar from "scenes/communityNavbar";
import { setPosts } from "state";
import Chip from '@mui/material/Chip';
import CommunitySubNav from "scenes/communityHomePage/components/community-nav";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { margin } from "@mui/system";
import WidgetWrapper from "components/WidgetWrapper";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
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
      <CommunityNavbar />

      <Box
        width="100%"
        padding="2rem 4%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "18%" : undefined}>
          <Chip color="primary" sx={{ marginBottom: "2rem" }} icon={<KeyboardBackspaceIcon />} label="Back home" component="a" href="/home" clickable />

        </Box>
        <WidgetWrapper
          flexBasis={isNonMobileScreens ? "54%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {status === 404 && <h1>Page not found</h1>} {/* check status */}
          {postInfo ? (
            <>
              {postInfo.picturePath && (
                <CardMedia
                  component="img"
                  src={postInfo.picturePath}
                  alt="Post image"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              )}
              <Typography variant="h4" sx={{ m: "1.5rem 0" }}>
                {postInfo.description}
              </Typography>
            </>
          ) : (
            <Skeleton variant="rectangular" animation="wave" width="100%" height={200} />
          )}

        </WidgetWrapper>

        <Box flexBasis="26%">tet</Box>
      </Box>
    </Box>
  );
};

export default PostPage;
