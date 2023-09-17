import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import "./css/updateFile.css";

const UpdateFile = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (file.name.slice(-4) !== ".csv") {
      alert("Only CSV files are allowed.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("csv", file);

      const response = await axios.post("/api/files/", formData);

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        throw new Error("Error al cargar el archivo CSV.");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
      <Box marginTop="20vh" />
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Cargar Archivo CSV
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Input
            type="file"
            inputProps={{ accept: ".csv" }}
            inputRef={fileInputRef}
            id="file-input"
            style={{ display: "none" }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="file-input" className="file-input-label">
              Choose File
            </label>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Cargar
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateFile;
