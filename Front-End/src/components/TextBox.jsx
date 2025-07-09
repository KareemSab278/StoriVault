import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextBox({ text }) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 2, width: '90%', height: '50%' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          multiline
          minRows={20}
          value={text}
          InputProps={{
            readOnly: true,
            style: { color: 'white' }
          }}
        />
      </div>
    </Box>
  );
}
