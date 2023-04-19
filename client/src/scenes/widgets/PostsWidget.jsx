import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import Skeleton from '@mui/material/Skeleton';
import { Box, Card, useMediaQuery } from "@mui/material";

const PostsWidget = ({ userId, category, isProfile = false, isTopic = false }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);


    const getPosts = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
        setIsLoading(false);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
      setIsLoading(false);
  };

  const getTopicPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/posts/${encodeURIComponent(category)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else if(isTopic){
      getTopicPosts();
    } else {
      getPosts();
    }
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <>
        
        <Card sx={{ marginTop: 2 }}>
            <Skeleton variant="rectangular" animation="wave" width="100%" height={218} />
        </Card>
           <Card sx={{ marginTop: 2 }}>
            <Skeleton variant="rectangular" animation="wave" width="100%" height={218} />
        </Card>

        </>
        );

  }

  return (
    <>
      {posts.length ? posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          category,
          country,
          likes,
          comments,
            createdAt
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            category={category}
            country={country}
            likes={likes}
            comments={comments}
              createdAt={createdAt}
          />
        )
      ):null}
    </>
  );
};

export default PostsWidget;
