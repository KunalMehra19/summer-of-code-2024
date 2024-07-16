import React from 'react'
import './CustomerLogin.css'

function CustomerLogin() {
  return (
    <>
      <nav>
        <div className="first">
          <div className="logo"><img src='\src\assets\logo.svg'></img></div>
          <div className="shopname">KMart</div>
        </div>
        <div className="second">
          <button className='logoutbtn'>LOGOUT</button>
        </div>
      </nav>
      <main>
        <div className="left">
          <div className="icon"><img src='\src\assets\cashierlogo.svg'></img></div>
          <div className="cashiername">NAME</div>
          <div className="cashieremail">EMAIL ID (IN SMALL)</div>
          <div className="role">CASHIER</div>
        </div>
        <div className='middleback'>
          <div className="middle">
            <div className="title">CUSTOMER DETAILS</div>
            <div className="customerform">
              <div className="customer">
                <div>NAME</div>
                <input type='text'></input>
              </div>
              <div className="customer">
                <div>MOBILE*</div>
                <input type='number'></input>
              </div>
              <div className="customer">
                <div>ADDRESS</div>
                <input type='text'></input>
              </div>
            </div>
            <div className="formend">
                <button className='gobtn'>GO</button>
            </div>
          </div>
          <div className="right">
            kunal
          </div>
        </div>
      </main>
    </>
  )
}

export default CustomerLogin
