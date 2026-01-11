// src/admin/ProjectForm.jsx
const [saving, setSaving] = useState(false);
const [error, setError] = useState('');


async function handleSubmit(e) {
e.preventDefault();
setError('');
setSaving(true);
try {
let imageUrl = '';
if (file) {
const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
await uploadBytes(storageRef, file);
imageUrl = await getDownloadURL(storageRef);
}
const docRef = await addDoc(collection(db, 'projects'), {
title,
summary,
tools: tools.split(',').map(t => t.trim()).filter(Boolean),
projectLink,
imageUrl,
createdAt: serverTimestamp()
});
setTitle(''); setSummary(''); setTools(''); setProjectLink(''); setFile(null);
onSaved && onSaved();
} catch (err) {
console.error(err);
setError('Failed to save project');
}
setSaving(false);
}


return (
<form onSubmit={handleSubmit} style={{padding:12}}>
{error && <div style={{color:'red'}}>{error}</div>}
<div>
<label>Title</label>
<input value={title} onChange={e=>setTitle(e.target.value)} required style={{width:'100%', padding:8}} />
</div>
<div>
<label>Summary</label>
<textarea value={summary} onChange={e=>setSummary(e.target.value)} style={{width:'100%', padding:8}} />
</div>
<div>
<label>Tools (comma separated)</label>
<input value={tools} onChange={e=>setTools(e.target.value)} style={{width:'100%', padding:8}} />
</div>
<div>
<label>Project Link</label>
<input value={projectLink} onChange={e=>setProjectLink(e.target.value)} style={{width:'100%', padding:8}} />
</div>
<div>
<label>Image</label>
<input type="file" onChange={e=>setFile(e.target.files[0])} />
</div>
<button type="submit" disabled={saving} style={{marginTop:10, padding:10}}>{saving ? 'Saving...' : 'Save Project'}</button>
</form>
)
}