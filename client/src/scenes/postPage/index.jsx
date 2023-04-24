// this is the file that displays a single post
import { Box, Divider, InputBase, Button, useMediaQuery, Skeleton, CardMedia, Typography, IconButton, Chip, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Friend from 'components/Friend'
import CommunityNavbar from "scenes/communityNavbar";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from '@mui/icons-material'
import { setPosts } from "state";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from 'components/FlexBetween'
import Comment from 'components/Comment'
import { setPost } from 'state'
import TodayIcon from '@mui/icons-material/Today'
import { format } from "date-fns";

const PostPage = () => {

  const [isComments, setIsComments] = useState(false)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const [postInfo, setPostInfo] = useState(null);
  const [status, setStatus] = useState(null); // new state variable
  const { postId } = useParams();
  const token = useSelector((state) => state.token);


  const loggedInUserId = useSelector(state => state.user._id)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");



  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

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

  const isLiked = Boolean(postInfo?.likes?.[loggedInUserId])
  const likeCount = Object.keys(postInfo?.likes || {}).length



  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/posts/${postId}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: loggedInUserId })
      }
    )
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  const handleComment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/posts/${postId}/${loggedInUserId}/comment`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment: comment })
      }
    )
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
    setComment('')
  }

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

              <FlexBetween gap='1rem'>
                <FlexBetween gap='0.3rem'>
                  <IconButton onClick={patchLike}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap='0.3rem'>
                  <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{postInfo.comments.length}</Typography>
                </FlexBetween>
              </FlexBetween>
              {isComments && (
                <Box mt='0.5rem'>
                  {postInfo.comments
                    .slice(0)
                    .reverse()
                    .map((comment, i) => (
                      <Box key={`${postInfo.name}-${i}`}>
                        <Divider />
                        <Comment
                          userId={comment.userId}
                          comment={comment.comment}
                          postId={postInfo._id}
                        />
                      </Box>
                    ))}
                  <Divider />
                  <FlexBetween>
                    <InputBase
                      placeholder='Write a comment ...'
                      onChange={e => setComment(e.target.value)}
                      value={comment}
                      sx={{
                        width: '100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem',
                        mt: '1rem'
                      }}
                    />
                    <Button
                      disabled={!comment}
                      onClick={handleComment}
                      sx={{
                        color: palette.background.alt,
                        mt: '1rem',
                        ml: '0.5rem',
                        backgroundColor: palette.primary.main,
                        borderRadius: '3rem',
                        '&:hover': {
                          cursor: 'pointer',
                          color: palette.background.alt,
                          backgroundColor: palette.primary.main
                        }
                      }}
                    >
                      POST
                    </Button>
                  </FlexBetween>
                </Box>
              )}



            </>
          ) : (
            <Skeleton variant="rectangular" animation="wave" width="100%" height={200} />
          )}

        </WidgetWrapper>

        <Box flexBasis="26%">
          <WidgetWrapper
            flexBasis={isNonMobileScreens ? "54%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {postInfo && (
              <>
                <Friend
                  friendId={postInfo.userId}
                  name={postInfo.firstName + postInfo.lastName}
                  subtitle={postInfo.location}
                  userPicturePath={postInfo.userPicturePath}
                  iconSize={'50px'}
                />
                <Divider sx={{ m: "1.5rem 0" }} />
                <FlexBetween gap='0.3rem'>
                  <Typography variant="h6" >
                    Posted on
                  </Typography>
                  <Typography>{format(new Date(postInfo.createdAt), 'MMM d, yyyy h:mm a')}</Typography>
                </FlexBetween>

                    <FlexBetween gap='0.3rem'>
                      <Typography variant="h6" >
                  Country
                </Typography>
                  <Typography>{format(new Date(postInfo.createdAt), 'MMM d, yyyy h:mm a')}</Typography>
                </FlexBetween>
   <Divider sx={{ m: "1.5rem 0" }} />
                  
                    
          <Chip className={`category__chip--${postInfo.category.replace(/\s+/g, '-')}`} label={postInfo.category} />
               


                     

             
              </>
            )}


          </WidgetWrapper>
        </Box>
      </Box>
    </Box >
  );
};

export default PostPage;
