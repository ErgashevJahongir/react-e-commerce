import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ProductFilter } from './ProductFilter';

export const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    const [searchParams, setSearchParams] = useSearchParams();
    const postQuery = searchParams.get('post') || '';

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }

            return () => {
                componentMounted = false;
            };
        };
        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        );
    };

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    };

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-between mb-5 pb-5">
                    <ProductFilter
                        postQuery={postQuery}
                        setSearchParams={setSearchParams}
                    />
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-outline-dark me-2"
                            onClick={() => setFilter(data)}
                        >
                            All
                        </button>
                        <button
                            className="btn btn-outline-dark me-2"
                            onClick={() => filterProduct("men's clothing")}
                        >
                            Men's Clothing
                        </button>
                        <button
                            className="btn btn-outline-dark me-2"
                            onClick={() => filterProduct("women's clothing")}
                        >
                            Women's Clothing
                        </button>
                        <button
                            className="btn btn-outline-dark me-2"
                            onClick={() => filterProduct('jewelery')}
                        >
                            Jewelery
                        </button>
                        <button
                            className="btn btn-outline-dark me-2"
                            onClick={() => filterProduct('electronics')}
                        >
                            Electronic
                        </button>
                    </div>
                </div>
                {filter
                    .filter((post) =>
                        post.title.toLowerCase().includes(postQuery)
                    )
                    .map((product) => {
                        return (
                            <div className="col-md-3" key={product.id}>
                                <div
                                    className="card h-100 text-center p-4"
                                    key={product.id}
                                >
                                    <img
                                        src={product.image}
                                        className="card-img-top"
                                        alt={product.title}
                                        height="250px"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">
                                            {product.title.substring(0, 20)}
                                        </h5>
                                        <p className="card-text lead fw-bold">
                                            {product.price} $
                                        </p>
                                        <NavLink
                                            to={`/products/${product.id}`}
                                            className="btn btn-primary"
                                        >
                                            Buy Now
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">
                            Latest Products
                        </h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};
