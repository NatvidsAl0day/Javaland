// Import Dependen
import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import '../styles/tours.css';
import TourCard from '../shared/TourCard';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from '../shared/SearchBar';
import Newslatter from '../shared/Newslatter';
import { BASE_URL } from '../utils/config';
import useFetch from '../hooks/useFetch';
import Header from './Header/Header';

// Komponen Fungsional Tours
const Tours = () => {
  // Inisialisasi State
  const [pageCount, setPageCount] = useState(0);
  const [page, setpage] = useState(0);

  // Fetch Data menggunakan Custom Hook useFetch
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  // useEffect untuk Menghitung Jumlah Halaman
  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  // Render Komponen Header
  return (
    <>
      <div className='header_tour'>
        <Header className=''/>
      </div>

      {/* Render Komponen CommonSection */}
      <CommonSection title={"All Tours"}/>
      <section className='sec__1'>
        <Container>
          <Row>
            <SearchBar/>
          </Row>
        </Container>
      </section>

      {/* Render Tours dan Pagination */}
      <section className='pt-0'>
        <Container>
          {loading && <h4 className='text-center pt-5'>loading........</h4>}
          {error && <h4 className='text-center pt5'>{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map(tour => (
                <Col lg='3' className='mb-4' key={tour._id}>
                  <TourCard tour={tour}/>
                </Col>
              ))}
              <Col lg='12'>
                <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                  {[...Array(pageCount).keys()].map(number => (
                    <span
                      key={number}
                      onClick={() => setpage(number)}
                      className={page === number ? 'active__page' : ''}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Render Komponen Newsletter */}
      <Newslatter/>
    </>
  );
};

// Ekspor Komponen
export default Tours;
