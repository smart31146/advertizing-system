import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box component="main" sx={{ mt: 10, textAlign: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
