import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router';

import { ReactReader,ReactReaderStyle } from "react-reader"
import { useFetch } from 'tools/hooks/useFetch';
import PageLoading from 'utils/shared/PageLoading';
import { toast } from 'react-toastify';
import { bottomStandard } from 'configs/toastConfigs';
const ownStyles = {
  ...ReactReaderStyle,
  tocBackground: {
    ...ReactReaderStyle.tocBackground,
    top:'64px'

  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    top:'64px'

  }
}
export default function ReadBook() {
    const { id } = useParams(); 
    const {status,data}=useFetch(`books/bookurl/${id}`)
    const history = useHistory()
    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
      // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
      setLocation(epubcifi)
    }
    if(status !== 'fetched')
    return <PageLoading displayMsg="Loading you book..."/>
    if(data && !data?.success){
      toast(data.message, bottomStandard)
      history.push('/login')
    }
    if(data && data?.success)
    return (
        <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
     <ReactReader
        location={location}
        locationChanged={locationChanged}
        epubInitOptions={{
          openAs: 'epub',
          flow: "scrolled",
          manager: "continuous"
        }}
        styles={ownStyles}
        url={data.bookurl}
      />
    </Box>
    )
}
