import React,{useEffect} from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import TopWear from './Adds/TopWear';
import BottomWear from './Adds/BottomWear';
import Cursol from './Cursol';
import CarouselV from './CarouselV';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Hidden ,useMediaQuery,useTheme} from '@material-ui/core';


export default function Home() {
    let history = useHistory();

    const theme = useTheme();
    // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        window.scroll(0,0);
    })


    return (
        <div style={{marginTop:'2em'}}>
            < Container style={{ width: "100%" }}>
                <Cursol  />
                <div style={{marginTop:'2em'}}>
                <Hidden mdUp>
                <CarouselV />
                </Hidden>
                <Hidden smDown>
                <Row fixed>

                    <Col xs={13} md={4}>
                        <Image 
                        onClick={() => { history.push("/men") }}
                        src={'https://images.bewakoof.com/uploads/grid/app/bewakoof-winter-store-online-fashion-shopping-720-banner-1609849948.jpg'} 
                        thumbnail 
                        />
                    </Col>
                    <Col xs={13} md={4}>
                        <Image onClick={() => { history.push("/cover") }}
                        src="https://images.bewakoof.com/uploads/grid/app/bewakoof-cover-parade-mobile-cover-online-fashion-shopping-720-banner-1609849946.jpg" 
                        thumbnail 
                        />
                    </Col>
                    <Col xs={13} md={4}>
                        <Image onClick={() => { history.push("/women") }}
                        src="https://images.bewakoof.com/uploads/grid/app/18th-Dec-Homepage-DOTD-1608282108.jpg" 
                        thumbnail 
                        />
                    </Col>

                </Row>
                </Hidden>
                </div>

                <Image  src="https://images.bewakoof.com/uploads/grid/app/bewakoof-top-title-card-online-shopping-DESKTOP-1603117869.jpg" style={{ width: '100%' }} />
                <TopWear />
                <Image src="https://images.bewakoof.com/uploads/grid/app/bewakoof-top-title-card-online-shopping-DESKTOP-BOTTOMWEAR-1603117870.jpg" style={{ width: '100%' }} />
                <BottomWear />

                <Image onClick={() => { history.push("/men") }}
                src="https://images.bewakoof.com/uploads/grid/app/bewakoof-oof-sale-desktop-strip-1603097557.jpg" 
                style={{ width: '100%',marginBottom:'2em',marginTop:'2em' }} 
                />

                <Image src="https://images.bewakoof.com/uploads/grid/app/Brand-Trust-desktop-underslider-1592992663.jpg" style={{ width: '100%' }} />
                <Image src="https://images.bewakoof.com/uploads/grid/app/branding-section-desktop-underslider-1589380737.png" style={{ width: '100%' }} />
                
                <Image onClick={() => { history.push("/women") }} src=" https://images.bewakoof.com/uploads/grid/app/vote-1618414275.jpg" style={{ width:matchesMD?'100%': '49%',marginBottom:'1em' ,marginRight:'1em'}} />
                
                <Image onClick={() => { history.push("/men") }} src=" https://images.bewakoof.com/uploads/grid/app/meme-1618414275.jpg" style={{ width:matchesMD?'100%': '49%',marginBottom:'1em' }} />
                
                <Image onClick={() => { history.push("/men") }} src=" https://images.bewakoof.com/uploads/grid/app/wfh-men-1618414275.jpg" style={{width:matchesMD?'100%': '49%',marginBottom:'1em' ,marginRight:'1em' }} />
                
                <Image onClick={() => { history.push("/women") }} src="https://images.bewakoof.com/uploads/grid/app/bkwf-squad-1618414273.jpg" style={{width:matchesMD?'100%': '49%',marginBottom:'1em' }} />
                
            </Container>


        </div >

    )
}
