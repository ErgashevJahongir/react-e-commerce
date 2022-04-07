import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from './../../redux/action';

const Book = () => {
    const [books, setBooks] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    const goBack = () => {
        navigate(-1);
    };
    const goHome = () => {
        navigate('/', { replace: true });
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(
                `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=TAKGjoYUfEqgG9AbgQ9YGFrISeGIzmN0`
            );

            setBooks(res.data.results.books);
        };

        fetchBooks();
    }, []);
    return (
        <div className="container book">
            {books.map((book) => {
                const {
                    author,
                    book_image,
                    buy_links,
                    description,
                    primary_isbn10,
                    publisher,
                    rank,
                    price,
                    title,
                } = book;

                return (
                    parseInt(id) === parseInt(rank) && (
                        <article key={rank}>
                            <div className="row">
                                <div className="col-md-6 mt-4 d-flex align-items-center justify-content-center">
                                    <img
                                        className="book__image"
                                        src={book_image}
                                        alt={title}
                                    />
                                </div>
                                <div className="col-md-6 mt-4">
                                    <h4 className="text-uppercase text-black-50 mt-2">
                                        Books
                                    </h4>
                                    <h3 className="mt-2 mb-2 display-5">
                                        {title}
                                    </h3>
                                    <p className="lead">{description}</p>

                                    <ul className="mt-2 mb-2">
                                        <li>
                                            <span className="fw-bold">
                                                Author:{' '}
                                            </span>
                                            {author}
                                        </li>
                                        <li>
                                            <span className="fw-bold">
                                                Publisher:{' '}
                                            </span>
                                            {publisher}
                                        </li>
                                        <li>
                                            <span className="fw-bold">
                                                ISBN:{' '}
                                            </span>
                                            {primary_isbn10}
                                        </li>
                                    </ul>
                                    <p className="mt-3 fs-4">
                                        <span className="fw-bold">Price: </span>
                                        {Math.abs(price) === 0 ? (
                                            <span className="fw-bold text-danger">
                                                Not on Sale
                                            </span>
                                        ) : (
                                            { price }
                                        )}
                                    </p>
                                    {Math.abs(price) !== 0 && (
                                        <div>
                                            <button
                                                className="btn btn-outline-dark px-4 py-2"
                                                onClick={() => addProduct(book)}
                                            >
                                                Add to Cart
                                            </button>
                                            <NavLink
                                                to="/cart"
                                                className="btn btn-outline-dark ms-2 px-4 py-2"
                                            >
                                                Go to Cart
                                            </NavLink>
                                        </div>
                                    )}
                                    {Math.abs(price) === 0 && (
                                        <ul className="mt-3 mb-2">
                                            <li>
                                                <h5 className="fw-bold lead">
                                                    Buy Now From Other Stores
                                                </h5>
                                            </li>
                                            {buy_links.map((link) => {
                                                const { name, url } = link;
                                                return (
                                                    <div key={name}>
                                                        <a href={url}>
                                                            {name}{' '}
                                                            <BiLinkExternal />
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="text-center mt-5">
                                <button
                                    className="btn btn-info btn-outline-dark"
                                    onClick={goBack}
                                >
                                    Go Back
                                </button>
                                <button
                                    className="btn btn-danger btn-outline-dark ms-3"
                                    onClick={goHome}
                                >
                                    Go Home
                                </button>
                            </div>
                        </article>
                    )
                );
            })}
        </div>
    );
};

export default Book;
