import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './useContext/useAuth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { siginIn } = useAuth();

    const fromPage = location.state?.from?.pathname || '/';
    console.log(fromPage);

    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        setRedirect(true);
        const form = e.target;
        const user = form.username.value;
        siginIn(user, () => navigate(fromPage, { replace: true }));
        console.log(name, email, password);
    };

    if (redirect) {
        return <Link to="/login" />;
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div className="form-floating">
                    <input
                        className="form-control"
                        id="floatingInputName"
                        placeholder="Name"
                        name="username"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <label htmlFor="floatingInputName">Full Name</label>
                </div>
                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </main>
    );
};

export default Register;
