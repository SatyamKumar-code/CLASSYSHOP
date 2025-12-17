import React from 'react'

const Progress = (props) => {
  return (
    <div className='w-[150px] h-auto overflow-hidden rounded-md bg-[#f1f1f1]'>
        <div className={`flex items-center w-[${props.value}%] h-[8px] ${props.type==='success' && 'bg-green-500'} ${props.type==='error' && 'bg-pink-700'} ${props.type==='warning' && 'bg-orange-400'}`} ></div>
    </div>
  )
}

export default Progress;