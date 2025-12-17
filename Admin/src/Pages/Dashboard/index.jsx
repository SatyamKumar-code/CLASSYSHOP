import React, { useState } from 'react'
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa6';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Badge from '../../Components/Badge'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../Components/ProgressBar';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from 'react-icons/go';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  {
    id: 'subCategory',
    label: 'SUB CATEGORY',
    minWidth: 150,
  },
  {
    id: 'Price',
    label: 'PRICE',
    minWidth: 130,
  },
  {
    id: 'sales',
    label: 'SALES',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'ACTION',
    minWidth: 120,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];





const Dashboard = () => {


  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className='w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
        <div className='info'>
          <h1 className='text-[35px] font-bold leading-10 mb-3'>Good Morning, <br /> Cameron👋 </h1>
          <p>Hear's What happening on your store today. See the statistics at once.</p>
          <br />
          <Button className="btn-blue capitalize!"><FaPlus /> Add product</Button>
        </div>

        <img src="/shop-illustration.webp" className='w-[250px]' />
      </div>
      <DashboardBoxes />

      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5'>
          <h2 className='text-[18px] font-[600]'>Products <span className='font-[400] text-[14px]'>(Tailwind Css Table)</span></h2>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 pr-0 py-3" width="10%">
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </th>
                <th scope="col" className="px-2 py-3 whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sub Category
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  SALES
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>

              </tr>
            </thead>
            <tbody>
              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>

              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>



              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>




              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>





              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>







              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>




              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>




              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 pr-0 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-0 py-2'>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </td>

                <td className='px-6 py-2'>

                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </td>


              </tr>




            </tbody>
          </table>
        </div>


        <div className='flex items-center justify-end pt-5 pb-5 px-4'>
          <Pagination count={10} color="primary" />
        </div>

      </div>




      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5'>
          <h2 className='text-[18px] font-[600]'>Products <span className='font-[400] text-[14px]'>(Material Ui Table)</span></h2>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size='small' />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{minWidth: columns.minWidth }}>
                  <Checkbox {...label} size='small' />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Women
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell style={{minWidth: columns.minWidth }}>
                  <Checkbox {...label} size='small' />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Women
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </TableCell>

              </TableRow>


              <TableRow>
                <TableCell style={{minWidth: columns.minWidth }}>
                  <Checkbox {...label} size='small' />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Women
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell style={{minWidth: columns.minWidth }}>
                  <Checkbox {...label} size='small' />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Women
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell style={{minWidth: columns.minWidth }}>
                  <Checkbox {...label} size='small' />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Women
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell style={{minWidth: columns.minWidth }}>
                  <Checkbox {...label} size='small' />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-4 w-[300px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                        <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                          className='w-full group-hover:scale-105 transition-all'
                        />
                      </Link>
                    </div>

                    <div className='info w-[75%]'>
                      <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                        <Link to="/product/45745">
                          Electronic Rubber Table
                        </Link>
                      </h3>
                      <span className='text-[12px]'>Books</span>
                    </div>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  Women
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <p className='text-[14px] w-[100px]'><span className='font-[600]'>234</span> sale</p>
                  <Progress type="warning" value={40} />
                </TableCell>

                 <TableCell style={{minWidth: columns.minWidth }}>
                  <div className='flex items-center gap-1'>
                    <Tooltip title="Edit Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="View Product Dtails" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Product" placement='top'>
                      <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                      </Button>
                    </Tooltip>



                  </div>
                </TableCell>

              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </div>








      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5'>
          <h2 className='text-[18px] font-[600]'>Recent Orders</h2>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  paymant Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-[500]">
                  <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                    onClick={() => isShowOrderdProduct(0)}>
                    {
                      isOpenOrderdProduct === 0 ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                    }
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>347593769375970703</span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>Pay_PTPQqEXFhrteyyt</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">satyam Kumar</td>
                <td className="px-6 py-4 font-[500]">6206627876</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='block w-[400px]'>H No 22 Street No 6 Adarsh MohallaMaujpur Delhi mear shivam medical ph. +91-6201391650</span>
                </td>
                <td className="px-6 py-4 font-[500]">8474707</td>
                <td className="px-6 py-4 font-[500]">3500</td>
                <td className="px-6 py-4 font-[500]">satyamkumar@gmail.com</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>8979fg7927s25r</span>
                </td>
                <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-12-13</td>

              </tr>

              {
                isOpenOrderdProduct === 0 && (
                  <tr>
                    <td className='pl-20' colSpan="6">
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>

                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Title
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Image
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Sub Total
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr>
                              <td className='bg-[#f1f1f1]' colSpan="12">

                              </td>
                            </tr>


                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )
              }


              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-[500]">
                  <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                    onClick={() => isShowOrderdProduct(1)}>
                    {
                      isOpenOrderdProduct === 1 ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                    }
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>347593769375970703</span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>Pay_PTPQqEXFhrteyyt</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">satyam Kumar</td>
                <td className="px-6 py-4 font-[500]">6206627876</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='block w-[400px]'>H No 22 Street No 6 Adarsh MohallaMaujpur Delhi mear shivam medical ph. +91-6201391650</span>
                </td>
                <td className="px-6 py-4 font-[500]">8474707</td>
                <td className="px-6 py-4 font-[500]">3500</td>
                <td className="px-6 py-4 font-[500]">satyamkumar@gmail.com</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>8979fg7927s25r</span>
                </td>
                <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-12-13</td>

              </tr>

              {
                isOpenOrderdProduct === 1 && (
                  <tr>
                    <td className='pl-20' colSpan="6">
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>

                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Title
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Image
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Sub Total
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr>
                              <td className='bg-[#f1f1f1]' colSpan="12">

                              </td>
                            </tr>


                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )
              }



            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Dashboard; 