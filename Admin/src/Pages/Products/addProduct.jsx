import React, { useContext, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MyContext } from '../../App';

const AddProduct = () => {



    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState('');
    const [productRams, setProductRams] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');


    const context = useContext(MyContext)


    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
        images: [],
        brand: '',
        price: '',
        oldPrice: '',
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
    });


    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value;
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
        setProductSize (
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.size = value;
    };

    const handleChangeProductWeight = (event) => {
        const {
            target: { value },
        } = event;
        setProductWeight (
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        
        formFields.productWeight = value;
    };

    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;
        setProductRams (
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

        console.log(formFields);
        
    }

    return (
        <section className='p-5 bg-[rgba(240,240,240,0.5)]'>
            <form className='form py-3 p-8 ' onSubmit={handleSubmit}>
                <div className='scroll max-h-[73vh] overflow-y-scroll pr-4'>
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

                    <div className='grid grid-cols-4 mb-3 gap-4'>
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
                                    onChange={handleChangeProductCat}
                                >
                                    {
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                <MenuItem value={cat?._id}
                                                    onClick={() => selectCatByName(cat?.name)}
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
                                                            onClick={() => selectSubCatByName(subCat?.name)}
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
                                                                    onClick={() => selectSubCatByThirdLavel(thirdsubCat?.name)}
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
                                <MenuItem value={'4GB'}>4GB</MenuItem>
                                <MenuItem value={'6GB'}>6GB</MenuItem>
                                <MenuItem value={'8GB'}>8GB</MenuItem>
                            </Select>
                        </div>

                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Weight</h3>
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
                                <MenuItem value={'2KG'}>2KG</MenuItem>
                                <MenuItem value={'4KG'}>4KG</MenuItem>
                                <MenuItem value={'5KG'}>5KG</MenuItem>
                            </Select>
                        </div>

                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Size</h3>
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
                                <MenuItem value={'S'}>S</MenuItem>
                                <MenuItem value={'M'}>M</MenuItem>
                                <MenuItem value={'L'}>L</MenuItem>
                            </Select>
                        </div>

                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Product Rating</h3>
                            <Rating name='half-rating' defaultValue={1} precision={0.1}
                                onChange={() => onChangeRating} />
                        </div>


                    </div>

                    <div className='col w-full p-5 px-0'>
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>



                        <div className='grid grid-cols-7 gap-4'>
                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                    <LazyLoadImage
                                        alt={"image"}
                                        effect="blur"
                                        wrapperProps={{
                                            style: { transitionDelay: "1s" }
                                        }}
                                        src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'}
                                    />
                                </div>
                            </div>

                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                    <LazyLoadImage
                                        alt={"image"}
                                        effect="blur"
                                        wrapperProps={{
                                            style: { transitionDelay: "1s" }
                                        }}
                                        src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'}
                                    />
                                </div>
                            </div>

                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                    <LazyLoadImage
                                        alt={"image"}
                                        effect="blur"
                                        wrapperProps={{
                                            style: { transitionDelay: "1s" }
                                        }}
                                        src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'}
                                    />
                                </div>
                            </div>

                            <div className='uploadBoxWrapper relative'>
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                                <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                    <LazyLoadImage
                                        alt={"image"}
                                        effect="blur"
                                        wrapperProps={{
                                            style: { transitionDelay: "1s" }
                                        }}
                                        src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'}
                                    />
                                </div>
                            </div>


                            <UploadBox multiple={true} />
                        </div>
                    </div>


                </div>
                <hr />
                <br />
                <Button type='submit' className='btn-blue btn-lg w-full flext gap-2'> <FaCloudUploadAlt className='text-[25px] text-white' /> Publish & View</Button>
            </form>
        </section>
    )
}

export default AddProduct;