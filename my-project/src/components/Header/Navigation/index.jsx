import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import CategoryPanel from './CategoryPanel';

import "../Navigation/style.css";
import { fetchDataFromApi } from '../../../utils/api';
import { MyContext } from '../../../App';
import MobileNav from './MobileNav';


const Navigation = (props) => {

    const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
    const [catData, setCatData] = useState([]);

    const Context = useContext(MyContext);

    useEffect(() => {
        setIsOpenCategoryPanel(props?.isOpenCatPanel);
    },[props?.isOpenCatPanel]);

    useEffect(() => {
        setCatData(Context?.catData);
    }, [Context?.catData]);
    
    const openCategoryPanel = () => {
        setIsOpenCategoryPanel(true);
    }

    return (
        <>
            <nav className='navigation'>
                <div className='container flex items-center justify-start lg:justify-end gap-8'>
                    {
                        Context?.windowWidth > 922 &&
                        <div className='col_1 w-[20%]'>
                        <Button className='!text-black gap-2 w-full' onClick={openCategoryPanel}><RiMenu2Fill className='text-[18px]' /> Shop By Categories<LiaAngleDownSolid className='text-[13px] ml-auto font-bold' /></Button>
                    </div>
                    }
                    <div className='col_2 w-full lg:w-[60%]'>
                        <ul className='flex items-center gap-3 nav'>
                            <li className='list-none'>
                                <Link to={"/"} className='link transition text-[14px] font-[500]'>
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Home</Button>
                                </Link>
                            </li>

                            {
                                catData?.length !== 0 && catData?.map((cat, index) => {
                                    return (
                                        <li className='list-none relative' key={index}>
                                            <Link to={`/products?catId=${cat?._id}`} className='link transition text-[14px] font-[500]'>
                                                <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>{cat?.name}</Button>
                                            </Link>

                                            {
                                                cat?.Children?.length !== 0 &&
                                                <div className='submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                                    <ul>
                                                        {
                                                            cat?.Children?.map((subCat, index_) => {
                                                                return (
                                                                    <li className='list-none w-full' key={index_}>
                                                                        <Link to={`/products?subCatId=${subCat?._id}`} className='w-full block'>
                                                                            <Button className=' !text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>{subCat?.name}</Button>
                                                                            {
                                                                                subCat?.Children?.length !== 0 &&
                                                                                <div className='submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                                                                    <ul>
                                                                                        {
                                                                                        subCat?.Children?.map((thirdLavelCat, index__) => {
                                                                                            return (
                                                                                                <li className='list-none w-full' key={index__}>
                                                                                                    <Link to={`/products?thirdsubCatId=${thirdLavelCat?._id}`} className='w-full block'>
                                                                                                        <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>{thirdLavelCat?.name}</Button>
                                                                                                    </Link>
                                                                                                </li>
                                                                                            )
                                                                                        })
                                                                                        }
                                                                                        
                                                                                    </ul>
                                                                                </div>
                                                                            }


                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            }

                                            
                                        </li>
                                    )
                                })
                            }
                            
                            
                        </ul>
                    </div>

                    <div className='col_3 w-[20%] hidden lg:block'>
                        <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'><GoRocket /> Free International Delivery</p>
                    </div>
                </div>
            </nav>

            {/* Category Panel Component */}
            {
                catData?.length !== 0 &&
                <CategoryPanel 
                    isOpenCategoryPanel={isOpenCategoryPanel} 
                    setIsOpenCategoryPanel={setIsOpenCategoryPanel} 
                    propsSetIsOpenCatPanel={props?.setIsOpenCatPanel}
                    data={catData}
                />
            }

            {
                Context?.windowWidth < 922 && <MobileNav />
            }
            
        </>
    )
}

export default Navigation;