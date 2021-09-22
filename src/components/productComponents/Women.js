import { Menu } from '@material-ui/core';
import React ,{useContext} from 'react';
import GetData from '../../GetData';
import ItemCards from './ItemCards';
import { StateContext, StateProvider } from '../../context/StateContext';

export default function Women(){
    // const { docs } = GetData("womens");
    const {womens} =  useContext(StateContext);
    const [dataWomens,setDataWomens] =  womens;

    return (
        <div>
            hi
            {dataWomens &&
            dataWomens.map((doc) => (
              <ItemCards
                key={doc.id}
                id={doc.id}
                productName={doc.productName}
                image={doc.image}
                price={doc.price}
                oldPrice={doc.oldPrice}
              />
            ))}
        </div>
    )
}
