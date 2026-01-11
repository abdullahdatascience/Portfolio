// src/admin/AdminDashboard.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ManageProjects from './ManageProjects';


export default function AdminDashboard() {
const navigate = useNavigate();
async function handleSignOut() {
await signOut(auth);
navigate('/admin');
}


return (
<div style={{maxWidth:1000, margin:'24px auto', padding:20}}>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
<h2>Admin Dashboard</h2>
<div>
<button onClick={handleSignOut} style={{padding:8}}>Sign Out</button>
</div>
</div>


<div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
<div style={{background:'#fff', borderRadius:8, boxShadow:'0 4px 12px rgba(0,0,0,0.04)'}}>
<h3 style={{padding:12}}>Add Project</h3>
<ProjectForm onSaved={() => alert('Project saved')} />
</div>


<div style={{background:'#fff', borderRadius:8, boxShadow:'0 4px 12px rgba(0,0,0,0.04)'}}>
<h3 style={{padding:12}}>Manage Projects</h3>
<ManageProjects />
</div>
</div>
</div>
)
}