import { useEffect, useState } from 'react'
import './App.css'
import Table from '../table/Table'
import { Product } from "../../types/types"


const defaultData: Array<Product> = [
{
    brand: "",
    category: "",
    description: "",
    discountPercentage: 0,
    id: 0,
    images: [],
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: "",
    title: "",
  }
]


function App() {
  const [data, setData] = useState<Array<Product>>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then(async (res) => {
        const products = await res.json();
        setData(products.products);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  },[]);
  
  return (
    <div>
      {( error === "" ) 
      ? <Table data={data} /> 
      : error }
    </div>
  )
}

export default App
