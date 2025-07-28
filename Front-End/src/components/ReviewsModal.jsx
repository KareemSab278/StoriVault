import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { getReviews } from "../../app";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// get data from get reviews for each story (key = storyId)
// show the reviews for the story on click (foreach story show review.comment)

export function ReviewsModal({ storyId }) {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState(["No Reviews Yet"]);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(storyId);
        setReviews(data.length ? data : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [storyId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <Button onClick={handleOpen}> No Reviews</Button>
      ) : (
        <Button onClick={handleOpen}> See Reviews</Button>
      )}
      {/* got an onclick conflict here where clicking on story card causes a problem */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography>No Reviews Yet</Typography>
          ) : (
            reviews.map((r, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {r.username}
                </Typography>
                <Typography>{r.comment}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </div>
  );
}
