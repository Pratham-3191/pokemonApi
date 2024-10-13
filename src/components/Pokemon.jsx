import React, { useState, useEffect } from 'react';

function Pokemon() {
  const [data, setData] = useState([]); 
  const [data2, setData2] = useState([]);
  const [nextUrl, setNextUrl] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const initialUrl = "https://pokeapi.co/api/v2/pokemon"; 
  console.log(data)

  const fetchData = async (url) => {
    try {
      setLoading(true); 
      const res = await fetch(url);
      const resData = await res.json();

      
      setNextUrl(resData.next);

      const secondDataPromises = resData.results.map((item) => fetch(item.url).then((res) => res.json()));
      const resData2 = await Promise.all(secondDataPromises);

      
      setData(prevData => [...new Set([...prevData, ...resData.results.map(item => item.name)])]);  
      setData2(prevData2 => [...prevData2, ...resData2]); 

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(initialUrl); 
  }, []);

  const handleLoadMore = () => {
    if (nextUrl) {
      fetchData(nextUrl);
    }
  };
  return (
    <div className='container'>
      <div className='card'>
        {data.map((item, index) => {
          return (
            <div className='item' key={item}>
              <div className='name'>{item}</div>
              <img className='image' src={data2[index]?.sprites.front_default} alt={item.name} />
              <div className='data'>
                <div>Base_experience: {data2[index]?.base_experience}</div>
                <div>Height: {data2[index]?.height}</div>
                <div>Weight: {data2[index]?.weight} Kg</div>
              </div>
              {loading && <p>Loading...</p>}
            </div>
          );
        })}
        {nextUrl && !loading && (
          <button className='load' onClick={handleLoadMore}>Load More</button> 
        )}
      </div>

    </div>
  )
}

export default Pokemon