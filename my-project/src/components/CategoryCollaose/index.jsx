import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";

export const CategoryCollapse = (props) => {

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
{
    props?.data?.length !== 0 && props?.data?.map((cat, index) => {
        return (
            <li className='list-none flex items-center relative flex-col' key={index}>
                <Link to={`/products?catId=${cat?._id}`} className='w-full'>
                    <Button className='w-full !text-left !text-[rgba(0,0,0,0.8)] !justify-start px-3'>{cat?.name}</Button>
                </Link>
                <div 
                    className='absolute w-[30px] h-[30px] top-[10px] flex items-center justify-center right-[15px] cursor-pointer'
                    onClick={() => openSubmenu(index)}
                >
                    {
                        submenuIndex === index ?
                            <FiMinusSquare
                            />
                            :
                            <FaRegSquarePlus
                            />
                    }
                </div>

                {
                    submenuIndex === index && (
                        <ul className='submenu w-full pl-3'>
                            {
                                cat?.Children?.length !== 0 && cat?.Children?.map((subCat, index_) => {
                                    return (
                                        <li className='list-none relative' key={index_}>
                                            <Link to={`/products?subCatId=${subCat?._id}`} className='w-full'>
                                                <Button className='w-full !text-left !text-[rgba(0,0,0,0.8)] !justify-start px-3'>{subCat?.name}</Button>
                                            </Link>
                                            <div
                                                className='absolute w-[30px] h-[30px] top-[10px] flex items-center justify-center right-[15px] cursor-pointer'
                                                onClick={() => openInnerSubmenu(index_)}
                                            >
                                                {
                                                    innerSubmenuIndex === index_ ?
                                                        <FiMinusSquare 
                                                        />
                                                        :
                                                        <FaRegSquarePlus 
                                                        />
                                                }
                                            </div>

                                            {
                                                innerSubmenuIndex === index_ && (
                                                    <ul className='inner_submenu w-full pl-3'>
                                                        {
                                                            subCat?.Children?.length !== 0 && subCat?.Children?.map((thirdLavelCat, index__) => {
                                                                return (
                                                                    <li className='list-none relative mb-1' key={index__}>
                                                                        <Link to={`/products?thirdsubCatId=${thirdLavelCat?._id}`} className=' link w-full !text-left !justify-start px-3 transition text-[14px]'>{thirdLavelCat?.name}</Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                )
                                            }


                                        </li>
                                    )
                                })
                            }

                        </ul>

                    )}


            </li>
        )
    })
}


</ul>
</div>
</>
)
}
