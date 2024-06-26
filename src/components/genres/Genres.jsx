import React from 'react'
import { useSelector } from 'react-redux'
import './style.scss';

function Genres({data}) {

    const{ genres }=useSelector((state)=>state.home)

  return (
    <div className='genres'>
      {
        data?.map((g)=>{
            if(genres && !genres[g]?.name) return;
            return (
                <div key={g} className="genre">
                    {genres && genres[g]?.name}
                </div>
            )
        })
      }
    </div>
  )
}

export default Genres
