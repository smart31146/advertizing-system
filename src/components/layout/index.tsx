import { ReactNode } from "react";
import Header from "./header";
import { Box, Container } from "@mui/material";
import Footer from "./footer";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Box>
        <Container
          sx={{ width: { xs: "100vw", sm: "sm", md: "md", lg: "lg" } }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
