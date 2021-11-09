import React from 'react'
import {  Row, Col, Image, } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
export default function BottomWear() {
    let history = useHistory();
    return (
        <div>
            <Row fixed>

                <Col xs={6} md={2}>
                    <Image onClick={() => { history.push("/men") }} src={'https://images.bewakoof.com/uploads/grid/app/Jeans-1629184146.jpg'} thumbnail />
                </Col>
                <Col xs={6} md={2}>
                    <Image onClick={() => { history.push("/women") }} src={'https://images.bewakoof.com/uploads/grid/app/Shorts-1629184150.jpg'} thumbnail />
                </Col>  <Col xs={6} md={2}>
                    <Image  onClick={() => { history.push("/men") }} src={'https://images.bewakoof.com/uploads/grid/app/Boxers-1629184143.jpg'} thumbnail />
                </Col>
                <Col xs={6} md={2}>
                    <Image onClick={() => { history.push("/men") }} src="https://images.bewakoof.com/uploads/grid/app/Joggers-1629184147.jpg" thumbnail />
                </Col>
                <Col xs={6} md={2}>
                    <Image onClick={() => { history.push("/men") }}  src="https://images.bewakoof.com/uploads/grid/app/Men-pants-13-1626849576.png" thumbnail />
                </Col>
                <Col xs={6} md={2}>
                    <Image onClick={() => { history.push("/women") }} src="https://images.bewakoof.com/uploads/grid/app/Pyjamas-1629184149.jpg" thumbnail />
                </Col>

            </Row>
        </div>
    )
}