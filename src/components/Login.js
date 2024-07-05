import { Avatar, Button, Grid, Paper} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from './firebaseconfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(database, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                alert("login succesufully...!")
                navigate('/'); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(`Failed to log in: ${errorMessage}`);
            });
    };

    const PaperStyle = { padding: '20px', margin: '40px auto', height: '70vh', width: '280px' }; 
    const avatarStyle = { backgroundColor: '#21b095f7' };
    const Btn = { padding: '10px', margin: '5px 0px 0px 0px' }; 

    return (
        <Grid>
            <Paper style={PaperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h3>Login</h3>
                </Grid>
                <form>
                    <TextField
                        id="email"
                        label="Email"
                        placeholder='Enter Email'
                        type='email'
                        required
                        variant="standard"
                        fullWidth
                        autoComplete='off'
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
                    <Button style={Btn} type='submit' variant='contained' fullWidth onClick={handleSubmit}>Login</Button>
                    
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;
