// Import necessary modules from the React library and the MUI (Material UI) library
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import { setPost } from "state";
import DeleteIcon from "@mui/icons-material/Delete";

// Define a function component named Comment that takes in props as parameters
function Comment({ userId, comment, postId }) {
  // Retrieve the token and user information from the Redux store
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  // Define a local state variable to store the user information for the comment
  const [user, setUser] = useState("");

  // Retrieve the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Retrieve the color palette from the MUI theme
  const { palette } = useTheme();
  const main = palette.neutral.main;

  // Define a function to retrieve the user information for the comment from the server
  const getCommentUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  // Define a function to handle the deletion of the comment
  const handleDeleteComment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/posts/${postId}/${userId}/comment/delete`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // Call the getCommentUser function when the component mounts or the comment state changes
  useEffect(() => {
    getCommentUser();
  }, [comment]); // eslint-disable-line react-hooks/exhaustive-deps

  // Render the comment information using the MUI Box and Typography components
  return (
    <FlexBetween>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <UserImage image={user.picturePath} size="35px" />
        <Box>
          <Typography
            variant="h6"
            sx={{ m: "0.5rem 0rem -0.5rem 1rem" }}
          >{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
            {comment}
          </Typography>
        </Box>
      </Box>

      {userId === _id && (
        <DeleteIcon onClick={handleDeleteComment} sx={{ cursor: "pointer" }} />
      )}
    </FlexBetween>
  );
}

// Export the Comment component as the default export of this module
export default Comment;
