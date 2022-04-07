import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './useContext/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { siginIn } = useAuth();

    const fromPage = location.state?.from?.pathname || '/';
    console.log(fromPage);

    const userFetch = async () => {
        const res = await fetch('http://localhost:5000/users');
        const data = await res.json();
        return data;
    };

    useEffect(() => {
        const usersServers = async () => {
            const usersServer = await userFetch();

            setUsers(usersServer);
        };

        usersServers();
    }, []);

    const handleSabmit = async (event) => {
        event.preventDefault();

        // const usersFromServer = await userFetch();
        // setUsers(usersFromServer);

        console.log(users);

        users.map((user) => {
            if (user.email === email && user.password === password) {
                console.log(user);
                siginIn(user.name, () => navigate(fromPage));
            } else {
                navigate('/login');
            }
        });
    };

    return (
        <div className="container text-center d-flex justify-content-center align-items-center login">
            <main className="form-signin">
                <form onSubmit={handleSabmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Login;
