import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import 'react-international-phone/style.css';

import { deleteData, fetchDataFromApi } from '../../utils/api';
import AddressBox from './addressBox';



const label = { inputProps: { 'aria-label': 'Radio demo' } };



const Address = () => {

    const context = useContext(MyContext);

    const [address, setAddress] = useState([]);


    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {

            setAddress(context?.userData?.address_details);

        }

    }, [context?.userData])
    

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res?.address);
                context?.getUserDetails();
                context?.alertBox("Success", "Address deleted");
            }).catch((err) => {
                context?.alertBox("error", "Failed to fetch addresses");
            })
        }).catch((err) => {
            context?.alertBox("error", "Failed to delete address");
        })
    }

    const editAddress = (id) => {

        setMode("edit");
        context?.toggleAddressPanel(true);

        setAddressId(id);

        setIsLoading(true);

        fetchDataFromApi(`/api/address/${id}`).then((res) => {
            setIsLoading(false);
            setFormFields({
                address_line1: res?.address?.address_line1 || '',
                city: res?.address?.city || '',
                state: res?.address?.state || '',
                pincode: res?.address?.pincode || '',
                country: res?.address?.country || '',
                mobile: res?.address?.mobile || '',
                userId: res?.address?.userId || '',
                landmark: res?.address?.landmark || '',
                addressType: res?.address?.addressType || ''
            });

            const ph = `"${res?.address?.mobile}"`;
            setPhone(ph);
            setAddressType(res?.address?.addressType || '');

        }).catch((err) => {
            setIsLoading(false);
            context.alertBox("error", err?.message || "Something went wrong");
        })
            
        

    }

    return (
        <>
            <section className='py-3 lg:py-10 w-full'>
                <div className='container flex flex-col lg:flex-row gap-5'>
                    <div className='col1 w-full lg:w-[20%]'>
                        <AccountSidebar />
                    </div>


                    <div className='col2 w-full lg:w-[50%]'>
                        <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                            <div className='flex items-center pb-3'>
                                <h2 className='pb-0'>Address</h2>

                            </div>
                            <hr />
                            <br />

                            <div className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                                onClick={context?.toggleAddressPanel(true)} >
                                <span className="text-[14px] font-[500]">Add Address </span>
                            </div>

                            <div className="flex gap-2 flex-col mt-4">

                                {
                                    address?.length > 0 && address?.map((address, index) => {
                                        return (
                                            <AddressBox key={address?._id} address={address} removeAddress={removeAddress} editAddress={editAddress} />
                                        )
                                    })
                                }
                            </div>


                        </div>






                    </div>
                </div>
            </section>
        </>
    )
}

export default Address;