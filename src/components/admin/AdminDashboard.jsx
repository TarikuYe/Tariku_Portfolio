import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    MessageSquare,
    LogOut,
    Eye,
    MessageCircle,
    Activity,
    Plus,
    Trash2,
    Edit,
    Send,
    X,
    Menu,
    Github
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// --- Sub-components ---

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass p-6 rounded-2xl border border-white/10 flex items-center gap-6"
    >
        <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
    </motion.div>
);

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        imageUrl: '',
        techStack: '',
        sourceUrl: '',
        demoUrl: '',
        githubUrl: '',
        price: '0'
    });
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formError, setFormError] = useState('');

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData.error);
                return;
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
        const interval = setInterval(fetchProjects, 10000); // Admin poll every 10s
        return () => clearInterval(interval);
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Vercel Serverless Function limit is 4.5MB
        if (file.size > 4.5 * 1024 * 1024) {
            setFormError('Image is too large. Please select an image under 4.5 MB.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        setFormError('');
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.imageUrl) {
                setNewProject({ ...newProject, imageUrl: data.imageUrl });
            } else {
                setFormError(data.message || 'Image upload failed');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setFormError('Network error during image upload.');
        } finally {
            setUploading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setFormError('');
        try {
            const url = editingId
                ? `/api/projects/${editingId}`
                : '/api/projects';

            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newProject.title,
                    description: newProject.description,
                    image_url: newProject.imageUrl,
                    tech_stack: newProject.techStack,
                    source_url: newProject.sourceUrl,
                    demo_url: newProject.demoUrl,
                    github_url: newProject.githubUrl,
                    price: parseFloat(newProject.price) || 0
                }),
            });

            if (response.ok) {
                setNewProject({
                    title: '',
                    description: '',
                    imageUrl: '',
                    techStack: '',
                    sourceUrl: '',
                    demoUrl: '',
                    githubUrl: '',
                    price: '0'
                });
                setIsFormOpen(false);
                setEditingId(null);
                setFormError('');
                fetchProjects(); // Real-time update
            } else {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    setFormError(errorData.error || errorData.message || 'Failed to save project');
                } else {
                    setFormError(`Server error: ${response.status} ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error('Save project error:', error);
            setFormError('Network error. Please check your connection.');
        }
    };

    const handleEditClick = (project) => {
        setNewProject({
            title: project.title || '',
            description: project.description || '',
            imageUrl: project.image_url || '',
            techStack: project.tech_stack || '',
            sourceUrl: project.source_url || '',
            demoUrl: project.demo_url || '',
            githubUrl: project.github_url || '',
            price: (project.price || '0').toString()
        });
        setEditingId(project.id);
        setIsFormOpen(true);
        setFormError('');
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormError('');
        setNewProject({
            title: '',
            description: '',
            imageUrl: '',
            techStack: '',
            sourceUrl: '',
            demoUrl: '',
            githubUrl: '',
            price: '0'
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) fetchProjects();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-dark-lighter p-6 rounded-2xl border border-white/5">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Briefcase className="text-primary" size={24} />
                        Project Manager
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Add or manage your showcased works</p>
                </div>
                <button
                    onClick={isFormOpen ? handleCancel : () => setIsFormOpen(true)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all transform hover:-translate-y-1 shadow-lg ${isFormOpen ? 'bg-slate-700 hover:bg-slate-600 shadow-slate-900/20' : 'bg-primary hover:bg-primary/80 shadow-primary/20'}`}
                >
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                    {isFormOpen ? 'Cancel Action' : 'Upload Project'}
                </button>
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="overflow-hidden"
                    >
                        <form onSubmit={handleAdd} className="glass p-8 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {/* ... (rest of the form content is handled by the multi-replace) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Project Title</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 text-white"
                                    placeholder="e.g. AI Portfolio Dashboard"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Project Image</label>
                                <div className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 text-white pr-10"
                                            placeholder="Image URL or upload below..."
                                            value={newProject.imageUrl}
                                            onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                                        />
                                    </div>
                                    <label className="cursor-pointer bg-white/5 border border-white/10 hover:border-primary/50 rounded-xl px-4 flex items-center justify-center transition-all group">
                                        <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                        {uploading ? (
                                            <Activity size={20} className="text-primary animate-spin" />
                                        ) : (
                                            <Plus size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                                        )}
                                    </label>
                                </div>
                                {newProject.imageUrl && (
                                    <div className="mt-4 relative group w-full h-48 rounded-xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                                        <img
                                            src={newProject.imageUrl}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20"
                                        />
                                        <img
                                            src={newProject.imageUrl}
                                            alt="Preview"
                                            className="relative z-10 max-w-full max-h-full object-contain"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <button
                                                type="button"
                                                onClick={() => setNewProject({ ...newProject, imageUrl: '' })}
                                                className="p-3 bg-red-500 text-white rounded-xl shadow-xl transform scale-90 group-hover:scale-100 transition-all font-bold flex items-center gap-2"
                                            >
                                                <Trash2 size={18} />
                                                Remove Image
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-slate-300">Description</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 text-white min-h-[100px]"
                                    placeholder="Brief overview of the project..."
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-slate-300">Tech Stack (comma separated)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 text-white"
                                    placeholder="React, Node.js, PostgreSQL, Tailwind"
                                    value={newProject.techStack}
                                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <Github size={16} className="text-slate-400" />
                                    GitHub Link
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 text-white"
                                    placeholder="https://github.com/..."
                                    value={newProject.githubUrl}
                                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Source Link (e.g. Google Drive)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 text-white"
                                    placeholder="https://drive.google.com/..."
                                    value={newProject.sourceUrl}
                                    onChange={(e) => setNewProject({ ...newProject, sourceUrl: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Demo Link (Live Preview)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 text-white"
                                    placeholder="https://your-demo.com"
                                    value={newProject.demoUrl}
                                    onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-slate-300">Price (USD) - Set to 0 for Free</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-8 focus:outline-none focus:border-primary/50 text-white"
                                        placeholder="0.00"
                                        value={newProject.price}
                                        onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            {formError && (
                                <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                                    <Activity size={18} className="animate-pulse" />
                                    {formError}
                                </div>
                            )}

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-primary hover:bg-primary/80 px-8 py-4 rounded-2xl text-white font-bold transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/20"
                                >
                                    <Send size={20} />
                                    {editingId ? 'Update Project Details' : 'Publish Project'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <motion.div
                        layout
                        key={project.id}
                        className="glass-card rounded-2xl border border-white/10 overflow-hidden group h-full flex flex-col"
                    >
                        <div className="h-48 relative bg-white/5">
                            {project.image_url ? (
                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600 italic text-xs">
                                    No Image Uploaded
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button
                                    onClick={() => handleEditClick(project)}
                                    className="p-3 bg-white/10 text-white rounded-xl hover:bg-primary hover:scale-110 transition-all backdrop-blur-md border border-white/20"
                                    title="Edit Project"
                                >
                                    <Edit size={20} />
                                </button>
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/10 text-white rounded-xl hover:bg-[#333] hover:scale-110 transition-all backdrop-blur-md border border-white/20"
                                        title="View on GitHub"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white hover:scale-110 transition-all border border-red-500/20"
                                    title="Delete Project"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.split(',').map((tech, idx) => (
                                    <span key={idx} className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const BlogEditor = () => {
    const [title, setTitle] = useState('');
    const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
    const [markdown, setMarkdown] = useState('# New Blog Post\n\nWrite your content here...');
    const [preview, setPreview] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [editingId, setEditingId] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/blog');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Fetch posts error:', error);
        } finally {
            setLoadingPosts(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleEdit = (post) => {
        setEditingId(post.id);
        setTitle(post.title);
        setMarkdown(post.content);
        setPublishedDate(new Date(post.display_date).toISOString().split('T')[0]);
        setPreview(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setMarkdown('# New Blog Post\n\nWrite your content here...');
        setPublishedDate(new Date().toISOString().split('T')[0]);
        setStatus({ type: '', message: '' });
    };

    const handlePublish = async () => {
        if (!title.trim() || !markdown.trim()) {
            setStatus({ type: 'error', message: 'Title and content are required' });
            return;
        }

        setPublishing(true);
        setStatus({ type: '', message: '' });

        try {
            const url = editingId
                ? `/api/blog/${editingId}`
                : '/api/blog';

            const response = await fetch(url, {
                method: editingId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content: markdown, date: publishedDate }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: editingId ? 'Blog post updated!' : 'Blog post published!' });
                if (!editingId) {
                    setTitle('');
                    setMarkdown('# New Blog Post\n\nWrite your content here...');
                }
                setEditingId(null);
                setPreview(false);
                fetchPosts();
            } else {
                const errorData = await response.json();
                setStatus({ type: 'error', message: errorData.error || 'Failed to save blog post' });
            }
        } catch (error) {
            console.error('Publish error:', error);
            setStatus({ type: 'error', message: 'Network error. Please try again.' });
        } finally {
            setPublishing(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this blog post?')) return;
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) fetchPosts();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="space-y-12">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-secondary" size={24} />
                        Blog Editor
                    </h2>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                        <button
                            type="button"
                            onClick={() => setPreview(false)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!preview ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreview(true)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${preview ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Preview
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium text-slate-400 uppercase tracking-widest">Article Title</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-secondary/50 text-white text-lg font-bold"
                                placeholder="Enter catchy title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="md:w-64 space-y-2">
                            <label className="text-sm font-medium text-slate-400 uppercase tracking-widest">Publish Date</label>
                            <input
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-secondary/50 text-white font-bold"
                                value={publishedDate}
                                onChange={(e) => setPublishedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="glass rounded-2xl border border-white/10 overflow-hidden min-h-[500px] flex flex-col">
                        {preview ? (
                            <div className="p-8 prose prose-invert max-w-none text-slate-300 overflow-y-auto">
                                <ReactMarkdown>{markdown}</ReactMarkdown>
                            </div>
                        ) : (
                            <textarea
                                className="flex-1 w-full bg-transparent p-8 text-white focus:outline-none font-mono resize-none min-h-[400px]"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                placeholder="# Write your markdown content here..."
                            />
                        )}

                        <div className="p-4 border-t border-white/5 bg-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            {status.message && (
                                <div className={`text-sm px-4 py-2 rounded-lg ${status.type === 'success' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {status.message}
                                </div>
                            )}
                            <div className="flex gap-4 ml-auto">
                                {editingId && (
                                    <button
                                        onClick={handleCancelEdit}
                                        className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all font-bold"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    onClick={handlePublish}
                                    disabled={publishing}
                                    className={`flex items-center gap-2 ${editingId ? 'bg-primary' : 'bg-secondary'} hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl text-white font-bold transition-all`}
                                >
                                    {publishing ? <Activity size={18} className="animate-spin" /> : (editingId ? <Edit size={18} /> : <Plus size={18} />)}
                                    {publishing ? (editingId ? 'Updating...' : 'Publishing...') : (editingId ? 'Update Article' : 'Publish Article')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Existing Posts List */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity size={20} className="text-primary" />
                    Manage Published Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loadingPosts ? (
                        <div className="col-span-full py-12 flex justify-center">
                            <Activity size={32} className="animate-spin text-primary opacity-50" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-slate-500 italic glass rounded-2xl border border-white/5">
                            No articles published yet.
                        </div>
                    ) : posts.map(post => (
                        <motion.div
                            layout
                            key={post.id}
                            className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                        {new Date(post.display_date).toLocaleDateString()}
                                    </span>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="p-2 text-slate-400 hover:text-primary transition-colors"
                                            title="Edit Post"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            title="Delete Post"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">{post.title}</h4>
                                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-6">
                                    {post.content.replace(/[#*`]/g, '')}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-xs text-slate-500 italic">ID: #{post.id}</span>
                                <span className="text-xs font-bold text-secondary uppercase tracking-widest">Published</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const InquiryTracker = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/inquiries');
            const data = await response.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }
        } catch (error) {
            console.error('Fetch messages error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this inquiry?')) return;
        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) fetchMessages();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleReply = (email) => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="text-accent" size={24} />
                Inquiry Tracker
            </h2>

            <div className="glass rounded-2xl border border-white/10 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Sender</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Message</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                                    <div className="flex items-center justify-center gap-2">
                                        <Activity size={18} className="animate-spin text-primary" />
                                        Loading messages...
                                    </div>
                                </td>
                            </tr>
                        ) : messages.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500 italic">
                                    No inquiries found.
                                </td>
                            </tr>
                        ) : messages.map(msg => (
                            <tr key={msg.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <p className="text-white font-medium">{msg.name}</p>
                                    <p className="text-slate-500 text-xs">{msg.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-slate-300 text-sm max-w-md">{msg.message}</p>
                                </td>
                                <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleReply(msg.email)}
                                            className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/10"
                                            title="Reply via Email"
                                        >
                                            <Send size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                                            title="Delete Inquiry"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const OverviewStats = () => {
    const [stats, setStats] = useState({ totalProjectViews: 0, recentBlogComments: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats');
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}`);
                }
                const data = await response.json();
                // Ensure data has the expected structure
                setStats({
                    totalProjectViews: data.totalProjectViews ?? 0,
                    recentBlogComments: data.recentBlogComments ?? 0
                });
            } catch (error) {
                console.error('Fetch stats error:', error);
                // Keep default stats on error instead of overriding with error object
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
                title="Total Project Views"
                value={(stats?.totalProjectViews || 0).toLocaleString()}
                icon={Eye}
                color="bg-primary text-primary"
            />
            <StatCard
                title="Recent Blog Comments"
                value={(stats?.recentBlogComments || 0).toString()}
                icon={MessageCircle}
                color="bg-secondary text-secondary"
            />
            <StatCard
                title="System Uptime"
                value="99.9%"
                icon={Activity}
                color="bg-accent text-accent"
            />
        </div>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [dbStatus, setDbStatus] = useState('active'); // Default to active to avoid flicker
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const response = await fetch(`/api/health?t=${Date.now()}`);
                if (!response.ok) throw new Error();
                const data = await response.json();
                setDbStatus(data.status);
            } catch {
                setDbStatus('inactive');
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-dark-darker flex relative">
            {/* ... rest of the component content ... */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-lighter border-b border-white/5 p-4 flex items-center justify-between">
                <h1 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity size={20} className="text-primary" />
                    Command Center
                </h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-white/5 rounded-xl text-white"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                )}
            </AnimatePresence>

            <aside className={`
                w-64 bg-dark-lighter border-r border-white/5 flex flex-col p-6 fixed inset-y-0 left-0 z-[70] transition-transform duration-300 transform
                lg:translate-x-0 lg:sticky lg:h-screen
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="mb-12 hidden lg:block">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Activity size={20} className="text-primary" />
                        </div>
                        Command <span className="text-primary">Center</span>
                    </h1>
                </div>

                <nav className="space-y-2 flex-1 mt-16 lg:mt-0">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'projects', label: 'Projects', icon: Briefcase },
                        { id: 'blog', label: 'Blog Editor', icon: FileText },
                        { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/5 rounded-xl transition-all font-medium mt-auto">
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto mt-16 lg:mt-0">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white capitalize">{activeTab}</h2>
                            <p className="text-slate-400 mt-1 text-sm md:text-base">Manage your professional ecosystem</p>
                        </div>
                        <div className="flex items-center gap-4 bg-dark-lighter p-2 rounded-2xl border border-white/5 self-end md:self-auto">
                            <div className="text-right px-4">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">System Health</p>
                                <div className={`flex items-center justify-end gap-2 text-xs md:text-sm font-medium mt-0.5 ${dbStatus === 'active' ? 'text-primary' : 'text-red-500'}`}>
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${dbStatus === 'active' ? 'bg-primary' : 'bg-red-500'}`} />
                                    {dbStatus === 'active' ? 'PostgreSQL Active' : 'PostgreSQL Inactive'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'overview' ? (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <OverviewStats />
                            <InquiryTracker />
                        </div>
                    ) : activeTab === 'projects' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ProjectManager />
                        </div>
                    ) : activeTab === 'blog' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <BlogEditor />
                        </div>
                    ) : activeTab === 'inquiries' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <InquiryTracker />
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
