import React from 'react';
import { BoxArrowInRight, PersonPlusFill, Cart2 } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from './useContext/useAuth';

export const Navbar = () => {
    const state = useSelector((state) => state.handleCart);
    const { user } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4" to="/">
                        JOHA
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">
                                    Contact
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/books">
                                    Books
                                </NavLink>
                            </li>
                        </ul>
                        <div className="buttons">
                            {user ? (
                                <NavLink
                                    to="/"
                                    className="btn btn-outline-dark button"
                                >
                                    <BoxArrowInRight className="me-1"></BoxArrowInRight>
                                    Log out {user}
                                </NavLink>
                            ) : (
                                <div style={{ display: 'flex' }}>
                                    <NavLink
                                        to="/login"
                                        className="btn btn-outline-dark button"
                                    >
                                        <BoxArrowInRight className="me-1"></BoxArrowInRight>
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className="btn btn-outline-dark ms-2 button"
                                    >
                                        <PersonPlusFill className="me-1"></PersonPlusFill>
                                        Register
                                    </NavLink>
                                </div>
                            )}
                            <NavLink
                                to="/cart"
                                className="btn btn-outline-dark ms-2 button"
                            >
                                <Cart2 className="me-1"></Cart2>
                                Cart ({state.length})
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
