import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Filters from './Filters';
import FilterList from '@mui/icons-material/FilterList';

export default function Hover() {
   return (
      <PopupState variant='popover' popupId='demo-popup-popover'>
         {(popupState) => (
            <div>
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
            </div>
         )}
      </PopupState>
   );
}
