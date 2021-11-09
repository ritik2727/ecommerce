import React from 'react'
import { Carousel } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function CarouselV(){
  let history = useHistory();
    return(
            <Carousel fade={true} pause={false}>
              <Carousel.Item interval={2000}>

                <img
                  onClick={() => { history.push("/men") }}
                  className="d-block w-100"
                  src='https://images.bewakoof.com/uploads/grid/app/bewakoof-winter-store-online-fashion-shopping-720-banner-1609849948.jpg'
                  alt="First slide"
                />

              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  onClick={() => { history.push("/women") }}
                  className="d-block w-100"
                  src='https://images.bewakoof.com/uploads/grid/app/bewakoof-cover-parade-mobile-cover-online-fashion-shopping-720-banner-1609849946.jpg'
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  onClick={() => { history.push("/cover") }}
                  className="d-block w-100"
                  src='https://images.bewakoof.com/uploads/grid/app/18th-Dec-Homepage-DOTD-1608282108.jpg'
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          )
        }