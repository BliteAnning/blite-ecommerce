import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'
import VerticalCard from '../components/VerticalCard'
import { useEffect } from 'react'

const CategoryProducts = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [filterCatList, setFilterCatList] = useState([])

  const location = useLocation()
  const URLSearch = new URLSearchParams(location.search)
  const urlCategoryListArray = URLSearch.getAll("category")
  const urlCatListObj = {}
  urlCategoryListArray.forEach(c => {
    urlCatListObj[c] = true
  })

  const [selectCat, setSelectCat] = useState(urlCatListObj)
  const [sortBy,setSortBy] = useState("")


  const getTheData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.post("/filter-product", { category: filterCatList })
      if (response.data && response.data.success) {
        setData(response?.data?.data || [])
      } else {
        setData([])
      }
    } catch (err) {
      console.error("getTheData error:", err)
      setData([])
    } finally {
      setLoading(false)
    }
  }


  const handleSelectCat = (e) => {
    const { value, checked } = e.target
    setSelectCat((prev) => {
      const next = { ...prev, [value]: checked }

      return next
    })
  }
  //console.log("select", selectCat) 

  useEffect(() => {
    getTheData()
  }, [filterCatList])

  useEffect(() => {
    const arrayOfCat = Object.keys(selectCat).map(categoryKeyName => {
      if (selectCat[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)
    setFilterCatList(arrayOfCat)


    //format for url change when changed on the checkbox
    const urlFormat = arrayOfCat.map((el, index) => {
      if ((arrayOfCat.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    navigate("/product-category?" + urlFormat.join(""))
    //console.log("selected c", arrayOfCat);

  }, [selectCat])

  const handleSortBy = (e)=>{
    const {value} = e.target
    setSortBy(value)
    if(value === "asc"){
      setData(prev => prev.sort((a,b)=>a.selling - b.selling))
    }
    if(value === "dsc"){
      setData(prev => prev.sort((a,b)=>b.selling - a.selling))
    }
  }

  useEffect(()=>{

  },[sortBy])

  return (
    <div className='container mx-auto p-4'>


      {/**desktop version */}
      <div className='hidden lg:flex'>

        {/**left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

          {/**sort by */}
          <div className=''>
            <h2 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-300'>Sort By</h2>
            <form action="" className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sortBy' checked={sortBy === "asc"} value={"asc"} onChange={handleSortBy}/>
                <label htmlFor=""> Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type="radio" checked={sortBy === "dsc"} name='sortBy' value={"dsc"} onChange={handleSortBy}/>
                <label htmlFor=""> Price - High to low</label>
              </div>
            </form>
          </div>

          {/**filter */}
          <div className=''>
            <h2 className='text-base uppercase font-medium text-slate-600 border-b pb-1 border-slate-300'>Category</h2>
            <form action="" className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex item-center gap-3' key={categoryName?.value}>
                      <input type="checkbox" name={"category"} checked={!!selectCat[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCat} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>

        {/**right side product */}
        <div className='w-full flex-1 p-4'>
          <p className='font-medium text-slate-600'>Search Results: {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
{
            data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )

          }
          </div>
          
        </div>




      </div>
    </div>
  )
}

export default CategoryProducts