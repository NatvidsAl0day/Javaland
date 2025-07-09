// Import modul dan komponen yang diperlukan dari React, Reactstrap, dan file-file kustom lainnya.
import React, { useState, useContext } from 'react';
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

// Tentukan komponen fungsional Booking.
const Booking = ({ tour, avgRating }) => {
    // Destruktur properti dari objek 'tour'.
    const { price, reviews, title } = tour;

    // Akses fungsionalitas navigasi dari React Router.
    const navigate = useNavigate();

    // Akses informasi pengguna dari AuthContext.
    const { user } = useContext(AuthContext);

    // Tentukan dan inisialisasi state 'booking' menggunakan hook 'useState'.
    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    // Tangani perubahan input formulir dan perbarui state 'booking' sesuai.
    const handleChange = e => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    // Tentukan biaya layanan dan hitung jumlah total untuk pemesanan.
    const serviceFee = 5000
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

    // Tangani klik saat pengguna mencoba melakukan pemesanan.
    const handleClick = async e => {
        e.preventDefault()

        console.log(booking);

        try {
            // Periksa apakah pengguna sudah terautentikasi.
            if (!user || user === undefined || user === null) {
                return alert('Silakan Masuk')
            }

            // Kirim permintaan POST ke server dengan detail pemesanan.
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                //Berguna untuk otentikasi dan otorisasi
                credentials: 'include',
                body: JSON.stringify(booking)
            })

            // Parse respons dari server.
            const result = await res.json()
            console.log({ result })

            
            if (!res.ok) {
                return alert(result.message)
            }
            navigate("/thank-you");
        

        } catch (err) {
            // menangani kesalahan selama proses pengambilan atau parsing.
            alert(err.message)
        }
    }

    // Render formulir pemesanan dan informasi terkait.
    return (
        <div className='booking'>
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>Rp. {price} <span></span></h3>
                <span className='tour__rating d-flex align-items-center gap-1'>
                    <i class="ri-star-fill"></i>
                    {/* jika rating masih terdeteksi 0/kosong maka akan diisi dari avgRating yaitu 0 */}
                    {avgRating === 0 ? null : avgRating} ({reviews?.length}) 
                </span>
            </div>

            {/* Formulir Pemesanan */}
            <div className="booking__form">
                <h5>Informasi</h5>
                <Form className='booking__info-form' onSubmit={handleClick}>
                    <FormGroup>
                        <input type='text' placeholder='Nama Lengkap' id='fullName' required onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <input type='number' placeholder='+ 62' id='phone' required onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className='d-flex align-items-center gap-1'>
                        <input type='date' placeholder='' id='bookAt' required onChange={handleChange} />
                        <input type='number' placeholder='Tamu' id='guestSize' required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    {/* Tampilkan rincian biaya per orang */}
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>
                            Rp{price} <i className='ri-close-line'></i> 1 orang
                        </h5>
                        <span> Rp{price} </span>
                    </ListGroupItem>

                    <ListGroupItem className='border-0 px-0'>
                        <h5> Biaya Layanan </h5>
                        <span> Rp.{serviceFee} </span>
                    </ListGroupItem>

                    {/* Tampilkan jumlah total */}
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span> Rp.{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                {/* Tombol untuk memulai proses pemesanan */}
                <button className='btn__book btnprim w-100 mt-4' onClick={handleClick}>
                    Pesan Sekarang
                </button>
            </div>
        </div>
    )
}

// Ekspor komponen Booking sebagai ekspor default.
export default Booking;
