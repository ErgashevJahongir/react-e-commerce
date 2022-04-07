import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import BOOK_API from './../../../.env';

const Books = () => {
    const [books, setBooks] = useState([]);

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
        <section className="container">
            <h1 className="text-center pt-3 pb-3">Bestseller Books</h1>
            <div className="books">
                {books.map((book) => {
                    const { author, book_image, rank, price, title } = book;

                    return (
                        <article key={rank} className="tect-center">
                            <div className="img__card">
                                <img
                                    className="book__image"
                                    src={book_image}
                                    alt={title}
                                />
                            </div>

                            <div className="text-center">
                                <h3 className="mt-2 mb-2">{title}</h3>
                                <p>
                                    <span className="fw-bold">Author: </span>
                                    {author}
                                </p>
                                <p className="mb-2">
                                    <span className="fw-bold">Price: </span>
                                    {Math.abs(price) === 0 ? (
                                        <span className="text-danger fw-bold">
                                            Not on Sale
                                        </span>
                                    ) : (
                                        price
                                    )}
                                </p>
                            </div>
                            <div className="text-center">
                                <NavLink
                                    to={`/books/${rank}`}
                                    className="btn btn-primary mx-auto"
                                    style={{ color: 'white' }}
                                >
                                    Buy Now
                                </NavLink>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default Books;
