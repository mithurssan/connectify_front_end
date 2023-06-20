import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentDialog } from '../'
import './style.css';

const Posts = ({ posts }) => {
    const businessName = useSelector((state) => state.business.companyName);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const latestPostsFirst = [...posts].reverse();

    const handleCommentButtonClick = (postId) => {
        setSelectedPostId(postId);
        setDialogVisible(true);
    };

    return (
        <div className="posts-container">
            {latestPostsFirst.map((post, index) => (
                <div key={index} className="post">
                    <h3 className="post-title">{post.post_title}</h3>
                    <p className="post-content">{post.post_content}</p>
                    <p className={`post-author ${post.username === businessName ? 'red-text' : ''}`}>
                        {post.username}
                    </p>
                    <p className="post-votes">Votes: {post.post_upvotes}</p>
                    <button className='comments-btn' onClick={() => handleCommentButtonClick(post.post_id)}>Comments</button>
                </div>
            ))}
            {dialogVisible && (
                <CommentDialog
                    postId={selectedPostId}
                    onClose={() => setDialogVisible(false)}
                />
            )}
        </div>
    );
};

export default Posts;
