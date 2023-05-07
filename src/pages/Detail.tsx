import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import MovieDetail from '../module/MovieDetail';
import ShowTimeDetailByMovie from '../module/ShowTimeDetail';

const Detail = () => {
  return (
    <div>
      <MovieDetail />
      <ShowTimeDetailByMovie />
    </div>
  )
}

export default Detail