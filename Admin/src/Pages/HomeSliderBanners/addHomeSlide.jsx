import React from 'react'
import { IoMdClose } from 'react-icons/io';
import UploadBox from '../../Components/UploadBox';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { deleteImages, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const AddHomeSlide = () => {

    const [formFields, setFormFields] = useState({
        image: [],
    });

    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useNavigate();


    const context = useContext(MyContext);

    const setPreviewsFun = (previewsArr) => {
        setPreviews(previewsArr);
        setFormFields.images = previewsArr;

    }

    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/homeSlides/deleteImage?img=${image}`).then((res) => {
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

        if (previews?.length === 0) {
            context.alertBox("error", "Please select home slide image.");
            setIsLoading(false);
            return false;
        }

        postData("/api/homeSlides/add", formFields).then((res) => {
            if (res?.success === true) {
                setTimeout(() => {
                    context.alertBox("Success", "Home slide created successfully.");
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({
                        open: false,
                    })
                    history('/homeSlider/list');
                }, 2000)

            } else {
                context.alertBox("error", res?.message || "Failed to create home slide.");
                setIsLoading(false);
            }
        })
    }


    return (
        <div className='p-5 bg-gray-50'>
            <form className='form py-1 p-1 md:p-8 md:py-1' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
                    <div className='grid grid-cols-2 md:grid-cols-7 gap-4'>

                        {
                            previews?.length !== 0 && previews?.map((image, index) => {
                                return (
                                    <div className='uploadBoxWrapper mr-3 relative' key={index}>
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


                        <UploadBox multiple={false} name="images" url="/api/homeSlides/uploadImages" setPreviewsFun={setPreviewsFun} />
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

export default AddHomeSlide;