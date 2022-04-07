import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './components/useContext/AuthProvider';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <Auth0Provider
                        domain="dev-qs5j5cbh.us.auth0.com"
                        clientId="qcoIcmunSKJlxVxYTqSLLMiH3gAwW06t"
                        redirectUri={window.location.origin}
                    >
                        <App />
                    </Auth0Provider>
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
