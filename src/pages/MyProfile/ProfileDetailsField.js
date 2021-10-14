import { LoadingButton } from '@mui/lab';
import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

export default function ProfileDetailsField({
  label,
  saveDetails,
  value,
  updateValue,
  keyLabel,
  disabled,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveNewDetails = () => {
    saveDetails({
      [keyLabel]: value,
    })
      .then((res) => {
        console.log(res);
        setIsSaving(false);
        setIsEditing(false);
      })
      .catch((e) => {
        console.log(e);

        setIsSaving(false);
      });
  };
  return (
    <Stack direction="row" spacing={3}>
      <TextField
        id="outlined-read-only-input"
        label={label}
        onChange={(e) => updateValue(keyLabel, e.target.value)}
        defaultValue={value}
        disabled={!isEditing}
        InputProps={{
          readOnly: !isEditing,
        }}
      />

      {isEditing && !disabled && (
        <LoadingButton
          color="secondary"
          onClick={saveNewDetails}
          loading={isSaving}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </LoadingButton>
      )}
      {!isEditing && !disabled && (
        <Button onClick={() => setIsEditing(!isEditing)} variant="contained">
          Edit
        </Button>
      )}
    </Stack>
  );
}
