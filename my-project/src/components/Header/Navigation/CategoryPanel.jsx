import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FiMinusSquare } from "react-icons/fi";





const CategoryPanel = (props) => {

    const [submenuIndex, setSubmenuIndex] = React.useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = React.useState(null);

    const toggleDrawer = (newOpen) => () => {
        props.setIsOpenCategoryPanel(newOpen);
    }

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

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" className="catagoryPanel">
            <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>Shop By Categories<IoCloseSharp className=' text-[20px] cursor-pointer' onClick={toggleDrawer(false)} /></h3>

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

        </Box>
    );

    return (
        <>

            <Drawer open={props.isOpenCategoryPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}
export default CategoryPanel;