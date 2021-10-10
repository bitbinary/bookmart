import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

export default function CarouselCard() {
    return (
        <Card
            className='top-books-card'
            sx={{
                maxWidth: 300,
            }}
        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardMedia
                    sx={{ width: '157px', height: '239px' }}
                    component='img'
                    image={'http://images.amazon.com/images/P/067976402X.01.LZZZZZZZ.jpg'}
                    alt='wild'
                />

            </CardActionArea>
        </Card>
    )
}
