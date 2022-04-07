import React, { useState } from 'react';

export const ProductFilter = ({ setSearchParams, postQuery }) => {
    const [search, setSearch] = useState(postQuery);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const query = form.search.value;

        const params = {};

        if (query.length) params.post = query;
        console.log(params);

        setSearchParams(params);
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit} className="d-flex">
            <input
                type="search"
                name="search"
                value={search}
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}
            />
            <input
                type="submit"
                value="Search"
                className="btn btn-outline-dark"
            />
        </form>
    );
};
