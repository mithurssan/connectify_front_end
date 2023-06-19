import { LoginUserVerify } from '../../pages';
import './style.css';

const LoginUseVerify = () => {
	return (
		<div className="login-wrapper">
			<div className={'mainContent'}>
				<div className="topbar">
					<div className="signup-box">
						<p className={'sign-in-focused'}>SIGN IN</p>
					</div>
				</div>
				<LoginUserVerify />
			</div>
		</div>
	);
};

export default LoginUseVerify;
