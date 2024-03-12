import { useEffect, useState} from 'react'
import Navbar from '../components/Navbar';
import './HomeScreen.css'
import data from '../data.json'
import ProductCart from '../components/ProductCart';


function HomeScreen() {

    const [productCount, setProductCount] = useState(0);
    const [phoneData, setPhoneData] = useState(data.phone_data);
    const [totalCost, setTotalCost] = useState(0);
  
    useEffect(()=>{
        const total = phoneData.reduce((accu,curr)=>{
            return curr.quantity + accu;
        },0)

        setProductCount(total);

        const cost = phoneData.reduce((accu,curr)=>{
            return (curr.price * curr.quantity) + accu
        },0)

        setTotalCost(cost);

    },[phoneData])

    function clearAllHandler(){
        setPhoneData([]);
        setProductCount(0);
        setTotalCost(0);
    }

    // console.log(phoneData);


  return (
    <div>
            <Navbar productCount = {productCount}/>
            <div id='home-container'>
                <h1 className="heading">Your Bag</h1>
                {phoneData.length === 0 && <p>is Empty</p>}
                {
                    phoneData.map((elem,index)=>{
                        return(
                            <ProductCart img = {elem.img_url} name = {elem.name} price = {elem.price} count = {elem.quantity}  key={index} setProductCount ={setProductCount} setTotalCost={setTotalCost} phoneData = {phoneData} setPhoneData = {setPhoneData} id = {index} />
                        )
                    })
                }
            </div>
            <div id='footer'>
                <div id='total-container'>
                    <p>Total : </p>
                    <p>{totalCost > 0 ? totalCost : 0}</p>
                </div>
                <div>
                    <button onClick={clearAllHandler}>Clear All</button>
                </div>
            </div>
        </div>
  )
}

export default HomeScreen;