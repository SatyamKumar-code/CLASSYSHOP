import React, { useContext, useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MyContext } from '../../App';
import { deleteImages, editData, fetchDataFromApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const EditProduct = () => {

    const [productData, setProductData] = useState(null);
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState('');
    const [productRams, setProductRams] = useState([]);
    const [productRamsData, setProductRamsData] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [productWeightData, setProductWeightData] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [productSizeData, setProductSizeData] = useState([]);
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [bannerPreviews, setBannerPreviews] = useState([]);

    const [checkedSwitch, setCheckedSwitch] = useState(false);


    const context = useContext(MyContext)
    const history = useNavigate();



    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
        images: [],
        brand: '',
        price: '',
        oldPrice: '',
        category: '',
        catName: '',
        catId: '',
        subCatId: '',
        subCat: '',
        thirdsubCat: '',
        thirdsubCatId: '',
        countInStock: '',
        rating: '',
        isFeatured: false,
        discount: '',
        productRam: [],
        size: [],
        productWeight: [],
        bannerTitlename: '',
        bannerImage: [],
        isDisplayOnHomeBanner: false,
    });
    const setPreviewsFun = (previewsArr) => {
        const updatedPreviews = [...previews, ...previewsArr];
        setPreviews(updatedPreviews);
        setFormFields((prev) => ({
            ...prev,
            images: updatedPreviews
        }));
    }

    const setBannerImagesFun = (previewsArr) => {
        const updatedPreviews = [...bannerPreviews, ...previewsArr];
        setBannerPreviews(updatedPreviews);
        setFormFields((prev) => ({
            ...prev,
            bannerImage: updatedPreviews
        }));

    }

    const removeImg = (image, index) => {
        deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
            const updatedPreviews = previews.filter((_, i) => i !== index);
            setPreviews(updatedPreviews);
            setFormFields((prev) => ({
                ...prev,
                images: updatedPreviews
            }));
        })
    }

    const removeBannerImg = (image, index) => {
        deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
            const updatedPreviews = bannerPreviews.filter((_, i) => i !== index);
            setBannerPreviews(updatedPreviews);
            setFormFields((prev) => ({
                ...prev,
                bannerImage: updatedPreviews
            }));
        })
    }

    const handleChangeSwitch = (event) => {
        setCheckedSwitch(event.target.checked);
        setFormFields((prev) => ({
            ...prev,
            isDisplayOnHomeBanner: event.target.checked
        }));
    }



    useEffect(() => {
        fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
            if (res?.error === false) {
                setProductRamsData(res?.data || []);
            }
        });

        fetchDataFromApi("/api/product/productWEIGHT/get").then((res) => {
            if (res?.error === false) {
                setProductWeightData(res?.data || []);
            }
        });

        fetchDataFromApi("/api/product/productSize/get").then((res) => {
            if (res?.error === false) {
                setProductSizeData(res?.data || []);
            }
        });
    }, []);

    useEffect(() => {
        if (context?.isOpenFullScreenPanel?.id) {
            setIsPageLoading(true);
            fetchDataFromApi(`/api/product/${context?.isOpenFullScreenPanel?.id}`).then((res) => {
                if (res?.success) {
                    const product = res?.product;
                    setProductData(product);

                    // Set form fields with existing product data
                    setFormFields({
                        name: product?.name || '',
                        description: product?.description || '',
                        images: product?.images || [],
                        brand: product?.brand || '',
                        price: product?.price || '',
                        oldPrice: product?.oldPrice || '',
                        category: product?.category || '',
                        catName: product?.catName || '',
                        catId: product?.catId || '',
                        subCatId: product?.subCatId || '',
                        subCat: product?.subCat || '',
                        thirdsubCat: product?.thirdsubCat || '',
                        thirdsubCatId: product?.thirdsubCatId || '',
                        countInStock: product?.countInStock || '',
                        rating: product?.rating || '',
                        isFeatured: product?.isFeatured || false,
                        discount: product?.discount || '',
                        productRam: product?.productRam || [],
                        size: product?.size || [],
                        productWeight: product?.productWeight || [],
                        bannerTitlename: product?.bannerTitlename || '',
                        bannerImage: product?.bannerImage || [],
                        isDisplayOnHomeBanner: product?.isDisplayOnHomeBanner || false,
                    });

                    // Set select dropdown values
                    setProductCat(product?.catId || '');
                    setProductSubCat(product?.subCatId || '');
                    setProductThirdLavelCat(product?.thirdsubCatId || '');
                    setProductFeatured(product?.isFeatured || false);
                    setProductRams(product?.productRam || []);
                    setProductSize(product?.size || []);
                    setProductWeight(product?.productWeight || []);
                    setCheckedSwitch(product?.isDisplayOnHomeBanner || false);

                    // Set image previews
                    setPreviews(product?.images || []);
                    setBannerPreviews(product?.bannerImage || []);
                }
                setIsPageLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsPageLoading(false);
            });
        }
    }, [context?.isOpenFullScreenPanel?.id]);


    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value;
        formFields.category = event.target.value;
    };

    const selectCatByName = (name) => {
        formFields.catName = name;
    }

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        formFields.subCatId = event.target.value;
    };

    const selectSubCatByName = (name) => {
        formFields.subCat = name;
    }

    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value);
        formFields.thirdsubCatId = event.target.value;
    };

    const selectSubCatByThirdLavel = (name) => {
        formFields.thirdsubCat = name;
    }



    const handleChangeProductSize = (event) => {
        const {
            target: { value },
        } = event;
        setProductSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.size = value;
    };

    const handleChangeProductWeight = (event) => {
        const {
            target: { value },
        } = event;
        setProductWeight(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.productWeight = value;
    };

    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;
        setProductRams(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.productRam = value;
    };

    const handleChangeProductFeatured = (event) => {
        setProductFeatured(event.target.value);
        formFields.isFeatured = event.target.value;
    };




    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const onChangeRating = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                rating: e.target.value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.name === '') {
            context.alertBox("error", "Please enter product name.");
            setIsLoading(false);
            return false;
        }

        if (formFields.description === '') {
            context.alertBox("error", "Please enter product description.");
            setIsLoading(false);
            return false;
        }

        if (formFields.catId === '') {
            context.alertBox("error", "Please select product category.");
            setIsLoading(false);
            return false;
        }
        if (formFields.price === '') {
            context.alertBox("error", "Please enter product price.");
            setIsLoading(false);
            return false;
        }
        if (formFields.oldPrice === '') {
            context.alertBox("error", "Please enter product old price.");
            setIsLoading(false);
            return false;
        }
        if (formFields.countInStock === '') {
            context.alertBox("error", "Please enter product stock.");
            setIsLoading(false);
            return false;
        }
        if (formFields.brand === '') {
            context.alertBox("error", "Please enter product brand.");
            setIsLoading(false);
            return false;
        }
        if (formFields.discount === '') {
            context.alertBox("error", "Please enter product discount.");
            setIsLoading(false);
            return false;
        }
        if (formFields.rating === '') {
            context.alertBox("error", "Please enter product rating.");
            setIsLoading(false);
            return false;
        }

        if (previews?.length === 0) {
            context.alertBox("error", "Please select product images.");
            setIsLoading(false);
            return false;
        }

        // Update form fields with current images
        const updatedFormFields = {
            ...formFields,
            images: previews
        };

        editData(`/api/product/updateProduct/${context?.isOpenFullScreenPanel?.id}`, updatedFormFields).then((res) => {

            if (res?.data?.error === false) {
                context.alertBox("Success", res?.data?.message);
                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({
                        open: false,
                    })
                    history('/products');
                }, 1000)
            } else {
                context.alertBox("error", res?.data?.message || "Failed to update product.");
                setIsLoading(false);
            }

        }).catch((err) => {
            context.alertBox("error", "Failed to update product.");
            setIsLoading(false);
        });

    }

    return (
        <section className='p-5 bg-[rgba(240,240,240,0.5)]'>
            {isPageLoading ? (
                <div className='flex items-center justify-center h-[70vh]'>
                    <CircularProgress />
                </div>
            ) : (
                <form className='form py-1 p-1 md:p-8 md:py-1 ' onSubmit={handleSubmit}>
                    <div className='scroll max-h-[72vh] overflow-y-scroll pr-1 md:pr-4 pt-4'>
                        <div className='grid grid-cols-1 mb-3'>
                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Name</h3>
                                <input
                                    type='text'
                                    name='name'
                                    value={formFields.name}
                                    onChange={onChangeInput}
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 mb-3'>
                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Description</h3>
                                <textarea
                                    type='text'
                                    name='description'
                                    value={formFields.description}
                                    onChange={onChangeInput}
                                    className='w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mb-3 gap-4'>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Category</h3>
                                {
                                    context?.catData?.length !== 0 &&
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="productCatDrop"
                                        size='small'
                                        className='w-full'
                                        value={productCat}
                                        label="Category"
                                        onChange={(e) => {
                                            setProductCat(e.target.value);
                                            setProductSubCat('');
                                            setProductThirdLavelCat('');
                                            handleChangeProductCat(e);
                                        }}
                                    >
                                        {context?.catData?.map((cat, index) => (
                                            <MenuItem value={cat?._id} key={cat?._id} onClick={() => selectCatByName(cat?.name)}>
                                                {cat?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Sub Category</h3>
                                {
                                    context?.catData?.length !== 0 &&
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="productSubCatDrop"
                                        size='small'
                                        className='w-full'
                                        value={productSubCat}
                                        label="Sub Category"
                                        onChange={(e) => {
                                            setProductSubCat(e.target.value);
                                            setProductThirdLavelCat('');
                                            handleChangeProductSubCat(e);
                                        }}
                                        disabled={!productCat}
                                    >
                                        {context?.catData?.find(cat => cat._id === productCat)?.Children?.map((subCat) => (
                                            <MenuItem value={subCat?._id} key={subCat?._id} onClick={() => selectSubCatByName(subCat?.name)}>
                                                {subCat?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Third Lavel Category</h3>
                                {
                                    context?.catData?.length !== 0 &&
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="productThirdLavelCatDrop"
                                        size='small'
                                        className='w-full'
                                        value={productThirdLavelCat}
                                        label="Third Level Category"
                                        onChange={handleChangeProductThirdLavelCat}
                                        disabled={!productSubCat}
                                    >
                                        {context?.catData?.find(cat => cat._id === productCat)?.Children?.find(subCat => subCat._id === productSubCat)?.Children?.map((thirdsubCat) => (
                                            <MenuItem value={thirdsubCat?._id} key={thirdsubCat?._id} onClick={() => selectSubCatByThirdLavel(thirdsubCat?.name)}>
                                                {thirdsubCat?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Price</h3>
                                <input
                                    type='number'
                                    name='price'
                                    value={formFields.price}
                                    onChange={onChangeInput}
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Old Price</h3>
                                <input
                                    type='number'
                                    name='oldPrice'
                                    value={formFields.oldPrice}
                                    onChange={onChangeInput}
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Is Featured?</h3>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    size='small'
                                    className='w-full'
                                    value={productFeatured}
                                    label="Product Featured"
                                    onChange={handleChangeProductFeatured}
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Stock</h3>
                                <input
                                    type='number'
                                    name='countInStock'
                                    value={formFields.countInStock}
                                    onChange={onChangeInput}
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Brand</h3>
                                <input
                                    type='text'
                                    name='brand'
                                    value={formFields.brand}
                                    onChange={onChangeInput}
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Discount</h3>
                                <input
                                    type='number'
                                    name='discount'
                                    value={formFields.discount}
                                    onChange={onChangeInput}
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                            </div>


                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product RAMS</h3>
                                {
                                    productRamsData?.length !== 0 &&
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        id="productCatDrop"
                                        size='small'
                                        className='w-full'
                                        value={productRams}
                                        label="Product RAMS"
                                        onChange={handleChangeProductRams}
                                    >
                                        {
                                            productRamsData?.map((item, index) => {
                                                return <MenuItem key={index} value={item?.Ram}>{item?.Ram}</MenuItem>
                                            })
                                        }
                                    </Select>
                                }
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Weight</h3>
                                {
                                    productWeightData?.length !== 0 &&
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        id="productCatDrop"
                                        size='small'
                                        className='w-full'
                                        value={productWeight}
                                        label="Product Weight"
                                        onChange={handleChangeProductWeight}
                                    >
                                        {
                                            productWeightData?.map((item, index) => {
                                                return <MenuItem key={index} value={item?.weight}>{item?.weight}</MenuItem>
                                            })
                                        }
                                    </Select>
                                }
                            </div>

                            <div className='col'>
                                <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Size</h3>
                                {
                                    productSizeData?.length !== 0 &&
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        id="productCatDrop"
                                        size='small'
                                        className='w-full'
                                        value={productSize}
                                        label="Product Size"
                                        onChange={handleChangeProductSize}
                                    >
                                        {
                                            productSizeData?.map((item, index) => {
                                                return <MenuItem key={index} value={item?.size}>{item?.size}</MenuItem>
                                            })
                                        }
                                    </Select>
                                }
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols1 md:grid-cols-3 lg:grid-cols-4 mb-3 gap-4'>
                                <div className='col'>
                                    <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Rating</h3>
                                    <Rating name='half-rating' value={parseFloat(formFields.rating) || 0} precision={0.1}
                                        onChange={onChangeRating} />
                                </div>
                            </div>


                        </div>

                        <div className='col w-full p-5 px-0'>
                            <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>



                            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>

                                {
                                    previews?.length !== 0 && previews?.map((image, index) => {
                                        return (
                                            <div className='uploadBoxWrapper relative'>
                                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'
                                                    onClick={() => removeImg(image, index)}
                                                >
                                                    <IoMdClose className='text-white text-[17px]' />
                                                </span>

                                                <div key={index} className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[80px] sm:h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                                    <img src={image} className='w-full' />
                                                </div>



                                            </div>
                                        )
                                    })
                                }


                                <UploadBox multiple={true} name="images" url="/api/product/uploadImages" setPreviewsFun={setPreviewsFun} />
                            </div>
                        </div>

                        <div className='col w-full p-5 px-0'>

                            <div className="shadow-md bg-white p-4 w-full">
                                <div className='flex items-center gap-8'>
                                    <h3 className='font-[700] text-[18px] mb-3'>Banner Images</h3>
                                    <Switch
                                        {...label}
                                        onChange={handleChangeSwitch}
                                        checked={checkedSwitch}
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4'>


                                    {
                                        bannerPreviews?.length !== 0 && bannerPreviews?.map((image, index) => {
                                            return (
                                                <div className='uploadBoxWrapper relative'>
                                                    <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'
                                                        onClick={() => removeBannerImg(image, index)}
                                                    >
                                                        <IoMdClose className='text-white text-[17px]' />
                                                    </span>

                                                    <div key={index} className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[100px] md:h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                                        <img src={image} className='w-full' />
                                                    </div>



                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        bannerPreviews?.length === 0 && <UploadBox multiple={false} name="bannerImage" url="/api/product/uploadBannerImages" setPreviewsFun={setBannerImagesFun} />
                                    }
                                    
                                </div>

                                <br />

                                <h3 className='font-[700] text-[18px] mb-3'>Banner Title</h3>
                                <input
                                    type='text'
                                    name='bannerTitlename'
                                    value={formFields.bannerTitlename}
                                    onChange={onChangeInput}
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'
                                />
                            </div>


                        </div>


                    </div>
                    <hr />
                    <br />
                    <Button type='submit' className='btn-blue btn-lg w-full flext gap-2'>
                        {
                            isLoading === true ? <CircularProgress size={20} color='inherit' />
                                :
                                <>
                                    <FaCloudUploadAlt className='text-[25px] text-white' /> Update Product
                                </>
                        }
                    </Button>
                </form>
            )}
        </section>
    )
}

export default EditProduct;