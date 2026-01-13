import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';


const AddRAMS = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [Ram, setRam] = useState('');
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState('');
    const [editMode, setEditMode] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
            if (res?.error === false) {
                setData(res?.data || [])
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (Ram === '') {
            context.alertBox("error", "Please enter product RAM.");
            setIsLoading(false);
            return false;
        }

        if (editId === undefined || editId === '') {
            postData(`/api/product/productRAMS/create`, {
                Ram: Ram
            }).then((res) => {
                if (res.error === false) {
                    context.alertBox("Success", res?.message);
                    setTimeout(() => {
                        getData();
                        setRam('');
                        setIsLoading(false); 
                    }, 300);
                } else {
                    context.alertBox("error", res?.message || "Failed to create RAM");
                    setIsLoading(false);
                }

            }).catch((err) => {
                context.alertBox("error", "Something went wrong!");
                setIsLoading(false);
            });
        }

        if (editId !== '') {
            // Update RAM logic here
            editData(`/api/product/productRAMS/${editId}`, {
                Ram: Ram
            }).then((res) => {
                if (res?.data?.error === false) {
                    context.alertBox("Success", res?.data?.message);
                    setTimeout(() => {
                        getData();
                        setRam('');
                        setIsLoading(false);
                        setEditId('');
                        setEditMode(false);
                    }, 300);
                } else {
                    context.alertBox("error", res?.data?.message || "Failed to create RAM");
                    setIsLoading(false);
                }

            }).catch((err) => {
                context.alertBox("error", "Something went wrong!");
                setIsLoading(false);
            });
        }
    }

    const deleteItem = (id) => {
        deleteData(`/api/product/productRAMS/${id}`).then((res) => {
            if (res?.data?.error === false) {
                context.alertBox("Success", "Items deleted successfully!");
                getData();
            } else {
                context.alertBox("error", res?.data?.message || "Failed to delete RAM");
            }
        }).catch((err) => {
            console.log(err);
            context.alertBox("error", "Something went wrong!");
        });
    }

    const editItem = (id) => {
        fetchDataFromApi(`/api/product/productRAMS/${id}`).then((res) => {
            if (res?.error === false) {
                setRam(res?.data?.Ram || '');
                setEditId(res?.data?._id || '');
                setEditMode(true);
            } else {
                context.alertBox("error", res?.message || "Failed to fetch RAM data");
            }
        }).catch((err) => {
            context.alertBox("error", "Something went wrong!");
        });
    }

    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>Add product RAMS </h2>

            </div>

            <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
                <form className='form py-3 p-6' onSubmit={handleSubmit}>
                    <div className="col mb-4">
                        <h3 className='text-[14px] font-[500] mb-1 text-black'>{editMode ? "Edit" : "Add"} Product RAM</h3>
                        <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-smp-3 text-sm'
                            name='Ram'
                            value={Ram}
                            placeholder={editMode ? 'Edit product RAM' : 'Enter product RAM'}
                            onChange={(e) => setRam(e.target.value)}
                        />
                    </div>
                    <Button type='submit' className='btn-blue btn-lg w-full flext gap-2'>
                        {
                            isLoading === true ? <CircularProgress size={20} color='inherit' />
                                :
                                <>
                                    <FaCloudUploadAlt className='text-[25px] text-white' /> Publish & View
                                </>
                        }
                    </Button>
                </form>
            </div>

            {
                data?.length !== 0 &&

                <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
                    <div className="relative overflow-x-auto mt-5 pb-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-1 00">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap" width="60%">
                                        PRODUCT RAM
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap" width="30%">
                                        ACTION
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data?.map((item, index) => {
                                        return (
                                            <tr className='odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-700' key={index}>
                                                
                                                <td className='px-6 py-2'>
                                                    <span className='font-[600]'>{item?.Ram}</span>
                                                </td>

                                                <td className='px-6 py-2'>
                                                    <div className='flex items-center gap-1'>
                                                        <Button className='!w-[35] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !min-h-[35px]'
                                                            onClick={() => editItem(item?._id)}
                                                        >
                                                            <AiOutlineEdit className='text-[rgba(0,0,0,07)] text-[20px]' />
                                                        </Button>

                                                        <Button 
                                                            className='!w-[35] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !min-h-[35px]'
                                                            onClick={()=> deleteItem(item?._id)}
                                                        >
                                                            <GoTrash className='text-[rgba(0,0,0,07)] text-[18px]' />
                                                        </Button>
                                                    </div>
                                                </td>




                                            </tr>
                                        )
                                    })
                                }





                            </tbody>
                        </table>
                    </div>
                </div>
            }


        </>
    )
}

export default AddRAMS