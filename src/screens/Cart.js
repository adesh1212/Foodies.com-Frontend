import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { toast } from 'react-toastify';

function Cart() {
    let data = useCart();
    let {dispatch} = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className='m-5 w-100 text-center fs-3'>
                Cart is Empty!
            </div>
        )
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    const handleCheckOut = async () => {
        let email = localStorage.getItem('userEmail');
        // console.log(email);

        const response = await fetch('http://localhost:5000/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, data: data, date: new Date().toDateString() })
        });
        const res = await response.json();
        // console.log(res);

        if (res.success) {
            await dispatch({ type: "CHECKOUT" });
            toast.success(res.message);
        }
        else {
            toast.warning(res.message);
        }
    }

    return (
        <div className='container mt-4 table-responsive table-responsive-sm table-responsive-md'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Size</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((food, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /> </button> </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>

            <button type="button" className="btn btn-success" onClick={handleCheckOut}>Check Out</button>
        </div>
    )
}

export default Cart