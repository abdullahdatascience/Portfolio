// src/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';


export default function AdminLogin() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();


async function handleSubmit(e) {
e.preventDefault();
setError('');
try {
await signInWithEmailAndPassword(auth, email, password);
navigate('/admin/dashboard');
} catch (err) {
setError('Failed to log in. Please check your credentials.');
console.error(err);
}
}


return (
<div style={{maxWidth: 480, margin: '40px auto', padding: 24, boxShadow: '0 6px 18px rgba(0,0,0,0.08)'}}>
<h2 style={{textAlign:'center'}}>Admin Portal</h2>
{error && <div style={{background:'#ffecec', color:'#c00', padding:12, borderRadius:6, marginBottom:12}}>{error}</div>}


<form onSubmit={handleSubmit}>
<label>Email Address</label>
<input value={email} onChange={e=>setEmail(e.target.value)} type="email" style={{width:'100%', padding:10, margin:'8px 0', borderRadius:6}} />


<label>Password</label>
<input value={password} onChange={e=>setPassword(e.target.value)} type="password" style={{width:'100%', padding:10, margin:'8px 0', borderRadius:6}} />


<button type="submit" style={{width:'100%', padding:12, marginTop:12, borderRadius:8, background:'#5b3ff0', color:'white', border:'none'}}>Sign In</button>
</form>
</div>
);
}