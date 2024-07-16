import { useState } from 'react'
import './App.css'
import CustomerLogin from './components/CustomerLogin'
import ItemPurchase from './components/ItemPurchase'

let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMzA0MjAyLCJpYXQiOjE3MTk0MTc4MDIsImp0aSI6IjY2OThmNDgzZjBkNzQxNDhiNDI2NDBjM2M1MWQ1Mzg2IiwidXNlcl9pZCI6Mn0.rIkb66DBAiEa-OUyzOvc9_2Wtcvw_3wb-AmzkIcO3o0'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ItemPurchase obj={token}/>
    </>
  )
}

export default App
