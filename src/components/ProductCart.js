import { useEffect, useState } from 'react';
import './ProductCart.css'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


const ProductCart = ({
    img,
    name,
    price,
    count,
    setProductCount,
    setTotalCost,
    phoneData,
    setPhoneData,
    id
 }) => {

    const [quantity, setQuantity] = useState(count);

    // console.log("render")

    useEffect(() => {

        if (count === 0) {

            removeHandler(id)

        }

    }, [quantity])

    function incrementHandler() {

        const updatedArray = phoneData.map((elem, index) => {
            if (index === id) {
                elem.quantity += 1;
                setQuantity((previousState) => previousState + 1);
                setProductCount((previousValue) => previousValue + 1);
                setTotalCost((previousValue) => Math.round(previousValue + price))
            }
            return elem;
        })

        setPhoneData(updatedArray);

    }

    function decrementHandler() {

        if (count > 0) {


            const updatedArray = phoneData.map((elem, index) => {
                if (index === id) {
                    elem.quantity -= 1;

                    setQuantity(quantity - 1);
                    setProductCount((previousValue) => previousValue - 1);
                    setTotalCost((previousValue) => Math.round(previousValue - price))
                }
                return elem;
            })


            setPhoneData(updatedArray)

        }



    }

    function removeHandler(id) {

        // setQuantity(0);

        setPhoneData((previousState) => {
            const data = [...previousState];
            data.splice(id, 1);
            return data;
        })
    }


    return (
        <div className="card-container">
            <div className="product">
                <img src={img} />

                <div className="product-details">
                    <p>{name}</p>
                    <p>${price}</p>
                    <button className="btn" onclick={() => {
                        removeHandler(id)
                    }} >Remove</button>
                </div>
            </div>

            <div className='quantity'>
                <IoIosArrowUp className='product-count-change-arrow' onClick={incrementHandler} />
                <p className='quantity-count'>{phoneData[id].quantity}</p>
                <IoIosArrowDown className='product-count-change-arrow' onClick={decrementHandler} />
            </div>

        </div>
    )
}

export default ProductCart
