import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'


const Home = () => {
  const dispatch = useDispatch()
  const {allProducts,loading,errorMsg} = useSelector(state=>state.productReducer)
  console.log(allProducts,loading,errorMsg);
  

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (
    <>
    <Header insideHome={true}/>
    <div style={{paddingTop:'100px'}} className='container px-4 mx-auto'>
    {
    loading ?
    <div className="flex justify-center item-center my-5 text-lg">
      <img width={'70px'} height={'70px'} className='me-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS789NyUdpX3QENXM1a9d3367Dq5eU-EW_76A&s" alt="" />
      loading...
    </div>
    :
    <>
        <div className="grid grid-cols-4 gap-4">
         { 
          allProducts?.length>0?
          allProducts?.map(product=>(
            <div key={product?.id} className="rounded border p-2 shadow">
            <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
            <div className="text-center">
              <h3 className='text-xl font-bold'>{product?.title}</h3>
              <Link to={`/${product?.id}/view`} className='bg-violet-600 rounded text-white inline-block
               p-1 mt-3'>View More..</Link>
            </div>
          </div>
          ))
          :
          <div className="flex justify-center item-center font-bold text-red-600 my-5 text-lg">
            Product Not Fount!!!
          </div>
        }
        </div>
     </>}
    </div>
    </>
  )
}

export default Home