import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { CardContent, CardActionArea, Typography, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BookListCard({ cardData }) {
    const {
        isbn,
        title,
        author,
        publicationyear,
        bookimage,
        numpages,
        rating,
        genre,
        bookurl,
        language,
        synopsis,
        price,
    } = cardData
    return (
        <Stack direction="column">

            <Card
                key={isbn}
                className="book"
                sx={{ flexGrow: 1, width: '200px' }}
            >
                <CardContent
                    sx={{
                        padding: '0px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardMedia
                        key={isbn}
                        className="bookFront"
                        component="img"
                        sx={{ height: '100%', objectFit: 'cover' }}
                        image={bookimage}
                        alt="Live from space album cover"
                    />


                </CardContent>
                <CardContent
                    className='bookBack'
                    style={{
                        display: 'flex',
                        flexFlow: 'column'
                    }}

                >
                    <div style={{ flexGrow: 1 }}>
                        <Stack spacer={2}> <Typography sx={{ fontStyle: 'italic' }} variant="subtitle1">
                            <strong>Title: </strong> {title}
                        </Typography>
                            <Typography sx={{ fontStyle: 'italic' }} variant="subtitle1">
                                <strong>Author: </strong> {author}
                            </Typography>
                        </Stack>
                    </div>
                    <Button
                        component={Link}
                        to={`/book/${isbn}`}
                        size="large"
                        aria-label="View Book details"
                        variant="contained"
                        color="primary"
                    >View More</Button>
                </CardContent>

            </Card>
            <Rating
                name="half-rating-read"
                defaultValue={rating}
                precision={0.5}
                readOnly
            />
            <Typography variant="body1">Price: {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(price)}</Typography>

        </Stack>
    )
}
