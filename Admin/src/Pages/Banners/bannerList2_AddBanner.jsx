import React, { useContext, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import CircularProgress from '@mui/material/CircularProgress';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { deleteImages, postData } from '../../utils/api';

export const BannerList2_AddBanner = () => {

    const [formFields, setFormFields] = useState({
        bannerTitle: '',
        catId: '',
        subCatId: '',
        thirdsubCatId: '',
        price: '',
        alignInfo: '',
    });

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [alignInfo, setAlignInfo] = useState('');
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

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value;
    }

    const selectCatByName = (name) => {
        formFields.catName = name;
    }

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        formFields.subCatId = event.target.value;
    };

    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value);
        formFields.thirdsubCatId = event.target.value;
    };

    const handleChangeAlignInfo = (event) => {
        setAlignInfo(event.target.value);
        formFields.alignInfo = event.target.value;
    }


    const setPreviewsFun = (previewsArr) => {
        setPreviews(previewsArr);
        setFormFields(prev => ({
            ...prev,
            images: previewsArr
        }));
    }

    const removeImg = (image, index) => {
        var imageArr = [];
        imageArr = previews;
        deleteImages(`/api/bannerV1/deleteImage?img=${image}`).then((res) => {
            imageArr.splice(index, 1);

            setPreviews([]);
            setTimeout(() => {
                setPreviews(imageArr);
                setFormFields(prev => ({
                    ...prev,
                    images: imageArr
                }));
            }, 100);

        })
    }

    const handleSubmit = (e) => {
            e.preventDefault();
    
            setIsLoading(true);
            console.log(formFields);
            
    
            if (formFields.bannerTitle === '') {
                context.alertBox("error", "Please enter banner title.");
                setIsLoading(false);
                return false;
            }

            if (formFields.price === '') {
                context.alertBox("error", "Please enter price.");
                setIsLoading(false);
                return false;
            }
            if (previews?.length === 0) {
                context.alertBox("error", "Please select banner image.");
                setIsLoading(false);
                return false;
            }
    
            postData("/api/bannerV1/add", formFields).then((res) => {
                if (res?.success === true) {
                    setTimeout(() => {
                        context.alertBox("Success", "Banner created successfully.");
                        setIsLoading(false);
                        context?.setIsOpenFullScreenPanel({
                            open: false,
                        })
                        history('/bannerV1/list');
                        context?.getCat();
                    }, 2000)
                    
                } else {
                    context.alertBox("error", res?.message || "Failed to create banner.");
                    setIsLoading(false);
                }
            })
        }


    return (
        <section className='p-5 bg-gray-50'>
            <form className='form py-1 p-1 md:p-8 md:py-1' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>

                    <div className='grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 mb-3 gap-5'>
                        <div className='col'>
                            <h3 className='text-[14px] font-medium mb-0 text-black'>Banner Title</h3>
                            <input type='text' className='w-full h-10 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                                name='bannerTitle'
                                value={formFields.bannerTitle}
                                onChange={onChangeInput} />
                        </div>

                        <div className='col'>
                            <h3 className='text-[14px] font-medium mb-1 text-black'>Category</h3>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={productCat}
                                    label="Category"
                                    onChange={handleChangeProductCat}
                                >
                                    {
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                <MenuItem value={cat?._id} key={index}
                                                >
                                                    {cat?.name}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>



                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Sub Category</h3>

                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={productSubCat}
                                    label="Sub Category"
                                    onChange={handleChangeProductSubCat}
                                >
                                    {
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                cat?.Children?.length !== 0 && cat?.Children?.map((subCat, index_) => {
                                                    return (
                                                        <MenuItem value={subCat?._id}
                                                            key={index_}
                                                        >
                                                            {subCat?.name}
                                                        </MenuItem>
                                                    )
                                                })
   
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>


                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Third Lavel Category</h3>

                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={productThirdLavelCat}
                                    label="Sub Category"
                                    onChange={handleChangeProductThirdLavelCat}
                                >
                                    {
                                        context?.catData?.map((cat) => {
                                            return (
                                                cat?.Children?.length !== 0 && cat?.Children?.map((subCat) => {
                                                    return (
                                                        subCat?.Children?.length !== 0 && subCat?.Children?.map((thirdsubCat,index) => {
                                                            return (
                                                                <MenuItem value={thirdsubCat?._id} key={index}
                                                                >
                                                                    {thirdsubCat?.name}
                                                                </MenuItem>
                                                            )
                                                        })
                                                    )
                                                })

                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>

                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Align Info</h3>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={alignInfo}
                                    label="Sub Category"
                                    onChange={handleChangeAlignInfo}
                                >
                                    <MenuItem value={'left'}>Left</MenuItem>
                                    <MenuItem value={'right'}>Right</MenuItem>  
                                </Select>
                            }
                        </div>

                        <div className='col'>
                            <h3 className='text-[14px] font-medium mb-0 text-black'>price</h3>
                            <input type='number' className='w-full h-10 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                                name='price'
                                value={formFields.price}
                                onChange={onChangeInput} />
                        </div>
                    </div>

                    <br />
                    <h3 className='text-[18px] font-medium mb-1 text-black'>Banner Image</h3>

                    <br />

                    <div className='grid grid-cols-2 md:grid-cols-7 gap-4'>

                        {
                            previews?.length !== 0 && previews?.map((image, index) => {
                                return (
                                    <div className='uploadBoxWrapper mr-3 relative' key={index}>
                                        <span className='absolute w-5 h-5 rounded-full overflow-hidden bg-red-700 -top-1.25 -right-1.25 flex items-center justify-center z-50 cursor-pointer'
                                            onClick={() => removeImg(image, index)}
                                        >
                                            <IoMdClose className='text-white text-[17px]' />
                                        </span>

                                        <div key={index} className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-37.5 w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                            <img src={image} className='w-full' />
                                        </div>



                                    </div>
                                )
                            })
                        }


                        <UploadBox multiple={true} name="images" url="/api/bannerV1/uploadImages" setPreviewsFun={setPreviewsFun} />
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
        </section>
    )
}
