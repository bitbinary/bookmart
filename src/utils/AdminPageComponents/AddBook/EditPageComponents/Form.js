import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Grid,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import { Controller } from "react-hook-form";
import ImageUploader from "../ImageUploader";
import { Box } from "@mui/system";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Image from "utils/shared/Image";
export default function Form(props) {
  const {
    formData,
    onSubmit,
    handleSubmit,
    control,
    buttonType,
    files,
    setFiles,
    bookimage,
    bookURL,
  } = props;
  const [bookImageUrl, setBookImageUrl] = useState(null);
  const onImageSelect = (file) => {
    const objectURL = URL.createObjectURL(file);
    setBookImageUrl(objectURL);
  };
  return (
    <form className="addBooks-form-Container" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item sx={12} md={8}>
          {formData.map((bookProps) => {
            return (
              <Controller
                name={bookProps.name}
                control={control}
                key={bookProps.name}
                defaultValue={bookProps?.value}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    className="controller"
                    type={bookProps.type}
                    label={bookProps.name}
                    variant="filled"
                    value={value}
                    required={bookProps.required}
                    multiline={bookProps.multiline}
                    rows={bookProps.rows}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: bookProps.rules }}
              />
            );
          })}
        </Grid>
        <Grid item sx={12} md={4}>
          <Box
            mt={3}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack direction="row" gap={2}>
              <ImageUploader
                itemType="upload cover image"
                name="bookImage"
                onImageSelect={onImageSelect}
                files={files}
                setFiles={setFiles}
                startIcon={<InsertPhotoIcon />}
              />

              <ImageUploader
                itemType="upload eBook"
                name="book"
                files={files}
                setFiles={setFiles}
                startIcon={<MenuBookIcon />}
              />

              <Button type="submit" variant="contained" color="primary">
                {buttonType}
              </Button>
            </Stack>
          </Box>
          <Stack gap={3}>
            {bookImageUrl || bookimage?<Box>
              <Typography variant="h6">{!bookImageUrl?"Current":"Selected"} Image</Typography>
              <Typography variant="subtitle2">
                {files?.["bookImage"]?.name}
              </Typography>
              <Paper elevation={2} sx={{ width: "150px" }}>
                <Image
                  imagePath={bookImageUrl || bookimage}
                  alt="selected image"
                  style={{ width: "150px" }}
                />
              </Paper>
            </Box>:null}

            {files?.["book"] && (
              <Box>
                <Typography variant="h6">Selected Book</Typography>
                <Typography variant="subtitle2">
                  {files?.["book"]?.name || bookURL}
                </Typography>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
