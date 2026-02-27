import React, { useContext, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MyContext } from '../../App';


const ITEM_HEIGHT = 48;


const AddressBox = (props) => {


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const context = useContext(MyContext);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const editAddress = (id) => {
        context?.setAddressMode("edit");
        context?.setOpenAddressPanel(true);
        context?.setAddressId(id);
        setAnchorEl(null);
    }

    return (
        <div className="addressBox group relative w-full rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#fafafa] p-4 cursor-pointer">
            <span className='inline-block p-1 bg-[#e7e7e7] text-[12px] rounded-sm'>{props?.address?.addressType}</span>

            <h4 className='pt-2 flex items-center text-[14px] sm:text-[16px] gap-4'>
                <span>{context?.userData?.name}</span>
                <span>+{props?.address?.mobile}</span>
            </h4>
            <span className="text-[13px] block w-100% pt-0">
                {
                    props?.address?.address_line1 + ", " +
                    props?.address?.city + ", " +
                    props?.address?.country + ", " +
                    props?.address?.state + ", " +
                    props?.address?.pincode + ", " +
                    props?.address?.landmark + ", " +
                    props?.address?.addressType
                }
            </span>



            <div className='absolute top-2 right-0! sm:right-2'>
                <IconButton
                    aria-label='more'
                    id='long-button'
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-haspopup='true'
                    onClick={handleClick}
                >
                    <HiOutlineDotsVertical />
                </IconButton>

                <Menu
                    id='long-menu'
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '8ch',
                            },
                        },
                    }}
                >
                    <MenuItem onClick={() => editAddress(props?.address?._id)}>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={() => {
                        props?.removeAddress(props?.address?._id);
                        handleClose();
                    }}>
                        Delete
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default AddressBox