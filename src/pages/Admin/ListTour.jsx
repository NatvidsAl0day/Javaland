import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listtour.css';
import { Link } from "react-router-dom";

const ListTour = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        getTours();
    }, []);

    const getTours = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/tours/allout/out");
            console.log(response.data); // Log respons API untuk memeriksa struktur data
            if (response.data && Array.isArray(response.data.data)) {
                setTours(response.data.data);
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            console.error("Error fetching the tours data:", error);
        }
    };

    const deleteTours = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/tours/${id}`);
            getTours();
        } catch (error) {
            console.error("Error deleting the tours data:", error);
        }
    }

    return (
        <div className='columns'>
            <div className="column is-half">
                <table className='table is-striped is-fullwidth mt-5'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Distance</th>
                            <th>Photo</th>
                            <th>Desc</th>
                            <th>Price</th>
                            <th>MaxGroupSize</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(tours) && tours.length > 0 ? (
                            tours.map((tour, index) => (
                                <tr key={tour._id}>
                                    <td>{index + 1}</td>
                                    <td>{tour.title}</td>
                                    <td>{tour.city}</td>
                                    <td>{tour.address}</td>
                                    <td>{tour.distance}</td>
                                    <td><img src={tour.photo} alt={tour.title} style={{ width: '50px', height: '50px' }} /></td>
                                    <td>{tour.desc}</td>
                                    <td>{tour.price}</td>
                                    <td>{tour.maxGroupSize}</td>
                                    <td>
                                        {/* Tempat untuk tombol aksi (misalnya, Edit atau Delete) */}
                                        {/* <button className="button button-edit">Edit</button> */}
                                        <Link to={`/edit/${tour._id}`} className="button button-edit">Edit</Link>
                                        <button onClick={()=> deleteTours(tour._id)} className="button button-delete">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10">No tours available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTour;
