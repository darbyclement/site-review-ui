import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  TextField,
  Button,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import commentsData from "./commentsData.json";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ReviewPageContent() {
  const classes = useStyles();
  const [openThread, setOpenThread] = React.useState(false); // React Hooks: set state without having to create classes for components
  const [newComment, setNewComment] = React.useState("");
  const [allComments, setAllComments] = React.useState(
    commentsData.page1.comments
  );
  const currentUserId = "christinealuo"; // You can only delete comments made by the current user

  const handleClick = () => {
    setOpenThread(!openThread);
  };

  const handleAddComment = (e) => {
    console.log("Added new comment!");
    const newCommentObject = {
      userId: "christinealuo", // Default for now, once we add the backend we will have to change this to the currently authorized user
      comment: newComment,
      rating: "5", // Default for now
      date: "2020-07-07",
    };
    setAllComments([...allComments, newCommentObject]);
    setNewComment("");
  };

  const handleTextFieldChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleDeleteComment = (commentId) => {
    console.log("Deleting comment!");
    console.log(commentId);
    const oldComments = [];
    for (var i = 0; i < allComments.length; i++) {
      if (allComments[i].commentId !== commentId) {
        oldComments.push(allComments[i]);
      }
    }
    setAllComments(oldComments);
  };

  const handleAddToThread = (event) => {
    console.log("Added new comment to thread");
  };

  return (
    <div style={{ textAlign: "center", height: "80vh", padding: "0% 10% 50%" }}>
      <h1>Review Page Content</h1>
      <iframe
        src="https://labs.codeday.org/schedule"
        width="100%"
        height="85%"
        frameborder="0"
        allowfullscreen
        sandbox
      >
        <p>
          <a href="https://developer.mozilla.org/en-US/docs/Glossary">
            Fallback link for browsers that don't support iframes
          </a>
        </p>
      </iframe>
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemAvatar>
            <Avatar>CL</Avatar>
          </ListItemAvatar>
          <ListItemText primary="This is a comment 🤩" />
          {openThread ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openThread}>
          <List>
            <ListItem button className={classes.nested}>
              <ListItemAvatar>
                <Avatar>CL</Avatar>
              </ListItemAvatar>
              <ListItemText primary="@christineluo Nice comment!" />
            </ListItem>
          </List>
        </Collapse>
        {allComments.map((comment) => (
          <ListItem button onClick={handleAddToThread}>
            <ListItemAvatar>
              <Avatar className={classes.pink}>CL</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.comment}
              secondary={comment.userId}
            />
            {currentUserId === comment.userId && (
              <DeleteIcon
                onClick={(event) => handleDeleteComment(comment.commentId)}
              />
            )}
          </ListItem>
        ))}
      </List>
      <div>
        <TextField
          label="Add a review for this page 🤩"
          variant="outlined"
          fullWidth
          multiline
          onChange={handleTextFieldChange}
          value={newComment}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          size="large"
          className={classes.root}
          style={{ marginTop: "2.5%" }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
