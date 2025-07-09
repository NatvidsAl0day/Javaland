import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// import './listtour.css'
import './editform.css'

const EditTours = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: '',
        desc: '',
        price: '',
        maxGroupSize: '',
    });

    useEffect(() => {
        getTour();
    }, []);

    const getTour = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/tours/${id}`);
            setTour(response.data.data);
        } catch (error) {
            console.error('Error fetching the tour data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTour({
            ...tour,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/v1/tours/${id}`, tour);
            navigate('/admin'); // Redirect ke halaman utama atau halaman yang diinginkan
        } catch (error) {
            console.error('Error updating the tour:', error);
        }
    };

    return (
        // <div className="container">
        //     <h2 className="title has-text-centered mt-5">Edit Tour</h2>
        //     <form onSubmit={handleSubmit} className="box">
        //         <div className="field">
        //             <label className="label">Title</label>
        //             <div className="control">
        //                 <input className="input" type="text" name="title" value={tour.title} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="field">
        //             <label className="label">City</label>
        //             <div className="control">
        //                 <input className="input" type="text" name="city" value={tour.city} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="field">
        //             <label className="label">Address</label>
        //             <div className="control">
        //                 <input className="input" type="text" name="address" value={tour.address} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="field">
        //             <label className="label">Distance</label>
        //             <div className="control">
        //                 <input className="input" type="text" name="distance" value={tour.distance} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="field">
        //             <label className="label">Photo URL</label>
        //             <div className="control">
        //                 <input className="input" type="text" name="photo" value={tour.photo} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="field">
        //             <label className="label">Description</label>
        //             <div className="control">
        //                 <textarea className="textarea" name="desc" value={tour.desc} onChange={handleChange}></textarea>
        //             </div>
        //         </div>
        //         <div className="field">
        //             <label className="label">Price</label>
        //             <div className="control">
        //                 <input className="input" type="number" name="price" value={tour.price} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="field">
        //             <label className="label">Max Group Size</label>
        //             <div className="control">
        //                 <input className="input" type="number" name="maxGroupSize" value={tour.maxGroupSize} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="field">
        //             <div className="control">
        //                 <button className="button is-primary is-fullwidth" type="submit">Save</button>
        //             </div>
        //         </div>
        //     </form>
        // </div>
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="box">
                        <h2 className="title has-text-centered">Edit Tour</h2>
                        <p className="subtitle has-text-centered">Update your tour details</p>
                        <form onSubmit={handleSubmit}>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Title</label>
                                        <div className="control">
                                            <input className="input" type="text" name="title" placeholder="Tour Title" value={tour.title} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">City</label>
                                        <div className="control">
                                            <input className="input" type="text" name="city" placeholder="Tour City" value={tour.city} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Address</label>
                                <div className="control">
                                    <input className="input" type="text" name="address" placeholder="Tour Address" value={tour.address} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Distance</label>
                                <div className="control">
                                    <input className="input" type="text" name="distance" placeholder="Tour Distance" value={tour.distance} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Photo URL</label>
                                <div className="control">
                                    <input className="input" type="text" name="photo" placeholder="Photo URL" value={tour.photo} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control">
                                    <textarea className="textarea" name="desc" placeholder="Tour Description" value={tour.desc} onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Price</label>
                                        <div className="control">
                                            <input className="input" type="number" name="price" placeholder="Tour Price" value={tour.price} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Max Group Size</label>
                                        <div className="control">
                                            <input className="input" type="number" name="maxGroupSize" placeholder="Max Group Size" value={tour.maxGroupSize} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary is-fullwidth" type="submit">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTours;
