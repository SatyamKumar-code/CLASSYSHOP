import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";

export const CategoryCollapse = () => {

    const [submenuIndex, setSubmenuIndex] = React.useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = React.useState(null);

    const openSubmenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
        } else {
            setSubmenuIndex(index);
        }
    };

    const openInnerSubmenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
        } else {
            setInnerSubmenuIndex(index);
        }
    };


  return (
      <>
          <div className='scroll'>
              <ul className='w-full'>
                  <li className='list-none flex items-center relative flex-col'>
                      <Link to={"/"} className='w-full'>
                          <Button className='w-full !text-left !text-[rgba(0,0,0,0.8)] !justify-start px-3'>Fashion</Button>
                      </Link>
                      {
                          submenuIndex === 0 ?
                              <FiMinusSquare
                                  className='absolute top-[10px] right-[15px] cursor-pointer'
                                  onClick={() => openSubmenu(0)}
                              />
                              :
                              <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer'
                                  onClick={() => openSubmenu(0)} />

                      }

                      {
                          submenuIndex === 0 && (
                              <ul className='submenu w-full pl-3'>
                                  <li className='list-none relative'>
                                      <Link to={"/"} className='w-full'>
                                          <Button className='w-full !text-left !text-[rgba(0,0,0,0.8)] !justify-start px-3'>Apparel</Button>
                                      </Link>

                                      {
                                          innerSubmenuIndex === 0 ?
                                              <FiMinusSquare
                                                  className='absolute top-[10px] right-[15px] cursor-pointer'
                                                  onClick={() => openInnerSubmenu(0)}
                                              />
                                              :
                                              <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer'
                                                  onClick={() => openInnerSubmenu(0)} />
                                      }

                                      {
                                          innerSubmenuIndex === 0 && (
                                              <ul className='inner_submenu w-full pl-3'>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Smart Tablet</Link>
                                                  </li>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Crepe T-Shirt</Link>
                                                  </li>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Leather Watch</Link>
                                                  </li>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Rolling Dianond</Link>
                                                  </li>
                                              </ul>
                                          )
                                      }


                                  </li>
                              </ul>

                          )}


                  </li>

                  <li className='list-none flex items-center relative flex-col'>
                      <Link to={"/"} className='w-full'>
                          <Button className='w-full !text-left !text-[rgba(0,0,0,0.8)] !justify-start px-3'>Outerwear</Button>
                      </Link>
                      {
                          submenuIndex === 1 ?
                              <FiMinusSquare
                                  className='absolute top-[10px] right-[15px] cursor-pointer'
                                  onClick={() => openSubmenu(1)}
                              />
                              :
                              <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer'
                                  onClick={() => openSubmenu(1)} />

                      }

                      {
                          submenuIndex === 1 && (
                              <ul className='submenu w-full pl-3'>
                                  <li className='list-none relative'>
                                      <Link to={"/"} className='w-full'>
                                          <Button className='w-full !text-left !text-[rgba(0,0,0,0.8)] !justify-start px-3'>Apparel</Button>
                                      </Link>

                                      {
                                          innerSubmenuIndex === 1 ?
                                              <FiMinusSquare
                                                  className='absolute top-[10px] right-[15px] cursor-pointer'
                                                  onClick={() => openInnerSubmenu(1)}
                                              />
                                              :
                                              <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer'
                                                  onClick={() => openInnerSubmenu(1)} />
                                      }

                                      {
                                          innerSubmenuIndex === 1 && (
                                              <ul className='inner_submenu w-full pl-3'>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Smart Tablet</Link>
                                                  </li>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Crepe T-Shirt</Link>
                                                  </li>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Leather Watch</Link>
                                                  </li>
                                                  <li className='list-none relative mb-1'>
                                                      <Link to={"/"} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>Rolling Dianond</Link>
                                                  </li>
                                              </ul>
                                          )
                                      }


                                  </li>
                              </ul>

                          )}


                  </li>

              </ul>
          </div>
      </>
  )
}
