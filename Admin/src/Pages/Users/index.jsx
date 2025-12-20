import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { MdLocalPhone, MdOutlineMarkEmailRead } from 'react-icons/md';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { SlCalender } from 'react-icons/sl';




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const columns = [
    { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
    { id: 'userName', label: 'USER NAME', minWidth: 100 },
    {
        id: 'userEmail',
        label: 'USER EMAIL',
        minWidth: 150,
    },
    {
        id: 'userPh',
        label: 'USER PHONE NO',
        minWidth: 130,
    },
    {
        id: 'createdDate',
        label: 'CREATED',
        minWidth: 130,
    },
];

const Users = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const context = useContext(MyContext);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <>


            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>


                <div className='flex items-center w-full px-5 justify-between'>
                    <div className='col w-[40%]'>
                        <h2 className='text-[18px] font-[600]'>Users List <span className='font-[400] text-[14px]'>(Material Ui Table)</span></h2>

                    </div>

                    <div className='col w-[40%] ml-auto'>
                        <SearchBox />
                    </div>


                </div>
                <br />

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
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[70px]'>
                                        <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                            <Link to="/product/45745">
                                                <img src='data:image/jpeg;base64,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'
                                                    className='w-full group-hover:scale-105 transition-all'
                                                />
                                            </Link>
                                        </div>

                                        
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Vikash kumar
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdOutlineMarkEmailRead /> vikash@gmail.com</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdLocalPhone /> +91-987485949</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><SlCalender /> 10-12-2025 </span>
                                </TableCell>
                                

                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[70px]'>
                                        <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                            <Link to="/product/45745">
                                                <img src='data:image/jpeg;base64,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'
                                                    className='w-full group-hover:scale-105 transition-all'
                                                />
                                            </Link>
                                        </div>

                                        
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Vikash kumar
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdOutlineMarkEmailRead /> vikash@gmail.com</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdLocalPhone /> +91-987485949</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><SlCalender /> 10-12-2025 </span>
                                </TableCell>
                                

                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[70px]'>
                                        <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                            <Link to="/product/45745">
                                                <img src='data:image/jpeg;base64,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'
                                                    className='w-full group-hover:scale-105 transition-all'
                                                />
                                            </Link>
                                        </div>

                                        
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Vikash kumar
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdOutlineMarkEmailRead /> vikash@gmail.com</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdLocalPhone /> +91-987485949</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><SlCalender /> 10-12-2025 </span>
                                </TableCell>
                                

                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[70px]'>
                                        <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                            <Link to="/product/45745">
                                                <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QEBUSExESEhAXGBIYEBIVExUXGBcWFRIWGRUbFhUYHCggGB0lHRMTITEhJSkrLi8vGCAzODMsNygtLisBCgoKDg0OGxAQGjcmICUuLSs2MC8tLjUtLS0tLS0tLS0tLS0tLS01LS0tLS0tLS0tLS0vKy0tLS0tLS0tLS01Lf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCCAH/xABAEAACAgEBBQUFBgMHAwUAAAAAAQIDEQQFEiExQQYTUWFxByIygaEjQnKRsfBiosEzQ1KDstHhFGPCNHOCktL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEBQEG/8QAJBEBAAICAgICAgMBAAAAAAAAAAECAxEEMRIhQYFRYRMiUjL/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa+0NbXp6p3WS3a4Rcpy8Ell8Or8jNZZGKcpNKKTcm3hJJZbb6ID0Ciu0HtC1lusldprp1Ux92mv7sorjvWQksOUufFZSwlh5bk/Zv2s1yxDW191Ll31acoP8UOMofLe+R7pOaTCzgRzT9uNmz1P/TLUQVjUHVJtd3apxUl3dud2T97G7lPKfAkZ4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAABr6vXVUutWSUe8mq689ZuMpKPq1FmwVv7aLmqtNFNr7SySaeGnCKSaa5P32eTOkq18p0/PbNtZxqq0if9o3Zb+GDxBNeDk8/5Zx+0nbXvtkUUxl9vanDVeKjVhSz4d57r/C5Ihm29u3a25Tuadka6695feUM8Wujbk28cM55cjQZ5v20VpHjG2vCXGXr+/wBAzHVL32vHP6mRl0IsVtaksNcCS9k/aPr9nNVzb1OmXDurJPeiv+1ZzX4XlcMLd5kdZraiGVnqjRERPqWe/wCYfS/ZXthotpQzRZ9olmymfu2Q9Y9V/FHK8zvnyBTbOElOEpQsi8wnCTjKL8YyjxT9CzuyftivqxXroO+HLv61FWr8cOEZ+q3X6srvgmPdUIvHyvEHJ2B2l0OvjvabUV28MygnicfxVvEo/NHWM8xpMAAAAAAAAAAAAAAAAAAAAAAAAK39tSj3OneVvb9iUc8WnBZaXgmorP8AEvEsgoT2ia+d20b95txrl3da6RjBLOPWW8/mRt0twxuyG6huM8/M2IWKSyjzqVHdbk8Jcc+BIuyvs/1upxZZnS0PrOLdk1/DVwwufvSx4pSQmaxXcrp3Eolf7s8/MzJ54k82n7LrsPutTVN/dVkJV/JuO/8AocOfs/2pXyrqs8oXR+m/ukq58c/KM0tE9I8zGyQPsdtLrpZL/Mpf6WHmPYzaTf8A6ZrzdtK/8zRXLT/UKrY7fhEprizwSzaPYTXU195uQt570K5OU4rHPd3VvekW2RWb88mnHetv+ZZMlJr3Cw/YhsKd20P+qcX3WnjPE+jtsg4qKfXEJTb8Mx8UX8UF7Iu2t+m1FWhmlZpbZuMF96qybbzF9YuXOL8cp8079MvI35+1mPWvQAChMAAAAAAAAAAAAAAAAAAAAACgfaHR3e09SujlGS89+uEn9W/yL+Kc9sej3dbXZ0sqS9ZVzln6TgRt0uwzqzX9lOzq7dRbbOEZuqNfd7yT3ZzlLEo55SSrks+ZaMyG+ybSuOkssa/tLWo+cYRS/wBTmvkTKRgzTuzTHbDM15mxMwTM6+jDIxSMsjFInVbLGyp/atoIV6qu2MVHvYS38JLM4T96TxzbU4ZfkWyyCe1nROemqtSy67GpPwjZB5b/APlXBerR0uHbWSGHmV3jlF/ZXpHbtjSrGVGVk5eShVNp/wD23F8z6YKP9g+hzrb7eOK6YpPo3dNYfy7ia+bLwNfInd3Pxx6AAUJgAAAAAAAAAAAAAAAAAAAAAVz7adJvaWm5LLrscX5Rsg2/5q4L5lg6qTUHj98SGdt9L3uz9RHqoOa9amp/+GPmU5MsVmK/ldhpv+zobOrjpdFWq65zUKobtcEnOcnFN82lmUm222lxbeCD7W0PabVyc1ZToa/uURvakl/FbXCTlLz3kvBIsDY96s01E4/DKqqS9JVxa/Uw7eots0l8KZbmplXNUWZxuzx7vHpx69Mmet/G3x9rJruPanNd2f7SV/3+rt86toTf0lZGX0LV2O7npaHdnv8Auqe/zhPvO7jv5S4Z3s8iPdgtjbSonc9fdOcHCKpi7pWtTy8vyWMLzz5ErjyR5ysk21X19LuPSI9xv7c/bs7Vpb3Tnv1Vb3OEm+83HuYT4N72CqdHsLtFN8b9TV52a+S/ljZKX0Lg1Hwv99SJdu9j7QuspegulCtQauXeup95vc/NY4YXh5kuLk8dx6+0uTSJ1Pv6c3Zuj7RaaSlKdOtr+9S7vea/htshFxfq2vJkp2tTHUaO2M4SgpVTbjJLejKMXJZw2sqST4ZXDqjc2ZS69LTCxueojCCvsb+KeOPr69TX21coaa+b5Rquk/SNUn/Qvi+7/H0q8NUnv7aXsF0yjobbniLuvags841wiuGf4nYWeVR2Q0vdaDTQxh93GTXnbmyX1myy9j2SlRBy4vD4+jaX0SNF7eVplj8PGsNwAEXgAAAAAAAAAAAAAAAAAAAAA/JRysHD1dHxQlyeU/RrH6M7prazTb6yviX1KM+PzjcdwtxX8Z99Ih7PrnLZ1MZfHV3lUvJ1WSiv5VE70yG+zjVrvdo6frXq7pJeUrJ1vHzo+pMpmPLGrS01a17wjDjgfuplnlxSznya55OVdt/TwnuTtqi28RXewcm/DcznPpkp1MtNem9cuDMaeVk58e0GmnNwhbVJptTXewUk/Du872fXBt0z6ePw+efAnETC34ZJMjvb26Udn3qPx2KFUF53WRg/pKX5EhZDPaFqM27P0652aumTXlCcYLPzv/lNvHjd4ZOROqSluk0jnONcPReSXX5JE4qrUYqK5JJL0SOfsbZncpuWHY+eOi8F+/0OmaIYcltz6AAeoAAAAAAAAAAAAAAAAAAAAAAAAKL0G2K9n7e1Tslu02W6iNj6R7y3vIyfknwb6KTZO+3m05abZ191cmp7sI1zi+KdtkK1KL8t/KfkVj7VNn2U7Uuco4hbu2VS6Si4RjLj4qUZJr0fVHK03aLUrR2aKX2umnFbsXnNUozjOLhL/DmK918PDHHNV8PlaLNFbahr6PZGv1tLlHfuohLcancmotKMuEJz4LE08pY5+Z19ldi7t6O/KquKacveUpYT5JR4fU8ez7b9ekunXdLdouSTk/hhOOd1y8ItSkm/w54JtSTtftWnROvdjK3vVKUd2Ud1RjjlLjnO8v8AcjlyZYv4Vhow0wzXyvKN7Y7F3b0nCVVkW245koy4vk1Lh9Th63ZOu0dO9LfpplJRShekpNpy+CE+PwN8V0J12W2tTrHZmEq+7UXLMo7rUsrjLhjl/wAkY7f7chqrYV1SUqak/ej8M5yxnd8VFJJPrmWOGG54cmWb+FoR5GPDFPKkrI7E7RnqdBTbY8zxOM5N8W6rJQ3m/FqCbfi2QbX7XhrtvaPupb1Nd+khCXSW5qFOco+Tbaz1UUyN39o73o4aKH2enipd5uvMrXOyU5b8ukcy+BfNvp1PZVs2zUbW0+5HMapO22XSMYReG/WTil6+TNOPD4Ta8/tky5vOIq+mgAVIAAAAAAAAAAAAAAAAAAAAAAAAAAAj3bjsvVtLSuuTULY5lRbjO5PHXxi+TXz5pNfPm0NFPSzlVbGUbIvElhcHjg1xw01xT8z6b1Ooik1zfFcCEdsOzFOvhifuWxz3VyWXHya+9Hy/JplNs9aW1LRjxzaFDWSy2+WTDhI7faDs5q9E33tb7vpdHMq2vxfdfHlLD9eZw5TSxlpZ5cefoaazExuELRqXmSyfgdkePFcOfFcPU6uxOzuq1jXdVvu+t08xrS8pY970jlk9xEblDUzOoc/R6OzUWRqqi52yeIxXXxbfRJcW3wSTZ9LezzspTs3SRjHE7rFGeotx8cmuCWeUYp4S9XzbIb2Z7N0aCDUPftkvtbmsOXXEV9yOenplvgWDsnbFTjGuT3JJRjl8nhY59PmVTni86jpO2C1I3LsgA8VAAAAAAAAAAAAAAAAAAAAAADHffCuO9KSivF/viRzafaCT92r3V/jfxP0XT98iVazbpG1ojt2to7UqoXvv3ukFxk/l09WVt2o7X6qV27l11QcJxrg8OajJNb0+b4prHJm/fNvi285y3nLfz6s4O39N3kN5L3of6eq/r8i+MMaVRl/ssrvIzipReYyScX4prKf5MxTI32B2uraO4k/tKvh86m/da/D8Ppu+JJJnCzUmlprLr4p3G2tZX4cDUlp8LdUY7vHgkscefA35mGRTtpq0JUcMbq3fDCxw5cD8lCXgzcZ5ZOJlY0pRa6HhtLi+C6vyM+ol0I52u2iqqHWn79mV6Q++/n8PzfgbcFZtaIhmz2itZmXC7P8AbTX6a6UoSc6JznN0WvMUpScvcfOt8enDxTZbXZztdpNbiMZd3d1pnhS8918pr04+KRR9NeFl83+h6sfXqsNPzT4P1O7bi1tH4l89/PMT+n0cCn+zftG1GnxXqVLUU8t/P2sV6vhZ88PzfItHY+2NNq6+8osjZH72OEovwnF8YvyaMOTDfH200yVv03wAVLAAAAAAAAAAAAAAAAEa7RaaSmptylGXCP8AC+q8vH8zi2x4ZXzRO76Yzi4yWUyHbU0sqZbr653ZeK8f+C/HbfpRkr8uVqORqWcjav5GrZyNNVEo/erNJdG+l4w8rwWecZLrF/voWFsTbdWsr3oe7NY7ypvjF/1j4S/R8CK2RTTTWU+aOFfobaJq2mUk1xTi/ej/APpftmblcSMsbjtr4/J8PUrUmYpEL2b28aW7qKt7/uV4T+cHw/Jr0O1X2r0M/wC+3X4ShNfXdx9TjX4uWk+6uvjz45+XWZjskksnJ1HanRRX9rvPwjGb+uMHD1vamyzhRU//AHLMYXpFPH1+RLFxct59VSvycVI3NnY2vtSvTw35v3nncgucn5eC8X0/JEFvsnfY7bOb5LokuSS6Jf8AJmlVKUnOyTssfNv+i/aPyfM7/E4kYo3Pbh8vmTlnUdMNpgsM1pgsN7nsbgsbzzjkkurJf7M9izv1aui7Kq6X9q4ya33jMa8rmnwbXHgl4pnG7ObJs1tqorXFNSlNrhCOeMpf7dfqrx2PsyrS0xprWIx5vrKT+KUn1bZk5WbxjxjuWjBj3Pk3QAcxuAAAAAAAAAAAAAAAADX1ukhdBwmuHR9U/FM2ABAds7NsoeJcYt+7Ncn/ALPyORZyLStrjJOMkpRfNNZT+RFtr9lHxlQ/8uT/ANMn+j/M1Y80dWZ74p7hD5GORsamidb3ZxlCXhJY/LxXma8jVDPLSv0lc/iim/Hk/wA0ac9l1L/F+f8AwdNmG0lqDymGlDSVx5RXz4/qZmfrPxkohGZmWuzBZzM7PNWnnbPcrhKc3yjFNv8AJE96Radp09jdmr9bPcq4JP7SyS92C88c34R5vyXEmHZ/2fTeJ6qW5Hn3UH70uC4TmuEVz4LPPmiwNJpa6YKuuEYQjwjGKwv35mXLy4j1Rox8eZ92aPZ3YNGhpVVS87Jv4py8ZP8ARckdQA58zMzuWuI16gAB49AAAAAAAAAAAAAAAAAAAAAGLU6auyO7OEZx8JJP9Tg63sdp5/BKdT8E96P5S4/UkYJVvNepRmsT2gWo7D6hfBbVP8W9D6JSNC7sdrukIS9Jr+uCzAWxyLoThqq6PYzXv+7ivWyP9Mm3p+wOpfx21QXlvTf5YX6ljA9nk5Hn8FEQ0Ps/0sONs7LX1WdyP5R97+Yk2h0FNEd2quFceqjFLPm/F+bNkFVslrdysrSteoAAQSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/9k='
                                                    className='w-full group-hover:scale-105 transition-all'
                                                />
                                            </Link>
                                        </div>

                                        
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Vikash kumar
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdOutlineMarkEmailRead /> vikash@gmail.com</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdLocalPhone /> +91-987485949</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><SlCalender /> 10-12-2025 </span>
                                </TableCell>
                                

                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[70px]'>
                                        <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                            <Link to="/product/45745">
                                                <img src='data:image/jpeg;base64,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'
                                                    className='w-full group-hover:scale-105 transition-all'
                                                />
                                            </Link>
                                        </div>

                                        
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Vikash kumar
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdOutlineMarkEmailRead /> vikash@gmail.com</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdLocalPhone /> +91-987485949</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><SlCalender /> 10-12-2025 </span>
                                </TableCell>
                                

                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className='flex items-center gap-4 w-[70px]'>
                                        <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                            <Link to="/product/45745">
                                                <img src='data:image/jpeg;base64,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'
                                                    className='w-full group-hover:scale-105 transition-all'
                                                />
                                            </Link>
                                        </div>

                                        
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Vikash kumar
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdOutlineMarkEmailRead /> vikash@gmail.com</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><MdLocalPhone /> +91-987485949</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className='flex items-center gap-2'><SlCalender /> 10-12-2025 </span>
                                </TableCell>
                                

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </div>

        </>
    )
}

export default Users;