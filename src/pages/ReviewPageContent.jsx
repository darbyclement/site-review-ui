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

// TODO: Keep comment thread open unless you close threads (when closed, display number of comments in thread); use down and up arrows to indicate whether thread open or not
// TODO: Add comment when press enter key
// TODO: Add rating system
// TODO: Tags?
// TODO: Filter by tags?
// FIXME: Delete icon deletes all comments

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    // height: 48,
    padding: "0 30px",
    marginLeft: "5px",
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
  const [openThreadFor, setOpenThreadFor] = React.useState(""); // Remember which comment thread to set thread open for!
  const [newCommentThread, setNewCommentThread] = React.useState("");
  const [newComment, setNewComment] = React.useState("");
  const [allComments, setAllComments] = React.useState(
    commentsData.page1.comments
  );
  const currentUserId = "christinealuo"; // You can only delete comments made by the current user

  /**
   * Opens a comment thread for user to view comments in that thread
   * @param {string} commentThreadId
   */
  const handleOpenThread = (commentThreadId) => {
    // 1. Open the comment thread for comment thread with commentThreadId
    console.log(commentThreadId);
    if (commentThreadId === openThreadFor) {
      console.log("if");
      setOpenThread(false);
      setOpenThreadFor("");
    } else {
      console.log("else");
      setOpenThread(true);
      setOpenThreadFor(commentThreadId);
    }
  };

  /**
   * Adds a new comment to the current thread
   * @param {string} commentThreadId
   * @param {string} comment
   */
  const handleAddCommentToThread = (commentThreadId, comment) => {
    // 1. Create new comment (not a comment thread)
    console.log("woo");
    const newCommentObject = {
      userId: "christinealuo",
      commentId: parseInt(Math.random() * 1000),
      comment: comment,
      rating: "5",
      date: "2020-07-07",
    };
    // TODO: Finalize on a structure for comment threads
    // Structure of a comment thread:
    // 1. Comment thread (object, identified by threadId)
    // 2. Thread (list)
    // 3. Comment (object, identified by commentId)
    const currentCommentThread = allComments[commentThreadId];
    const currentThread = currentCommentThread.thread;
    const newThread = {
      ...currentThread,
      [newCommentObject.commentId]: newCommentObject,
    };
    const newCommentThread = { ...currentCommentThread, thread: newThread };
    setAllComments({ ...allComments, [commentThreadId]: newCommentThread });
    setNewComment("");
  };

  /**
   * Creates a new comment thread
   * @param {*} e
   */
  const handleAddCommentThread = (e) => {
    if (newCommentThread === "") {
      alert(
        "Empty comment! Please make sure you type out your comment before selecting add."
      );
      return;
    }
    const newCommentThreadObject = {
      userId: "christinealuo", // Default for now, once we add the backend we will have to change this to the currently authorized user
      comment: newCommentThread,
      rating: "5", // Default for now
      date: "2020-07-07",
      thread: [],
      threadId: parseInt(Math.random() * 1000),
      openThread: false,
    };
    setAllComments({ ...allComments, "123abc": newCommentThreadObject });
    setNewCommentThread("");
  };

  // TODO: Add JSDoc comment
  const handleDeleteComment = (commentId) => {
    const oldComments = [];
    for (var i = 0; i < allComments.length; i++) {
      if (allComments[i].commentId !== commentId) {
        oldComments.push(allComments[i]);
      }
    }
    setAllComments(oldComments);
  };

  console.log(allComments);

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
        {Object.values(allComments).map((commentThread) => {
          let collapseComponentListItems = Object.values(
            commentThread.thread
          ).map((comment) => (
            <ListItem className={classes.nested}>
              <ListItemAvatar>
                <Avatar>CL</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment.comment}
                secondary={"@" + comment.userId}
              />
            </ListItem>
          ));

          console.log(
            openThread &&
              openThreadFor === commentThread.commentThreadId &&
              collapseComponentListItems.length > 0
          );
          console.log(collapseComponentListItems);
          return (
            <React.Fragment>
              <ListItem
                button
                onClick={(e) => handleOpenThread(commentThread.commentThreadId)}
              >
                <ListItemAvatar>
                  <Avatar className={classes.pink}>CL</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={commentThread.comment}
                  secondary={"@" + commentThread.userId}
                />
                {currentUserId === commentThread.userId && (
                  <DeleteIcon
                    onClick={(event) =>
                      handleDeleteComment(commentThread.threadId)
                    }
                  />
                )}
              </ListItem>
              {openThread &&
                openThreadFor === commentThread.commentThreadId &&
                collapseComponentListItems.length > 0 && (
                  // Note to self: Collapse component will not show unless it is non-empty
                  <Collapse
                    in={
                      openThread &&
                      openThreadFor === commentThread.commentThreadId
                    }
                  >
                    {collapseComponentListItems && (
                      <List>{collapseComponentListItems}</List>
                    )}
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextField
                        label="What are your thoughts?"
                        variant="outlined"
                        style={{ width: "90%" }}
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                      />
                      <Button
                        className={classes.root}
                        onClick={(e) =>
                          handleAddCommentToThread(
                            commentThread.commentThreadId,
                            newComment
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </Collapse>
                )}
              {openThread &&
                openThreadFor === commentThread.commentThreadId &&
                collapseComponentListItems.length === 0 && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <TextField
                      label="What are your thoughts?"
                      variant="outlined"
                      style={{ width: "90%" }}
                      onChange={(e) => setNewComment(e.target.value)}
                      value={newComment}
                    />
                    <Button
                      className={classes.root}
                      onClick={(e) =>
                        handleAddCommentToThread(
                          commentThread.commentThreadId,
                          newComment
                        )
                      }
                    >
                      Add
                    </Button>
                  </div>
                )}
            </React.Fragment>
          );
        })}
      </List>
      <div style={{ display: "flex" }}>
        <TextField
          label="Add a review for this page 🤩"
          variant="outlined"
          fullWidth
          multiline
          onChange={(e) => setNewCommentThread(e.target.value)}
          value={newCommentThread}
        />
        <Button
          variant="contained"
          onClick={handleAddCommentThread}
          size="large"
          className={classes.root}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
