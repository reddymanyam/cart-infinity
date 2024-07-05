import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { database } from './firebaseconfig';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(database, email, password)
            .then((data) => {
                console.log(data, 'authdata');
                navigate('/login'); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(`Failed to sign up: ${errorMessage}`);
            });
    };

    const PaperStyle = { padding: '20px', margin: '40px auto', height: '420px', width: '280px' }; 
    const avatarStyle = { backgroundColor: '#21b095f7' };
    const Btn = { padding: '10px', margin: '5px 0px 0px 0px' }; 
    return (
        <Grid>
            <Paper style={PaperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h3>Sign Up</h3>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="username"
                        label="Username"
                        placeholder='Enter Username'
                        required
                        variant="standard"
                        fullWidth
                        autoComplete='off'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        placeholder="Enter Email"
                        type="email"
                        required
                        variant="standard"
                        fullWidth
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        placeholder='Enter Password'
                        type='password'
                        required
                        variant="standard"
                        fullWidth
                        autoComplete='off'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button style={Btn} type='submit' variant='contained' fullWidth>Sign Up</Button>
                    <Typography>
                        <h4>If you have an account already?</h4>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <h6>Login Here</h6>
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
};

export default Signup;
