import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import Axios from 'axios';
import '../output.css';
import './Login.css';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({ email: "", password: "" });

    const validateEmail = (email) => {
        if (!email) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
          return "";
    }
      
    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        if (!/\d/.test(password)) return "Password must contain at least one number";
        return "";
    };   
      
    const validateForm = (formData) => {
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        
        setErrors({ email: emailError, password: passwordError });
        return !emailError && !passwordError;
      }    
    ;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await Axios.get("http://localhost:3001/users");
                setData(resp.data);
                // console.log(data)
            } catch (e) {
                alert('Error receiving data.');
            }
        };
        setInterval(fetchData,1000);
    }, []);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePass = (e) => setPass(e.target.value);
    const handleCpass = (e) => setCpass(e.target.value);

    const toggleForm = () => setIsLogin((prev) => !prev);

    const Action = async (e) => {
        e.preventDefault();
        if(!isLogin){
            if (pass !== cpass) {
                alert('Passwords do not match.');
                return;
            }
            var id;
    
            if (data.length==0){
                id = 1;
            }
            else{
                console.log('hi');
                id = data[data.length-1].id+1;
            }
            
            const newUser = { id, email, pass };
            if (!validateForm({email:email,password:pass})){
                alert('Provide valid credentials....');
                console.log(errors);
                setEmail('');
                setPass('');
                setCpass('');
            }
            else if(data.find(user => (user.email==email && user.pass==pass))){
                alert("User already signed up..");
                setEmail('');
                setPass('');
                setCpass('');
            }
            else{
                try{
                    await Axios.post('http://localhost:3001/users', newUser);
                    alert('User registered successfully!');
                    alert('Login successful!');
                    props.func1(true);
                    props.func2(id);
                } catch (error) {
                    alert('An error occurred during submission.');
                    console.error(error);
                }
            }
        }
        else{
            const result = data.find(user => (user.email==email && user.pass==pass));
            if (result){
                alert('Login successful!');
                props.func1(true);
                props.func2(result.id);
            }
            else{
                alert('Invalid email or password.');
                setEmail('');
                setPass('');
                setCpass('');
            }
        }
    };

    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} className="py-7 px-5 rounded-lg shadow-lg">
                <Typography variant="h5" component="h1" className="text-center mb-4">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Typography>
                <form onSubmit={Action}>
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        label="Email Address" 
                        autoComplete="email" 
                        autoFocus 
                        value={email}
                        onChange={handleEmail}
                    />
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        required 
                        fullWidth 
                        label="Password" 
                        type="password" 
                        autoComplete="current-password" 
                        value={pass}
                        onChange={handlePass}
                    />
                    {!isLogin && (
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Confirm Password" 
                            type="password" 
                            autoComplete="new-password" 
                            value={cpass}
                            onChange={handleCpass}
                        />
                    )}
                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        className="mt-4"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>
                <div className="flex justify-center items-center mt-3">
                    <Button onClick={toggleForm} color="primary">
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                    </Button>
                </div>
            </Paper>
        </Container>
      </div>
    );
};