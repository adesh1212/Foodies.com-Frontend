import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    let [search, setSearch] = useState('');
    let [foodData, setfoodData] = useState([]);
    let [foodCat, setfoodCat] = useState([]);

    async function getData() {
        try {
            const res = await fetch('http://localhost:5000/api/foodData');
            const food_data = await res.json();
            // console.log(food_data[0]);
            setfoodData(food_data[0]);
            setfoodCat(food_data[1]);
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getData();
    }, [])

    // console.log(foodData);
    // console.log(foodCat);

    return (
        <div>
            <div> <Navbar /> </div>

            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className='carousel_search'>
                        <div className="d-flex">
                            <input className="form-control me-2 py-1" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                            {/* <button className="btn btn-primary" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" alt='burger' />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300×300/?food" className="d-block w-100" alt='' />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100"
                                alt='' />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            // console.log(data);
                            return (
                                <div key={data.id} >
                                    <div className='fs-3 m-3 text-center'>
                                        {data.CategoryName}
                                    </div>

                                    <hr />
                                    <div className='cards'>
                                        {
                                            foodData !== []
                                                ? foodData.filter((item) => {
                                                    return (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                                                }).map((filterItems) => {
                                                    return (
                                                        <div key={filterItems.id}>
                                                            <Card key={filterItems.id} foodData={filterItems}></Card>
                                                        </div>

                                                    )
                                                })

                                                : <div>Not found</div>
                                        }
                                    </div>

                                </div>
                            )
                        }) : <div>Not found</div>
                }
                {/* <Card /> */}
            </div>


            <div> <Footer /> </div>

        </div>
    )
}
