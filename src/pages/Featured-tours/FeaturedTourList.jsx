import React from 'react'
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap'
import './ftr-tour.css'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'

const FeaturedTourList = () => {

    const {data: FeaturedTours, loading, error} = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);
    console.log(FeaturedTours)


  return <>


    {
        loading && <h4>Loading...........</h4>
    }

{
        error && <h4>{error}</h4>
    }
    
    <div>
        <h2> Featured List</h2>
    </div>

    <div className='container__ftr'>
    {
        !loading && !error &&
        FeaturedTours?.map(tour => (
            <Col lg='3' className='mb-4' key={tour._id}><TourCard tour={tour}/></Col>
        ))
    }
    </div>

    {/* {
        tourData?.map(tour => (
            <Col lg='3' className='mb-4' key={tour.id}><TourCard tour={tour}/></Col>
        ))
    } */}

    
  </>
}

export default FeaturedTourList