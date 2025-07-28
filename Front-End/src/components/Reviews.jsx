import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { getReviews } from "../../app";

// const labels = {
//   0.5: "Useless",
//   1: "Useless+",
//   1.5: "Poor",
//   2: "Poor+",
//   2.5: "Ok",
//   3: "Ok+",
//   3.5: "Good",
//   4: "Good+",
//   4.5: "Excellent",
//   5: "Excellent+",
// };

// function getLabelText(value) {
//   return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
// }

export function Reviews({ storyId }) {
  const [value, setValue] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState("0");
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReviews(storyId);
        // console.log("Fetched reviews:", reviews);
        if (reviews?.length) {
          const avg =
            reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;
          setValue(avg);
        }
        setNumOfReviews(reviews?.length ? reviews.length.toString() : "0");
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [storyId]);

  return (
    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
      <p
        style={{ textAlign: "center", marginLeft: "1rem", marginRight: "1rem" }}
      >
        {numOfReviews}
      </p>
      <Rating
        name={`story-rating-${storyId}`}
        value={value}
        precision={0.5}
        readOnly
        // getLabelText={getLabelText}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        onChangeActive={(e, newHover) => setHover(newHover)}
      />
      {/* {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )} */}
    </Box>
  );
}
