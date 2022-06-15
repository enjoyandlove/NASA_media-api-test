import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Post from './Post';
import Pagination from './Pagination';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const StyledInput = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '5ch',
            '&:focus': {
                width: '9ch',
            },
        },
    },
}));

export default function Header() {
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [title, setTitle] = useState('');
    const [results, setResults] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const handleClick = async () => {
        setIsloading(true)
        const res = await fetch(`https://images-api.nasa.gov/search?q=${title}&year_start=${from}&year_end=${to}`)
        const json = await res.json()
        setIsloading(false)
        console.log(json.collection.items);
        setResults(json.collection.items);
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
                        >
                            NASA MEDIA
                        </Typography>

                        <Search>
                            <StyledInput
                                placeholder="from"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </Search>

                        <Search>
                            <StyledInput
                                placeholder="to"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </Search>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </Search>
                        <Button variant='contained' onClick={handleClick}>Go</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            {isloading && <p>loading...</p>}
            {/* {results.length > 0 &&
                <Grid container spacing={2}>
                    {results.slice(0,5).map((result) => (
                        <Grid item xs={6} key={result.data[0].title}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={result.links[0].href}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {result.data[0].title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            } */}
            {results.length > 0 && <>
                <Pagination
                    data={results}
                    RenderComponent={Post}
                    title={title}
                    pageLimit={5}
                    dataLimit={10}
                />
            </>}
        </>
    );
}
