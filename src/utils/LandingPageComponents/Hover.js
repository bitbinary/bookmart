import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Filters from './Filters';
import FilterList from '@mui/icons-material/FilterList';
import { Books } from '../../context/Books';

export default function Hover() {
   const { updateFilters } = React.useContext(Books)

   return (
      <PopupState variant='popover' popupId='demo-popup-popover' style={{
         display: 'flex', alignItems: 'center', flexBasis: '200px', flexShrink: 0
      }}>
         {(popupState) => (
            <>
               <FilterList
                  sx={{
                     fontFamily: 'Poynter,Georgia,serif',
                     fontStyle: 'italic',
                  }}
                  {...bindTrigger(popupState)}
               />
               <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'center',
                  }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'center',
                  }}
               >
                  <Filters />
               </Popover>
            </>
         )}
      </PopupState>
   );
}
