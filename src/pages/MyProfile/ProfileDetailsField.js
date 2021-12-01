import { LoadingButton } from '@mui/lab';
import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/system';

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
            setIsSaving(false);
            setIsEditing(false);
         })
         .catch((e) => {
            setIsSaving(false);
         });
   };
   return (
     <Box>
         <Stack direction='row' spacing={3}>
         <TextField
            label={label}
            onChange={(e) => updateValue(keyLabel, e.target.value)}
            defaultValue={value}
            disabled={!isEditing}
            InputProps={{
               readOnly: !isEditing,
               style:{color:'#ffffff'}
            }}
         />
   
         {isEditing && !disabled && (
            <LoadingButton
               onClick={saveNewDetails}
               loading={isSaving}
               loadingPosition='start'
               startIcon={<SaveIcon />}
               variant='contained'
            >
               Save
            </LoadingButton>
         )}
         {!isEditing && !disabled && (
            <Button
               onClick={() => setIsEditing(!isEditing)}
               variant='contained'
            >
               Edit
            </Button>
         )}
      </Stack>
     </Box>
   );
}
