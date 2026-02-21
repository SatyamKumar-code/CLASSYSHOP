import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MyContext } from '../../App';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, editData } from '../../utils/api';

const EditSubCatBox = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectVal, setSelectVal] = useState('');
    const [formFields, setFormFields] = useState({
        name: "",
        parentCatName: null,
        parentId: null,
    });

    const context = useContext(MyContext);

    useEffect(() => {
        formFields.name = props?.name;
        formFields.parentId = props?.selectedCat;
        formFields.parentCatName = props?.selectedCatName;
        setSelectVal(props?.selectedCat);
    }, [props?.name, props?.selectedCat])

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        const catId = selectVal;
        setSelectVal(catId);

        setFormFields(() => {
            return {
                ...formFields,
                [name]: value,
            }
        })
    }

    const handleChange = (event) => {
        setSelectVal(event.target.value);
        formFields.parentId = event.target.value;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        if (formFields.name === "") {
            context.alertBox("error", "Please enter category name");
            setIsLoading(false);
            return;
        }

        editData(`/api/category/${props?.id}`, formFields).then((res) => {
            setTimeout(() => {
                context.alertBox("success", "Sub Category updated successfully");
                context?.getCat();
                setIsLoading(false);
            }, 1000);
        })
    }

    const deleteCat = (id) => {
        deleteData(`/api/category/${id}`).then((res) => {
            if (res?.data?.success === true) {
                context.alertBox("Success", "Category deleted successfully");
                context?.getCat();
            }
        })
    }


    return (
        <form className='w-full flex items-center gap-3 p-0 px-4' onSubmit={handleSubmit}>

            {
                editMode === true &&
                <>
                    <div className='flex items-center justify-between py-2 gap-4 whitespace-nowrap overflow-x-scroll'>
                        <div className='w-45 md:w-37.5'>
                            <Select 
                                style={{ zoom: '75%'}}
                                className='w-full'
                                size='small'
                                value={selectVal}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label' : 'Without label' }}
                            >
                                {
                                    props?.catData?.length !== 0 && props?.catData?.map((item, index) => {
                                        return (
                                            <MenuItem value={item?._id} key={index} onClick={() => {
                                                formFields.parentCat = item?.name;
                                            }}>{item?.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <input type="text" className="w-45 md:w-full h-[30px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus-border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm " 
                            name="name" value={formFields?.name} onChange={onChangeInput}>
                            
                        </input>

                        <div className='flex items-center gap-2 mr-5'>
                            <Button
                                size='small'
                                className='btn-sml'
                                type='submit'
                                variant='contained'>
                                    {
                                        isLoading === true ? <CircularProgress size={20} color='inherit' />
                                        :
                                        <>
                                        Edit
                                        </>
                                    }
                                </Button>
                                <Button 
                                    size="small"
                                    variant="outlined"
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </Button>
                        </div>
                    </div>
                </>
            }
             
            {
                editMode === false &&
                <>
                    <span className='font-[500] text-[14px] '>{props?.name}</span>
                    <div className='flex items-center ml-auto gap-2'>
                        <Button className='min-w-[35px]! !w-[35px] h-[35px]! rounded-full! text-black!'
                            onClick={() => {
                                setEditMode(true);
                            }}
                        >
                            <MdOutlineModeEdit />
                        </Button>
                        <Button className='min-w-[35px]! !w-[35px] h-[35px]! rounded-full! text-black!'
                            onClick={() => deleteCat(props?.id)}
                        >
                            <FaRegTrashAlt />
                        </Button>
                    </div>
                </>
            }

        </form>
    )
}

export default EditSubCatBox;    