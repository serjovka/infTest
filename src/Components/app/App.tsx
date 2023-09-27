import { useEffect, useState } from 'react'
import './App.sass'
import Table from '../table/Table'
import Loading from "../loading/Loading"
import { Product } from "../../types/types"

function App() {
  const [data, setData] = useState<Array<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
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
    <div className='wrapper'>
      {( error !== "" )
      ? <h1>{error}</h1>
      : loading
      ? <Loading />
      : data !==null && <Table data={data} /> 
      }
    </div>
  )
}

export default App
