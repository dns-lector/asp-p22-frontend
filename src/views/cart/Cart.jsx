import { useContext, useEffect, useState } from 'react';
import './Cart.css'
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';

export default function Cart() {
    const {request, token} = useContext(AppContext);

    const [cart, setCart] = useState({cartDetails: []});

    useEffect(() => {
        if(token) {
            request("/api/cart")
            .then( setCart )
            .catch( console.error );
        }
    }, [token]);

    return <>
        <h1>Мій кошик</h1>
        {!token && <h2>Авторизуйтесь для перегляду кошику</h2>}
        {!!token && <div>
            <h2>Товари у кошику:</h2>
            {cart.cartDetails.map(cd => <CartDetails cartItem={cd}/> )}
            <div className="row">
                <div className="offset-6 col-lg-3 col-md-4 col-sm-5">
                    Загальна вартість замовлення, ₴:
                </div>
                <div className="col-1">
                    <b>{cart.price}</b>
                </div>             
            </div>

            <div className="row">
                <div className="offset-7 col-lg-3 col-md-4 col-sm-5 text-end">
                    {(cart.momentCancel != null || cart.momentBuy != null) && (
                        <button className="btn btn-success">Повторити</button>
                    )}
                    {!(cart.momentCancel != null || cart.momentBuy != null) && <>
                        <button className="btn btn-danger">Скасувати</button>
                        <button className="btn btn-success">Придбати</button>
                    </> }
                </div>
            </div>
        </div>}
    </>;
}

function CartDetails({cartItem}) {
    const incClick = () => {
        console.log("inc " + cartItem.id);
    }
    const decClick = () => {
        console.log("dec " + cartItem.id);
    }
    const deleteClick = () => {
        console.log("delete " + cartItem.id);
    }

    return <>
        <div className="row cart-detail">
            <div className="col-1">
                <Link to={"/product/" + (cartItem.product.slug || cartItem.product.id)}>
                    <img src={cartItem.product.imagesCsv.split(',')[0] }/>
                </Link>
            </div>
            <div className="col-2">{cartItem.product.name}</div>
            <div className="col-3">{cartItem.product.description}</div>
            <div className="col-1">{cartItem.product.price}</div>
            <div className="col-lg-2 col-md-3 col-sm-4">
                <button onClick={deleteClick} className="btn btn-outline-danger">x</button>
                <button onClick={decClick} className="btn btn-outline-warning">-</button>        
                <span className="editable-cnt" contentEditable="true">{cartItem.cnt}</span>        
                <button onClick={incClick} className="btn btn-outline-success">+</button>
            </div>
            <div className="col-1">{cartItem.price}</div>
        </div>
    </>;
}
