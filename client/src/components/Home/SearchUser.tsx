import { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import "./css/updateFile.css";

interface SearchResult {
  fileName: string;
  results: Record<string, string>[];
}

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (!searchQuery) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get(`/api/users?q=${searchQuery}`);
      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
      <Box marginTop="10vh" />
      <Typography variant="h4" gutterBottom>
        Buscar en el CSV
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ height: "40px" }}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1.5vh", textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ height: "40px" }}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {searchResults?.map((result, index) => (
          <Grid item xs={12} key={index} style={{ margin: "20px" }}>
            <Paper elevation={3} style={{ padding: "16px", maxWidth: "400px" }}>
              <Typography variant="h6" gutterBottom>
                Nombre de Archivo: {result.fileName}
              </Typography>
              {result.results.map((item, i) => (
                <Paper
                  elevation={1}
                  style={{ padding: "8px", margin: "8px 0" }}
                  key={i}
                >
                  {Object.entries(item).map(([key, value]) => (
                    <Typography key={key}>
                      {key}: {value}
                    </Typography>
                  ))}
                </Paper>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SearchUser;
