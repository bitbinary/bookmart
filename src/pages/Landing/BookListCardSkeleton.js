import React from 'react'
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
export default function BookListCardSkeleton({ cardData }) {
    return (
        <Card
            className='top-books-card'
            sx={{
                width: 157,
                height: 239,
                display: 'flex',
                flexFlow: 'column',
                backgroundColor: 'transparent'
            }}
        >
            <Skeleton variant="rectangular" sx={{ flexGrow: 1 }} />
            <Skeleton />
            <Skeleton width="60%" />

        </Card>
    )
}
