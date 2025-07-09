import { useState } from 'react';
import React from 'react';
import CommonSection from '../shared/CommonSection';
import { Row, Container, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import TourCard from '../shared/TourCard';
import Newslatter from '../shared/Newslatter';


const SearchResultList = () => {


    const location = useLocation()
    const [data] = useState(location.state)
    console.log(data)
    
    return <>
    <CommonSection title={'Tour Search Result'}/>
    <section>
        <Container className='mt-5'>
            <Row>
                {
                    data.length === 0 ?
                    (<h4 className='text-center'>Tidak Ada Data</h4>)
                     : (data?.map(tour => 
                        <Col lg='3' className='mb-6' key={tour._id}>
                            <TourCard tour={tour}/>
                        </Col>)
                )}
            </Row>
        </Container>
    </section>
    <Newslatter/>

    
    
    
    
    </>
}

export default SearchResultList