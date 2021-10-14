import { Button, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import {
  auth,
  updateProfileDetails,
  updateEmailDetails,
} from 'configs/firebase';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageLoading from 'utils/shared/PageLoading';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import ProfileDetailsField from 'pages/MyProfile/ProfileDetailsField';
export default function MyProfile() {
  const [user, loading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({
    displayName: user?.displayName,
    email: user?.email,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { displayName, email } = userDetails;
  const updateUserDetails = (key, update) => {
    setUserDetails({ ...userDetails, [key]: update });
  };
  const saveNewProfileDetails = (details) => {
    return updateProfileDetails({ ...details })
      .then((result) => {
        setIsSaving(false);
        setIsEditing(false);
      })
      .catch((error) => {
        setIsSaving(false);
      });
  };
  const saveNewEmailDetails = (details) => {
    return updateEmailDetails({ ...details })
      .then((result) => {
        setIsSaving(false);
        setIsEditing(false);
      })
      .catch((error) => {
        setIsSaving(false);
      });
  };

  return !loading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flexGrow={1}
    >
      <Stack direction="column" spacing={3}>
        <ProfileDetailsField
          label="User Name"
          value={displayName}
          keyLabel="displayName"
          disabled={false}
          saveDetails={saveNewProfileDetails}
          updateValue={updateUserDetails}
        />
        <ProfileDetailsField
          label="Email"
          value={email}
          keyLabel="email"
          disabled={true}
          updateValue={updateUserDetails}
          saveDetails={saveNewEmailDetails}
        />
      </Stack>
    </Box>
  ) : (
    <PageLoading />
  );
}
