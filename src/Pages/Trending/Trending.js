import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './trending.css'

export default function Trending() {
  const [page,setPage]=useState(1);
  const [content,setContent]=useState([]);
  async function fetchTrending(){
    const {data}=await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      // console.log(data.results);
      setContent(data.results)
  }


  useEffect(()=>{
  async function res(){
    window.scroll(0,0);
await fetchTrending()
 
  }
res()
// eslint-disable-next-line
  },[page])
  return (
    <div>
   <span className='pageTitle'>Trending</span>
   <div className='trending'>
   {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
   </div>
   <CustomPagination setPage={setPage}/>
   </div>
  )
}
