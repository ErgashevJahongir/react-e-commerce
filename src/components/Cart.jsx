import React from 'react';
import { useDispatch } from 'react-redux';
import { addCart, delCart } from '../redux/action';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

export default function Cart() {
    const state = useSelector((state) => state.handleCart);

    const dispatch = useDispatch();

    const handleButton = (product, nam) => {
        if (nam > 0) {
            dispatch(addCart(product));
        } else if (nam < 0) {
            dispatch(delCart(product));
        }
    };

    return (
        <>
            {state.map((product) => (
                <div className="container" key={product.id}>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                height="200px"
                                width="180px"
                            />
                        </div>
                        <div className="col-md-4">
                            <h3>{product.title}</h3>
                            <p className="lead fw-bold">
                                {product.qty} X $ {product.price} = $
                                {product.qty * product.price}
                            </p>
                            <button
                                className="btn btn-outline-dark me-4"
                                onClick={() => handleButton(product, 1)}
                            >
                                <PlusLg />
                            </button>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => handleButton(product, -1)}
                            >
                                <DashLg />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
