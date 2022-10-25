import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ApiIndex from '../../../api/index';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ faqId }) {
  const [answer, setAnswer] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const approveFaq = () => {
    console.log(answer);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setAnswer(event.target.value);
  };

  // const { answer } = state;

  return (
    <div>
      <Button onClick={handleOpen}>Answer</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The Answer of the Question is:
          </Typography>
          <br></br>
          <TextField
            type="text"
            onChange={handleChange}
            id="outlined-basic"
            label="Answer"
            variant="outlined"
            width="100px"
          />
          <br></br>
          <br></br>
          <br></br>

          <Button onClick={approveFaq} variant="contained" color="success" sx={{ m: 3 }}>
            Approve
          </Button>

          <Button variant="contained" color="error">
            Reject
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
