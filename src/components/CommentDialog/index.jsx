import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "./style.css"

const CommentDialog = ({ postId, onClose }) => {
    const userId = localStorage.getItem('user_id');
    const businessName = localStorage.getItem('business_name');
    const isBusiness = localStorage.getItem("isBusiness")
    const userUsername = useSelector((state) => state.user.username);
    const username = isBusiness ? businessName : userUsername

    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://connectify-server-b31a.onrender.com/comments/post/${postId}`);
            const commentsData = response.data;
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://connectify-server-b31a.onrender.com/comments/add`, {
                user_id: userId,
                post_id: postId,
                comment_username: username,
                comment_content: commentInput,
            });
            fetchComments();
            setCommentInput('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="dialog-container" role="dialog-container">
            <div className="comment-dialog">
                <form className="comment-form" onSubmit={handleCommentSubmit} role="comment-form">
                    <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add a comment..."
                        required
                    />
                    <button type="submit">Add</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </form>
                <h4>All Comments: </h4>
                {comments.length > 0 ? (
                    comments.map(({ comment_username, comment_content, comment_id }) => (
                        <div key={comment_id} className={`comment ${comment_username === businessName ? 'business-comment' : ''}`}
                        >
                            <p className="comment-content">{comment_content}</p>
                            <p className="comment-username">{comment_username}</p>

                        </div>
                    ))
                ) : (
                    <p>No comments available</p>
                )}
            </div>
        </div>
    );
};

export default CommentDialog;
