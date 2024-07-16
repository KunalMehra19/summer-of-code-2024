// import React from 'react'
import React, { useState, useEffect } from 'react';
function ItemPurchase(props) {

    const [cateitem, setcateitem] = useState([]);
    const [puritem, setpuritem] = useState([]);

    let token=props.obj;
    async function getitems(){
        let a = await fetch('https://dsoc-2024.webredirect.org/api/inventory/items/',{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        let b= await a.json()
        return b
    }
    async function cateitems() {
        let data = await getitems()
        console.log(data.items,Object.keys(data.items).length)
        let l=[]
        for (let i = 0; i < data.items.length; i++) {
            const e = data.items[i];
            l.push(e)
            
        }
        return l
    }
    
    useEffect(() => {
        async function fetchItems() {
            let items = await cateitems();
            setcateitem(items);
        }
        fetchItems();
    }, []);

    function additempur(item) {
        setpuritem((prevPurItem) => 
            [...prevPurItem, item]
        );}

    
  return (
    <> 
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
        <div className="h-100 m-0 row">
            <div className=" col col-8 p-0 mained">
                <div className="m-0 align-items-center bg-body-white d-flex h3 justify-content-between p-2 px-4 border-bottom border-dark-subtle border-4">
                    <div>
                        <img src='\src\assets\logo.svg'></img>
                        KMart
                    </div>
                    <div>
                        <button className=' exitbtn border-0 px-4 py-2 rounded-5'>EXIT</button>
                    </div>
                </div>
                <div className="row mains">
                    <div className="col-3  border-end border-dark-subtle border-4 overflow-y-scroll h-100">
                        <div className='h5'><img src='\src\assets\cate.svg'></img>CATEGORY</div>
                        <div className='catecontent d-flex flex-column gap-3 px-3'>
                                {cateitem.map((item, index) => (
                                    <div className='catetemplate' key={index}>{item.name}</div>
                                ))}
                            
                        </div>
                    </div>
                    <div className="col bg-body-secondary d-flex p-3 gap-3 itemcont h-100">
                            {cateitem.map((item, index) => (
                                <button 
                                key={index}
                                className='rounded-4 border-0 p-3 text-center itemtemp'
                                onClick={()=>additempur(item)}
                                >
                                    <div className='ItemName overflow-x-ellipsis'>{item.name}</div>
                                    <div className='ItemPrice'>{item.price}</div>
                                </button>
                            ))}
                        
                        
                        
                    </div>
                </div>
            </div>
            <div className=" border-4 border-dark-subtle border-start col col-4 h-100">
                <div className=' border-4 border-bottom border-dark-subtle h3 p-3'>
                    <img src="\src\assets\order.svg" />
                    Customer Name
                </div>
                <div className='middiv'>
                    {puritem.map((item, index) => (
                        <div  key={index} className='itempurtemp'>
                        <div className='itempurtemp-cont'>
                            <div>
                                <div className='h4'>{item.name}</div>
                                <div className='text-bg-dark-subtle'>{item.price}</div>
                            </div>
                            <div className='align-items-center d-flex gap-2 justify-content-center'>
                                <img src="\src\assets\minus.svg" />
                                <div className='qty'>1</div>
                                <img src="\src\assets\plus.svg" />
                            </div>
                        </div>
                        <div>
                            <img src='\src\assets\delete.svg'></img>
                        </div>
                    </div>
                    ))}



                    
                    
                </div>
                <div className='border-4 border-dark-subtle border-top py-3'>
                    <div className=' align-items-center bg-info d-flex h4 justify-content-lg-between p-3 rounded-4'>
                        <div className='orderlabel'>
                            <div>No of items: </div>
                            <div>Total Price: </div>
                        </div>
                        <div className='d-flex gap-3'>
                            <button className='border-0 px-2 py-1 rounded-3'><img src='\src\assets\recipt.svg'></img></button>
                            <button className='orderbtn bg-white border-0 px-3 py-2 rounded-4'>Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ItemPurchase
