import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{ width: { xs: "100vw", sm: "sm", md: "md", lg: "lg" } }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 2, mb: 2 }}
      >
        2023 &copy; project name
      </Typography>
    </Container>
  );
};

export default Footer;
