import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./style.css"

const PostForm = ({ onAddPost }) => {
    const username = useSelector((state) => state.user.username);
    const businessName = useSelector((state) => state.business.companyName);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setContent('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPost({ title, content });
        handleClose();
    };

    return (
        <div>
            <button className="create-post-button" onClick={handleOpen} role="create-post-btn">
                Create Post
            </button>
            {open && (
                <div className="dialog-container">
                    <form onSubmit={handleSubmit} className="dialog-form">
                        <h2 className="dialog-title">Create Post</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="dialog-input"
                            required
                        />
                        <textarea
                            placeholder="enter post here (1000 characters max)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="dialog-textarea"
                            rows={15}
                            required
                        ></textarea>
                        <div className="dialog-actions">
                            <button type="button" className="cancel-button" onClick={handleClose}>
                                Cancel
                            </button>
                            <button type="submit" className="share-button" role="share-post-btn">
                                Share
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostForm;
