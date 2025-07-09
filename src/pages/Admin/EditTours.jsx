import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editform.css';
import { BASE_URL } from '../../utils/config';
import { AdminAuthContext } from '../../context/AdminAuthContext';

const EditTours = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AdminAuthContext);

  const [tour, setTour] = useState({
    title: '', city: '', address: '', distance: '', photo: '', desc: '', price: '', maxGroupSize: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tours/${id}`);
        setTour(res.data.data);
      } catch (err) {
        console.error('Fetch tour error:', err);
      }
    })();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTour(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!token) throw new Error('Anda belum login.');
      await axios.put(`${BASE_URL}/tours/${id}`, tour, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/admin');
    } catch (err) {
      console.error('Update tour error:', err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="box">
          <h1 className="title has-text-centered">Edit Tour</h1>
          <h2 className="subtitle has-text-centered">Update your tour details</h2>
          <form onSubmit={handleSubmit}>
            {/* Title & City */}
            <div className="columns">
              <div className="column field">
                <label className="label">Title</label>
                <div className="control">
                  <input className="input" type="text" name="title" value={tour.title} onChange={handleChange} required />
                </div>
              </div>
              <div className="column field">
                <label className="label">City</label>
                <div className="control">
                  <input className="input" type="text" name="city" value={tour.city} onChange={handleChange} required />
                </div>
              </div>
            </div>
            {/* Address */}
            <div className="field">
              <label className="label">Address</label>
              <div className="control">
                <input className="input" type="text" name="address" value={tour.address} onChange={handleChange} required />
              </div>
            </div>
            {/* Distance & Photo */}
            <div className="columns">
              <div className="column field">
                <label className="label">Distance (km)</label>
                <div className="control">
                  <input className="input" type="number" name="distance" value={tour.distance} onChange={handleChange} required />
                </div>
              </div>
              <div className="column field">
                <label className="label">Photo URL</label>
                <div className="control">
                  <input className="input" type="url" name="photo" value={tour.photo} onChange={handleChange} required />
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="textarea" name="desc" value={tour.desc} onChange={handleChange} required />
              </div>
            </div>
            {/* Price & Group Size */}
            <div className="columns">
              <div className="column field">
                <label className="label">Price (IDR)</label>
                <div className="control">
                  <input className="input" type="number" name="price" value={tour.price} onChange={handleChange} required />
                </div>
              </div>
              <div className="column field">
                <label className="label">Max Group Size</label>
                <div className="control">
                  <input className="input" type="number" name="maxGroupSize" value={tour.maxGroupSize} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`} type="submit">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditTours;
