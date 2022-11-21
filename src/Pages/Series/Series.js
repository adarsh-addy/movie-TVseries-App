import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";

export default function Series() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  async function fetchSeries(){
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    // console.log(data);
  }


  useEffect(()=>{
  async function res(){
    window.scroll(0,0);
await fetchSeries()
 
  }
res()
// eslint-disable-next-line
  },[genreforURL,page])
  return (
    <div>
       <span className='pageTitle'>Series</span><div className='trending'>
       <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
    {content &&
           content.map((c) => (
             <SingleContent
               key={c.id}
               id={c.id}
               poster={c.poster_path}
               title={c.title || c.name}
               date={c.first_air_date || c.release_date}
               media_type='tv'
               vote_average={c.vote_average}
             />
           ))}
    </div>
    {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
      </div>
   
  )
}
