import React from 'react'
import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

export default function Genres({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
  }) {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
      };
    
      const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };

    async function fetchGenres() {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
         setGenres(data.genres);
      }
    
      useEffect(() => {
        async function res() {
          await fetchGenres();
        }
        res();
        return ()=>{
            setGenres({});
        }
        // eslint-disable-next-line
      }, []);
  return (
    <div style={{ padding: "6px 0" }}>
    {selectedGenres && selectedGenres.map((genre) => (
      <Chip
        style={{ margin: 2 }}
        label={genre.name}
        key={genre.id}
        color="primary"
        clickable
        size="small"
        onDelete={() => handleRemove(genre)}
      />
    ))}
    {genres && genres.map((genre) => (
      <Chip
        style={{ margin: 2 }}
        label={genre.name}
        key={genre.id}
        clickable
        size="small"
        onClick={() => handleAdd(genre)}
      />
    ))}
  </div>
  )
}
