import './App.css';
import { Home } from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Products } from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout';
import Register from './components/Register';
import { RequireAuth } from './components/useContext/RequireAuth';
import Books from './components/Books/Books';
import Book from './components/Books/Book';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<Product />} />
                    <Route
                        path="cart"
                        element={
                            <RequireAuth>
                                <Cart />
                            </RequireAuth>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="about" element={<About />} />
                    <Route path="books" element={<Books />} />
                    <Route path="books/:id" element={<Book />} />
                    <Route
                        path="about-as"
                        element={<Navigate to="/about" replace />}
                    />
                    <Route path="contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
