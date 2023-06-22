import { LoginBusinessVerify } from '../../pages';
import './style.css';

const LoginPageVerify = () => {
	return (
		<div className="login-wrapper">
			<div className={'mainContent'}>
				<div className="topbar topbar-ver">
					<div className="signup-box">
						<p className={'sign-in-focused'}>SIGN IN</p>
					</div>
				</div>
				{<LoginBusinessVerify />}
			</div>
		</div>
	);
};

export default LoginPageVerify;
