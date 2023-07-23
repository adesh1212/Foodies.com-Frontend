import React, { useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { toast } from 'react-toastify';

export default function Card({ foodData }) {
    // console.log(foodData);
    let {dispatch} = useDispatchCart();
    let options = Object.keys(foodData.options[0]);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(options[0]);

    let data = useCart();

    const handleAddToCart = async () => {
        let food = [];

        for (const item of data) {
            if (item.id === foodData._id+size) {
                food = item;
                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodData._id, price: finalPrice, qty: qty,size:size })
                console.log(foodData._id+size)
                toast.success("Added to Cart successfully");
    
                return;
            }
        }

        await dispatch({ type: "ADD", id: foodData._id, name: foodData.name, price: finalPrice, qty: qty, size: size });
        toast.success("Added to Cart successfully");
    }
    let obj = foodData.options[0];
    let finalPrice = qty * parseInt(obj[size]);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": '18rem', "Height": "360px" }}>
                    <img src={foodData.img} className="card-img-top img" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{foodData.name}</h5>
                        <p className="card-text">{foodData.description}</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded qty' onChange={(e) => { setQty(e.target.value) }}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}> {i + 1} </option>
                                        )
                                    })
                                }
                            </select>

                            <select className='m-2 h-100 bg-success rounded size' onChange={(e) => { setSize(e.target.value) }}>
                                {
                                    options.map((data) => {
                                        return <option key={data} value={data}>{data.toUpperCase()}</option>
                                    })
                                }
                            </select>


                            <div className='d-inline fs-5'>
                                ${finalPrice}/-
                            </div>

                            <hr />
                            {
                                localStorage.getItem('authToken') &&
                            <button className='btn btn-success text-white' onClick={handleAddToCart}>Add to Cart</button> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

