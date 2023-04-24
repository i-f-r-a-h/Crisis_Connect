import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Button,
  CardMedia
} from '@mui/material'
import Comment from 'components/Comment'
import FlexBetween from 'components/FlexBetween'
import Friend from 'components/Friend'
// import UserImage from "components/UserImage";
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'state'
import { useNavigate } from 'react-router-dom'
import TodayIcon from '@mui/icons-material/Today'
import {format} from "date-fns";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  category,
  country,
  likes,
  comments,
  createdAt
}) => {
  const [isComments, setIsComments] = useState(false)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.token)
  const loggedInUserId = useSelector(state => state.user._id)
  // const picturePath = useSelector((state)=> state.user.picturePath);
  const isLiked = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

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
    <WidgetWrapper m='2rem 0' className={`postWidget--${category.replace(/\s+/g, '-')}`} >
      <Box 
       sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
        onClick={() => {
          navigate(`/post/${postId}`)
        }}>
           {picturePath && (
        <CardMedia
          component='img'
          height='194'
          image={`${picturePath}`}
          alt='Post'
          style={{ borderRadius: '1rem' }}
        />
   
      )}
      <FlexBetween mt='0.25rem'>
        <Typography
          color={main}
          sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
        >
          <span className={`category--${category.replace(/\s+/g, '-')}`}></span>
          {category}
        </Typography>

        <Typography
          color={main}
          sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
        >
          {country}
        </Typography>
      </FlexBetween>

      <Box

      >
   <Typography variant='h3' color={main} sx={{ m: '1rem 0' }}>
  {description.length > 35 ? description.slice(0, 125) + '...' : description}
</Typography>
      </Box>

      </Box>
     

      <Divider />
      <FlexBetween mt='0.8rem'>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          iconSize={'30px'}
        />
        <Divider orientation='vertical' flexItem />

        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <TodayIcon />
           <Typography>{format(new Date(createdAt), 'MMM d, yyyy h:mm a')}</Typography>
          </FlexBetween>
        </FlexBetween>

        <Divider orientation='vertical' flexItem />
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
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments
            .slice(0)
            .reverse()
            .map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Comment
                  userId={comment.userId}
                  comment={comment.comment}
                  postId={postId}
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
    </WidgetWrapper>
  )
}

export default PostWidget
