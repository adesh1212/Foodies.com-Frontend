import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';
import { useState } from 'react';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from '../components/ContextReducer'

export default function Navbar() {
    let navigate = useNavigate();
    let [cartView, setcartView] = useState(false);
    let data = useCart();

    function logout() {
        localStorage.removeItem('authToken');
        toast.success("Logged Out Successfully");
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">Foodies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className='me-auto mb-1 d-flex flex-col'>
                            <div className="navbar-nav">
                                <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/">Home</Link>
                            </div>
                            {/* {
                                (localStorage.getItem('authToken'))
                                    ?
                                    <div className="navbar-nav">
                                        <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/myorders">My Orders</Link>
                                    </div> : ""

                            } */}

                        </div>
                        {
                            !(localStorage.getItem('authToken')) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1 fs-6 fw-bold" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1 fs-6 fw-bold" to="/signup">SignUp</Link>
                                </div> :
                                <div className='d-flex'>
                                    <button className="btn bg-white text-success mx-1 fs-6 fw-bold" onClick={() => setcartView(true)}>
                                        MyCart {" "}
                                        {
                                            data.length ?
                                                <Badge pill bg='danger'>
                                                    {data.length}
                                                </Badge> : null
                                        }
                                    </button>
                                    {
                                        cartView ?
                                            <Modal onClose={() => setcartView(false)}> <Cart /> </Modal> : null
                                    }
                                    <button className="btn bg-white text-danger mx-1 fs-6 fw-bold" onClick={logout}>Logout
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
