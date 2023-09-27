import { useEffect, useState } from 'react'
import './App.css'
import Table from '../table/Table'
import { Product } from "../../types/types"

function App() {
  const [data, setData] = useState<Array<Product> | null>(null);
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
      ? data !==null && <Table data={data} /> 
      : <h1>{error}</h1> }
    </div>
  )
}

export default App
