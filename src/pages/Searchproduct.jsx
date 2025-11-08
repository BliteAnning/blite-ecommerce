import { useLocation } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useEffect } from 'react'
import { useState } from 'react'
import VerticalCard from '../components/VerticalCard'

const Searchproduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)

   //console.log("queries", query.search);
    

    const getSearchProduct = async () =>{
        setLoading(true)
        const response = await axiosInstance.get("/search-product" + query.search)
        setLoading(false)
        setData(response?.data?.data)
       
        
    }
    useEffect(()=>{
        getSearchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center'>Loading...</p>
            )
        }
        
        <p className='text-lg font-bold my-3'>Search Results : {data.length}</p>
        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center'>No Data Found...</p>
            )
        }
        {
            data.length !== 0 && !loading && (
                
                <VerticalCard loading={loading} data={data}/>
                    
                
            )
        }
    </div>
  )
}

export default Searchproduct