import { useState, useEffect } from 'react';
import { Spinner } from '../../components';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setEmails, setCompanyName, setCompanyEmail } from '../../actions';
import { AvatarSelector } from '../../components';
import ProfileImage from '../../assets/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpeg';
import './style.css';
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

const Profile = () => {
	const [updateUserProfile, setUpdateUserProfile] = useState({
		userId: '',
		userName: '',
		userEmail: '',
		userPassword: '',
		deleteProfileId: '',
		loaded: false,
		message: '',
		deleteMessage: '',
		showSuccess: '',
	});

	const username = useSelector((state) => state.user.username);
	const email = useSelector((state) => state.user.email);
	const companyName = useSelector((state) => state.business.companyName);
	const companyEmail = useSelector((state) => state.business.companyEmail);

	const dispatch = useDispatch();
	const { userName, userEmail, userPassword, message, loaded, deleteProfileId, showPassword } = updateUserProfile;

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				setUpdateUserProfile((prevState) => ({
					...prevState,
					deleteProfileId: decodedToken.user_id,
				}));
			} catch (error) {
				console.log('Error decoding token:', error);
			}
		}
	}, []);

	const userNameHandler = (e) => {
		setUpdateUserProfile((prevState) => ({
			...prevState,
			userName: e.target.value,
		}));
	};

	const userEmailHandler = (e) => {
		setUpdateUserProfile((prevState) => ({
			...prevState,
			userEmail: e.target.value,
		}));
	};

	const userPasswordHandler = (e) => {
		setUpdateUserProfile((prevState) => ({
			...prevState,
			userPassword: e.target.value,
		}));
	};
	/* c8 ignore start */
	const updateProfile = async (id) => {
		if (userName && userEmail && userPassword) {
			try {
				const data = {
					user_username: userName,
					user_email: userEmail,
					user_password: userPassword,
				};
				console.log(data);

				const response = await axios.patch(`http://127.0.0.1:5000/users/update/${id}`, data, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});

				if (response.status === 201 || response.status === 200) {
					setUpdateUserProfile((prevState) => ({
						...prevState,
						message: 'User profile updated successfully',
					}));

					setTimeout(() => {
						setUpdateUserProfile((prevState) => ({
							...prevState,
							message: '',
						}));
					}, 800);

					setUpdateUserProfile((prevState) => ({
						...prevState,
						loaded: true,
					}));

					setTimeout(() => {
						setUpdateUserProfile((prevState) => ({
							...prevState,
							loaded: false,
						}));
					}, 800);

					dispatch(setUsername(data.user_username));
					dispatch(setEmails(data.user_email));
				} else {
					throw new Error('There was a problem in updating your profile.');
				}
			} catch (error) {
				setUpdateUserProfile((prevState) => ({
					...prevState,
					message: error.message,
				}));

				setTimeout(() => {
					setUpdateUserProfile((prevState) => ({
						...prevState,
						loaded: false,
					}));
				}, 500);
			}
		} else {
			setUpdateUserProfile((prevState) => ({
				...prevState,
				message: 'Please enter your profile',
			}));

			setTimeout(() => {
				setUpdateUserProfile((prevState) => ({
					...prevState,
					loaded: false,
					message: '',
				}));
			}, 5000);
		}
	};

	const clearInputHandler = () => {
		setUpdateUserProfile((prevState) => ({
			...prevState,
			userEmail: '',
		}));
		setUpdateUserProfile((prevState) => ({
			...prevState,
			userName: '',
		}));
		setUpdateUserProfile((prevState) => ({
			...prevState,
			userPassword: '',
		}));
	};

	const updateProfileSubmitHandler = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const decodedToken = jwtDecode(token);
		updateProfile(decodedToken.user_id);
		clearInputHandler();
	};
	const showPasswordHandler = () => {
		setUpdateUserProfile((prevState) => ({
			...prevState,
			showPassword: !prevState.showPassword,
		}));
	};

	const deleteProfile = async (id) => {
		try {
			await axios.delete(`http://127.0.0.1:5000/users/delete/${id}`);
			setUpdateUserProfile((prevState) => ({
				...prevState,
				loaded: true,
			}));
			setTimeout(() => {
				setUpdateUserProfile((prevState) => ({
					...prevState,
					message: 'Profile has been deleted successfully',
				}));
			}, 500);
			setTimeout(() => {
				localStorage.clear();
				window.location.href = '/';
			}, 1000);
		} catch (error) {
			if (error.response) {
				setUpdateUserProfile((prevState) => ({
					...prevState,
					message: error.response.data.message,
				}));
			} else {
				setUpdateUserProfile((prevState) => ({
					...prevState,
					message: error.message,
				}));
			}
		}
	};
	/* c8 ignore end */
	useEffect(() => {
		const intro = introJs();
		intro.setOptions({
			steps: [
				{ element: '.edit-profile', intro: 'Welcome to your profile! This is the edit profile section.' },
				{ element: '.avatar-selector', intro: 'This is where you can view your avatar.' },
				{ element: '.form-edit-profile', intro: 'This is where you can update and delete your account.' },
			],
		});
		intro.start();
	}, []);
	return (
		<>
			<div className="edit-profile-container">
				<h1 className="edit-profile heading">Edit Your Profile</h1>
				<div className="form-picture-container">
					<div className="avatar-selector">
						<AvatarSelector />
						<div className="user-details">
							<p className="edit-profile-username-email">
								<strong>Username:</strong> {username} {companyName}
							</p>
							<p className="edit-profile-username-email">
								<strong>Email:</strong> {email} {companyEmail}
							</p>
						</div>
					</div>
					<div className="form-edit-profile">
						<div className="form-edit-user-profile">
							<div className="date-add-journal-container">
								<label className="date-label">Username</label>
								<input className="add-journal-text" onChange={userNameHandler} type="text" value={userName} />
							</div>

							<div className="date-add-journal-container">
								<label className="title-label">Email</label>
								<input className="add-journal-text" onChange={userEmailHandler} type="email" value={userEmail} required />
							</div>
							<div className="date-add-journal-container">
								<label className="content-label">Password</label>
								<div className="show-hide-password-edit-container">
									<input className="add-journal-text" onChange={userPasswordHandler} type="password" value={userPassword} />
								</div>
							</div>

							<div className="add-journal-button-container2">
								<button className="add-journal-button" onClick={updateProfileSubmitHandler}>
									Update My Profile
								</button>
								<button className="add-journal-button" onClick={() => deleteProfile(deleteProfileId)}>
									Delete Account
								</button>
							</div>
						</div>
					</div>
				</div>

				{loaded && (
					<div className="spinner-journal">
						<Spinner />
					</div>
				)}
				<p className="profile-messages">{message}</p>
			</div>
		</>
	);
};

export default Profile;
