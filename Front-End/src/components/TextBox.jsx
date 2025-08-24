import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextBox({ text }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <TextField
        multiline
        minRows={20}
        value={text}
        InputProps={{
          readOnly: true,
          style: { color: "white", width: "100%" },
        }}
        sx={{
          width: "100%",
          maxWidth: 700,
          background: "#222",
          borderRadius: 2,
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      />
    </Box>
  );
}
