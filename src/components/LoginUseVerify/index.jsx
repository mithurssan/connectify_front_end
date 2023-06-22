import { LoginUserVerify } from '../../pages';
import './style.css';

const LoginUseVerify = () => {
	return (
		<div className="login-wrapper">
			<div className={'mainContent'}>
				<div className="topbar topbar-ver">
					<div className="signup-box">
						<p className={'sign-in-focused sign-in-focused-ver'}>SIGN IN</p>
					</div>
				</div>
				<LoginUserVerify />
			</div>
		</div>
	);
};

export default LoginUseVerify;
