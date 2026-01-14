import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import { CategoryCollapse } from '../../CategoryCollaose';





const CategoryPanel = (props) => {


    const toggleDrawer = (newOpen) => () => {
        props.setIsOpenCategoryPanel(newOpen);
    }


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" className="catagoryPanel">
            <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>Shop By Categories<IoCloseSharp className=' text-[20px] cursor-pointer' onClick={toggleDrawer(false)} /></h3>

            {
                props.data?.length !== 0 && <CategoryCollapse data={props.data} />
            }
        </Box>
    );

    return (
        <>

            <Drawer open={props.isOpenCategoryPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}
export default CategoryPanel;