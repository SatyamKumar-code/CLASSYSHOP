import React from 'react'

const Badge = (props) => {
  return (
    <span className={`inline-block py-1 px-4 text-[11px] rounded-full capitalize 
        ${props.status === "pending" && "bg-pink-500 text-white"}
        ${props.status === "confirm" && "bg-green-500 text-white"}
        ${props.status === "delivered" && "bg-green-700 text-white"}
        ${props.status === "cancelled" && "bg-red-500 text-white"}
        ${props.status === "refund" && "bg-yellow-500 text-white"}
        ${props?.status === "shipped" && "bg-blue-500 text-white"}`}
        
        
        >{props.status}</span>
  )
}

export default Badge;