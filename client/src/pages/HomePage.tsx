import { Box, Container } from "@mui/material";
import SearchUser from "../components/Home/SearchUser";
import UpdateFile from "../components/Home/UpdateFile";

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center">
        <UpdateFile />
        <SearchUser />
      </Box>
    </Container>
  );
}

export default HomePage;
