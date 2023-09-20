"use client";


import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '@/app/Components/MovieCard';

import {Pagination} from "@nextui-org/react";
import { changUpcomingPage } from '@/store/Reducers/upComMoviesReducer';
import { asyncUpcomingMovies } from '@/store/Actions/upComMovieAction';



const page = () => {
    const dispatch = useDispatch()
    const {movies,page, errors} = useSelector(state => state.upComMovieReducer)

    useEffect(()=>{
        dispatch(asyncUpcomingMovies())
    },[page])

    

    const funky = (e)=>{
        dispatch(changUpcomingPage(e))
        console.log("this is from page " , e)
    }


  return (
    <>
     <div className="mt-10 w-[100vw] min-h-[100vh]">
        <div className=" min-h-[100vh] mx-auto sm:w-[80vw] mt-5">
          <div className=" font-black text-3xl font-bold p-5">Here's Trending Movies </div>

        <Suspense
        fallback={
          <div className="text-3xl text-black">loading</div>
        }
      
        />
    
          <div className=" mt-10 w-full h-full grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-10 px-28
           ">
      
            {movies && movies.map((items) => <MovieCard key={items.id} items={items} />)}

          </div>




          <div className="p-10 flex items-center justify-center ">
            <div className="">
            <Pagination total={10} initialPage={1} 
             onChange={funky}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page