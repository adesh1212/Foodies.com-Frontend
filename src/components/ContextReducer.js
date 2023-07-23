import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id+action.size, name: action.name, price: action.price, qty: action.qty, size: action.size }];

        case "REMOVE":
            {
                let newArr = [...state];
                newArr.splice(action.index, 1);
                return newArr;
            }
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id+action.size) {
                    // console.log(action.qty + food.qty, action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: action.price + food.price }
                }
            })
            return arr;

        case "CHECKOUT":
            let newArr = [];
            return newArr;
        case "LOAD":
            return action.payload
        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [email, setEmail] = useState(localStorage.getItem('userEmail'));

    useEffect(() => {
        setEmail(localStorage.getItem('userEmail'));
        // console.log(email)
        const savedState = localStorage.getItem(`cart-data-${email}`);
        dispatch({ type: 'LOAD', payload: savedState ? JSON.parse(savedState) : [] });
    }, [email]);

    const [state, dispatch] = useReducer(reducer, [], (initialState) => {
        const savedState = localStorage.getItem(`cart-data-${email}`);
        return savedState ? JSON.parse(savedState) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(`cart-data-${email}`, JSON.stringify(state));
    }, [state, email]);
    return (
        <CartDispatchContext.Provider value={{ dispatch, setEmail }}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}

export const useCart = () => useContext(CartStateContext);

export const useDispatchCart = () => useContext(CartDispatchContext); 