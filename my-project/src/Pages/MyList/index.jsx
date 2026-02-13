import React, { useContext, useState } from 'react' 
import Button from '@mui/material/Button';
import { BsFillBagCheckFill } from 'react-icons/bs';
import MyListItems from './MyListItems'; 
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

const MyList = () => {

  const context = useContext(MyContext);


  return (

    <section className='py-10 w-full'>
        <div className='container flex gap-5'>
            <div className='col1 w-[20%]'>
              <AccountSidebar />  
            </div>


            <div className='col2 w-[70%]'>
                <div className='shadow-md rounded-md bg-white'>
                      <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                          <h2>My List</h2>
                          <p className='mt-0'>There are <span className='font-bold text-primary'>{context?.myListData?.length} </span>
                              product in My List</p>
                      </div>

                      {
                        context?.myListData?.length !== 0 ? context?.myListData?.map((item, index) => {
                          return (
                            <MyListItems key={item._id} item={item} />
                          )
                        }) 
                        
                        :
                        <div className='py-10 px-3 flex flex-col items-center justify-center gap-5'>
                          <img src="/mylistempty.png" className='w-[100px]' />
                          <h3 className='text-[20px]'>Your List is currently empty!</h3>
                          <Link to="/">
                            <Button variant="contained" className='btn-org btn-sm'>Shop Now</Button>
                          </Link>
                        </div>
                      }
                    
                </div>
            </div>
        </div>
    </section>

    
  )
}

export default MyList;