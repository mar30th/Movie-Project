import React, { useEffect } from 'react'
import MovieBanner from '../module/MovieBanner'
import MovieList from '../module/MovieList'
import TheaterList from '../module/TheaterList'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);    
  })

  return (
    <div>
      <MovieBanner />
      <MovieList />
      <TheaterList/>
    </div>
  )
}

export default Home