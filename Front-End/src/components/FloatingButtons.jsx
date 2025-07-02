import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtons() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab
        variant="extended"
        aria-label="add"
        sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#115293' } }}
      >
        Add to List
        <AddIcon sx={{ ml: 1 }} />
      </Fab>
      <Fab
        variant="extended"
        aria-label="create"
        sx={{ backgroundColor: '#43a047', color: 'white', '&:hover': { backgroundColor: '#2e7031' } }}
      >
        New story
        <EditIcon sx={{ ml: 1 }} />
      </Fab>

      <Fab
        variant="extended"
        aria-label="create"
        sx={{ backgroundColor: '#800080', color: 'white', '&:hover': { backgroundColor: '#660066' } }}
      >
        Edit story
        <EditIcon sx={{ ml: 1 }} />
      </Fab>

      <Fab
        variant="extended"
        sx={{ backgroundColor: '#fbc02d', color: '#333', '&:hover': { backgroundColor: '#c49000' } }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        random btn
      </Fab>
      <Fab
        aria-label="like"
        sx={{ backgroundColor: '#e53935', color: 'white', '&:hover': { backgroundColor: '#ab000d' } }}
      >
        <FavoriteIcon />
      </Fab>
    </Box>
  );
}