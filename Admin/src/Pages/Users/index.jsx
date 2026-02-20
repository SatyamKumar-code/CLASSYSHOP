import React, { useContext, useEffect, useState } from 'react'
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
import { editData, fetchDataFromApi } from '../../utils/api';
import UserTableSkeleton from '../../Components/Skeleton/UserTableSkeleton';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'





const columns = [
    { id: "status", label: "STATUS", minWidth: 20 },
    { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
    { id: 'userName', label: 'USER NAME', minWidth: 100 },
    {
        id: 'userEmail',
        label: 'USER EMAIL',
        minWidth: 150,
    },
    {
        id: 'emailVerify',
        label: 'EMAIL VERIFY',
        minWidth: 20,
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
    const [userData, setUserData] = useState([]);
    const [userTotalData, setUserTotalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState('');

    const context = useContext(MyContext);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    const getUsers = () => {
        fetchDataFromApi('/api/user/getAllUsers').then((res) => {
            setUserTotalData(res?.users);
            setUserData(res?.users);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        if(searchQuery !== "") {
            const query = searchQuery?.toLowerCase();
            const filteredUsers = userTotalData?.filter((user) => {
                const isVerified = user?.verify_email === true;
                const verifyMatch = 
                    (query.includes('verified') && isVerified) ||
                    ((query.includes('not') || query.includes('unverified')) && !isVerified);
                
                return (
                    user?._id?.toLowerCase()?.includes(query) ||
                    user?.name?.toLowerCase()?.includes(query) ||
                    user?.email?.toLowerCase()?.includes(query) ||
                    String(user?.mobile)?.toLowerCase()?.includes(query) ||
                    user?.createdAt?.toLowerCase()?.includes(query) ||
                    user?.status?.toLowerCase() === query ||
                    verifyMatch
                );
            });
            setUserData(filteredUsers);
            setIsLoading(false);
        }else {
            setIsLoading(false)
            setUserData(userTotalData);
        }
    }, [searchQuery, userTotalData])

    useEffect(() => {
        setIsLoading(true);
        getUsers();
        setTimeout(() => {
            setIsLoading(false);
        }, 500)

    },[])

    

    const handleChange = (event, id) => {

        console.log(id);
        
        const newStatus = event.target.value;
        setStatus(newStatus);

        const obj = {
            id: id,
            status: newStatus
        }

        editData(`/api/user/updateUserStatus/${id}`, obj).then((res) => {
            if (res?.data?.error === false) {
                context?.alertBox("Success", res?.data?.message)
                setStatus(newStatus);
                getUsers();
            }
        })
    };


    return (
        <>


            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>


                <div className='flex items-center w-full px-5 justify-between'>
                    <div className='col w-[40%]'>
                        <h2 className='text-[18px] font-[600]'>Users List</h2>
                    </div>

                    <div className='col w-[40%] ml-auto'>
                        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>


                </div>
                <br />

                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <span className='whitespace-nowrap'>{column.label}</span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading === true ? (
                                    <UserTableSkeleton rowsPerPage={rowsPerPage} />
                                ) : userData?.length !== 0 ? userData?.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )?.reverse().map((user, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell style={{ minWidth: columns.minWidth }}>

                                               
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={user?.status !== null ? user?.status : status }
                                                    label="Status"
                                                    onChange={(e) => handleChange(e, user?._id)}
                                                    className={user?.status === "Active" ? 'text-green-500! min-w-26' : 'text-red-500! max-w-26'}
                                                >
                                                    <MenuItem value={"Active"} className='text-green-500!'>Active</MenuItem>
                                                    <MenuItem value={"Inactive"} className='text-red-500!'>Inactive</MenuItem>
                                                </Select>
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className='flex items-center gap-4 w-[70px]'>
                                                    <div className='img w-[45px] h-[45px] rounded-md overflow-hidden group'>
                                                        <Link to={`/user-profile`} data-discover="user-profile" state={user}>
                                                            <img src={user?.avatar !== "" && user?.avatar !== null && user?.avatar !== undefined ? user?.avatar : '/user.png'}                                                            />
                                                        </Link>
                                                    </div>


                                                </div>
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                {user?.name}
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <span className='flex items-center gap-2'><MdOutlineMarkEmailRead /> {user?.email}</span>
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <span className='flex items-center gap-2'>

                                                    {user?.verify_email === true ? (
                                                        <span className=" text-green-500">Verified</span>
                                                    ) : (
                                                        <span className=" text-red-500">Not Verified</span>
                                                    )
                                                    }
                                                </span>
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <span className='flex items-center gap-2'>{user?.mobile === null || user?.mobile === undefined || user?.mobile === "" ? "N/A" : (<>
                                                    <MdLocalPhone /> +{user?.mobile}
                                                </>)}</span>
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <span className='flex items-center gap-2'><SlCalender /> {user?.createdAt.split("T")[0]}</span>
                                            </TableCell>


                                        </TableRow>
                                    )
                                }) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + 1} align="center">
                                            No users found
                                        </TableCell>
                                    </TableRow>
                                )
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={userData?.length || 0}
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