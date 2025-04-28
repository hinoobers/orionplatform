import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { handleTweetPost } from '../APIController';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const TweetModal = (props) => {
  console.log(props);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');


  const handlePostTweet = () => {
    handleTweetPost(title, text)
    props.handleClose()
  };

  console.log(props.isOpen, "a");

  return (
    <>
      <Modal
        open={props.isOpen}
        handleClose={props.handleClose}
        aria-labelledby="tweet-modal-title"
        aria-describedby="tweet-modal-description"
      >
        <Box sx={style}>
          <Typography id="tweet-modal-title" variant="h6" component="h2">
            What's happening?
          </Typography>
          <TextField
          label="Title"
          variant="outlined"
          fullWidth
          slotProps={{ htmlInput: { maxLength: 50 } }}
          sx={{ mt: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="What's happening?"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          slotProps={{ htmlInput: { maxLength: 500 } }}
          sx={{ mt: 2 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handlePostTweet} disabled={!title.trim() || !text.trim()}>
              Tweet
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TweetModal;
