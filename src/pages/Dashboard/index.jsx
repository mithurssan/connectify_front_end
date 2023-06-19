import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AddUserForm, DashboardIcons, PostForm } from '../../components';
import { Link } from 'react-router-dom';
import rota_icon from '../../assets/rota-icon.png';
import messages_icon from '../../assets/messages-icon.png';
import planner_icon from '../../assets/planner-icon.png';
import bookings_icon from '../../assets/bookings-icon.png';
import "./style.css"

const Dashboard = () => {
	const username = useSelector((state) => state.user.username);
	const businessName = useSelector((state) => state.business.companyName);
	const isBusiness = localStorage.getItem("isBusiness")
	const businessId = localStorage.getItem("business_id")
	const userId = localStorage.getItem("user_id")
	const [currentUsername, setCurrentUsername] = useState("");
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		try {
			const response = await axios.get(`http://127.0.0.1:5000/posts/get/${businessId}`);
			const data = response.data;
			setPosts(data);
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	const fetchUsername = async (userId) => {
		try {
			const response = await axios.get(`http://127.0.0.1:5000/users/${userId}`);
			const data = response.data
			setCurrentUsername(data.user_username)
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	const fetchBusinessName = async (businessId) => {
		try {
			const response = await axios.get(`http://127.0.0.1:5000/businesses/${businessId}`);
			const data = response.data
			setCurrentUsername(data.business_name)
		} catch (error) {
			console.error('Error:', error.message);
		}
	};
	console.log(currentUsername)
	useEffect(() => {
		fetchPosts();
		isBusiness ? (fetchBusinessName(businessId)) : (fetchUsername(userId))
	}, []);

	const addPost = async (newPost) => {
		try {
			await axios.post('http://127.0.0.1:5000/posts/add', {
				user_id: userId,
				business_id: businessId,
				username: currentUsername,
				post_title: newPost.title,
				post_content: newPost.content,
			});
			fetchPosts();
		} catch (error) {
			console.error('Error adding post:', error);
		}
	};

	return (
		<>
			{isBusiness ? (
				<>
					<div className="welcome">
						<h1><span className="wave">👋</span>Welcome, {businessName}!</h1>
					</div>
				</>
			) : (
				<>
					<div className="welcome">
						<h1><span className="wave">👋</span>Welcome, {username}!</h1>
					</div>
				</>
			)}
			<div className="dashboard">
				<Link to="/rota">
					<DashboardIcons title="Rota" image={rota_icon} />
				</Link>
				<Link to="/chat">
					<DashboardIcons title="Messages" image={messages_icon} />
				</Link>
				<Link to="/wellbeing/journal" >
					<DashboardIcons title="Journal" image={planner_icon} />
				</Link>
				<Link to="/bookings">
					<DashboardIcons title="Bookings" image={bookings_icon} />
				</Link>
			</div>
			<div className="action-btns">
				<div className="add-user-btn">
					{isBusiness && <AddUserForm />}
				</div>
				<div className="add-post-btn">
					<PostForm onAddPost={addPost} />
				</div>
			</div>
			<div className="posts-container">
				{posts.map((post, index) => (
					<div key={index} className="post">
						<h3 className="post-title">{post.post_title}</h3>
						<p className="post-content">{post.post_content}</p>
						<p className={`post-author ${post.username === businessName ? 'red-text' : ''}`}>
							{post.username}
						</p>
					</div>
				))}
			</div>
		</>
	);
};

export default Dashboard;
