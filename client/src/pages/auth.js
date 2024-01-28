export const Auth = () => {
    return <div className="auth">
        <Login />
        <Register />
    </div>
};

// don't put in components folder because not shared between pages/only used in auth page
const Login = () => {
    return <div>Log in</div>;
};

const Register = () => {
    return <div className="auth-container">
        <form>
            <h2>Register</h2>
        </form>
    </div>;
};