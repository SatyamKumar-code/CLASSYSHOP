import React, { useContext } from 'react'
import { IoMdClose } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UploadBox from '../../Components/UploadBox';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useState } from 'react';
import { deleteImages, postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const [formFields, setFormFields] = useState({
        name: '',
        image: [],
    });

    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useNavigate();


    const context = useContext(MyContext);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const setPreviewsFun = (previewsArr) => {
        setPreviews(previewsArr);
        setFormFields.images = previewsArr;

    }

    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
            imageArr.splice(index, 1);

            setPreviews([]);
            setTimeout(() => {
                setPreviews(imageArr);
                setFormFields.images = imageArr;
            }, 100);

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.name === '') {
            context.alertBox("error", "Please enter category name.");
            setIsLoading(false);
            return false;
        }
        if (previews?.length === 0) {
            context.alertBox("error", "Please select category image.");
            setIsLoading(false);
            return false;
        }

        postData("/api/category/create", formFields).then((res) => {
            if (res?.success === true) {
                setTimeout(() => {
                    context.alertBox("Success", "Category created successfully.");
                    setIsLoading(false);
                    context?.setIsOpenFullScreenPanel({
                        open: false,
                    })
                    history('/category/list');
                    context?.getCat();
                }, 2000)
                
            } else {
                context.alertBox("error", res?.message || "Failed to create category.");
                setIsLoading(false);
            }
        })
    }


    return (
        <div className='p-5 bg-gray-50'>
            <form className='form py-3 p-8' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>

                    <div className='grid grid-cols-4 mb-3'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Category Name</h3>
                            <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                                name='name'
                                value={formFields.name}
                                onChange={onChangeInput} />
                        </div>
                    </div>

                    <br />
                    <h3 className='text-[18px] font-[500] mb-1 text-black'>Category Image</h3>

                    <br />

                    <div className='grid grid-cols-7 gap-4'>

                        {
                            previews?.length !== 0 && previews?.map((image, index) => {
                                return (
                                    <div className='uploadBoxWrapper relative'>
                                        <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'
                                            onClick={() => removeImg(image, index)}
                                        >
                                            <IoMdClose className='text-white text-[17px]' />
                                        </span>

                                        <div key={index} className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                            {/* <LazyLoadImage
                                                alt={"image"}
                                                effect="blur"
                                                wrapperProps={{
                                                    style: { transitionDelay: "1s" }
                                                }}
                                                src={image}
                                            /> */}
                                            <img src={image} className='w-full' />
                                        </div>



                                    </div>
                                )
                            })
                        }


                        <UploadBox multiple={true} name="images" url="/api/category/uploadImages" setPreviewsFun={setPreviewsFun} />
                    </div>
                </div>
                <br />
                <br />
                <div className='w-[250px]'>
                    <Button type='submit' className='btn-blue btn-lg w-full flext gap-2'>
                        {
                            isLoading === true ? <CircularProgress size={20} color='inherit' />
                                :
                                <>
                                    <FaCloudUploadAlt className='text-[25px] text-white' />Publish & View
                                </>
                        }
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default AddCategory;