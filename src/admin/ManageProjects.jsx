// src/admin/ManageProjects.jsx
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';


export default function ManageProjects() {
const [projects, setProjects] = useState([]);
useEffect(() => {
const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
const unsub = onSnapshot(q, (snap) => {
const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
setProjects(items);
});
return () => unsub();
}, []);


async function handleDelete(id) {
if (!confirm('Delete this project?')) return;
try {
await deleteDoc(doc(db, 'projects', id));
} catch (err) {
console.error(err);
alert('Failed to delete');
}
}


return (
<div style={{padding:12}}>
<h3>Projects</h3>
<table style={{width:'100%', borderCollapse:'collapse'}}>
<thead>
<tr>
<th style={{textAlign:'left'}}>Title</th>
<th>Tools</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{projects.map(p => (
<tr key={p.id} style={{borderTop:'1px solid #eee'}}>
<td>{p.title}</td>
<td>{(p.tools||[]).join(', ')}</td>
<td>
<a href={p.projectLink} target="_blank" rel="noreferrer">Open</a>
{' | '}
<button onClick={()=>handleDelete(p.id)} style={{color:'red'}}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
)
}