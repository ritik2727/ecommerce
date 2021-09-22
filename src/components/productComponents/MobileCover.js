import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap'
import GetData from '../../GetData';
import ItemCards from './ItemCards';
import { StateContext, StateProvider } from '../../context/StateContext';


export default function MobileCover(props) {
    const {mobile} =  useContext(StateContext);
    const [dataMobile,setDataMobile] =  mobile
    // const { docs } = GetData("mens");
    const CardStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding-top: 8.5rem;
  margin-left: 15%;
  @media (max-width: 990px) {
    width: 100%;
    margin: auto;
    padding-top: 2rem;
    width: 100%;
    justify-content: space-evenly;
  }
`;

    return (
        <div>

            < Container style={{ alignItem: 'center', justifyContent: "center" }}>
                <h3>Mobile Cover   </h3>
          <CardStyle>
                    {dataMobile && dataMobile.map((doc) =>
                    
                            <ItemCards
                                key={doc.id}
                                id={doc.id}
                                productName={doc.productName}
                                image={doc.image}
                                price={doc.price}
                                oldPrice={doc.oldPrice}
                                user={props.user}
                            />
                    )}
         </CardStyle>
            </Container>
        </div>

    )
}