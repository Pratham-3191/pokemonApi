import React, { useState ,useEffect} from 'react'

function Pokemon() {
  const [data,setData]=useState([])
  const[data2,setData2]=useState([])
  const url="https://pokeapi.co/api/v2/pokemon";
  console.log(data2)
  useEffect(()=>{
   const  fetchData=async()=>{
    try {
      const res= await fetch(url)
      const resData = await res.json();
      setData(resData.results);
      const secondDataPromises= resData.results.map((data)=> fetch(data.url).then ((res)=> res.json()));
      const resData2 = await Promise.all(secondDataPromises);
      setData2(resData2);
   
    } catch (error) {
      console.log(error.message);
    }
   }
   fetchData()
  },[])
  return (
    <div className='container'>
      <div className='card'>
      {data.map((item, index) => {
          return (
            <div className='item' key={item.url}>
              <div className='name'>{item.name}</div>
              <img className='image' src={data2[index]?.sprites.front_default} alt={item.name} />
              <div className='data'>
              <div>Base_experience: {data2[index]?.base_experience}</div>
              <div>Height: {data2[index]?.height}</div>
              <div>Weight: {data2[index]?.weight} Kg</div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  )
}

export default Pokemon