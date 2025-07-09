import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editform.css';
import { BASE_URL } from '../../utils/config';
import { AdminAuthContext } from '../context/AdminAuthContext'; // <- tambahkan ini

const EditTours = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminAuthContext); // <- gunakan context
  const token = localStorage.getItem('token_admin'); // <- boleh backup, tapi utamanya pakai context bila tersedia

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tours/${id}`);
        setTour(res.data.data);
      } catch (err) {
        console.error('Gagal mengambil data tour:', err);
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
      if (!token) throw new Error('Token admin tidak ditemukan. Silakan login.');

      await axios.put(`${BASE_URL}/tours/${id}`, tour, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/admin');
    } catch (err) {
      console.error('Gagal memperbarui tour:', err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <h2 className="title has-text-centered">Edit Tour</h2>
            <p className="subtitle has-text-centered">Update your tour details</p>
            <form onSubmit={handleSubmit}>
              {/* Title & City */}
              <div className="columns">
                <div className="column">
                  <label className="label">Title</label>
                  <input className="input" type="text" name="title" value={tour.title} onChange={handleChange} required />
                </div>
                <div className="column">
                  <label className="label">City</label>
                  <input className="input" type="text" name="city" value={tour.city} onChange={handleChange} required />
                </div>
              </div>

              {/* Address, Distance, Photo */}
              <label className="label">Address</label>
              <input className="input mb-3" type="text" name="address" value={tour.address} onChange={handleChange} required />

              <label className="label">Distance</label>
              <input className="input mb-3" type="text" name="distance" value={tour.distance} onChange={handleChange} required />

              <label className="label">Photo URL</label>
              <input className="input mb-3" type="text" name="photo" value={tour.photo} onChange={handleChange} required />

              {/* Description */}
              <label className="label">Description</label>
              <textarea className="textarea mb-3" name="desc" value={tour.desc} onChange={handleChange} required />

              {/* Price & Max Group Size */}
              <div className="columns">
                <div className="column">
                  <label className="label">Price</label>
                  <input className="input" type="number" name="price" value={tour.price} onChange={handleChange} required />
                </div>
                <div className="column">
                  <label className="label">Max Group Size</label>
                  <input className="input" type="number" name="maxGroupSize" value={tour.maxGroupSize} onChange={handleChange} required />
                </div>
              </div>

              <button className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`} type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTours;
