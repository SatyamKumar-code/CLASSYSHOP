import React, { useState, useContext, useEffect } from 'react'
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa6';

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';
import Products from '../Products';
import Orders from '../Orders';


const Dashboard = () => {


  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [ordersCount, setOrdersCount] = useState(null);

  const [chartData, setChartData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel?.open]);

  // Fetch all count only once on mount
  useEffect(() => {
    fetchDataFromApi('/api/order/count').then((res) => {
      if(res?.error === false) {
        setOrdersCount(res?.count);
      }
    })
  }, []);


  useEffect(() => {
    getTotalSalesByYear();

    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if(res?.error === false){
        setUsers(res?.users);
      }
    })

    fetchDataFromApi("/api/user/getAllReviews").then((res) => {
      if(res?.error === false){
        setAllReviews(res?.reviews);
      }
    })
  }, []);



  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        productArr = res?.products;
        setTimeout(() => {
          setIsLoading(false);
          setProductData(productArr);
        }, 300);
      }
    })
  }

  const getTotalUsersByYear = () =>{
    fetchDataFromApi('/api/order/users').then((res) => {
      const users = [];
      res?.TotalUsers?.length !== 0 && 
      res?.TotalUsers?.map((item) => {
        users.push({
          name: item?.name,
          TotalUsers: parseInt(item?.TotalUsers)
        });
      });

      const uniqueArr = users.filter(
        (obj, index, self) => 
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    })
  }

  const getTotalSalesByYear = () => {
    fetchDataFromApi('/api/order/sales').then((res) => {
      const sales = [];
      res?.monthlySales?.length !== 0 &&
      res?.monthlySales?.map((item) => {
        sales.push({
          name: item?.name,
          TotalSales: parseInt(item?.TotalSales)
        });
      });

      const uniqueArr = sales.filter(
        (obj, index, self) => 
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  }


  return (
    <>
      <div className='w-full py-5 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
        <div className='info'>
          <h1 className='text-[28px] sm:text-[35px] font-bold leading-10 mb-3'>Welcome, <br /><span className='text-blue-600'> {context?.userData?.name || "User"} </span></h1>
          <p>Hear's What happening on your store today. See the statistics at once.</p>
          <br />
          <Button className="btn-blue capitalize!"
            onClick={() => context.setIsOpenFullScreenPanel({
              open: true,
              model: "Add Product"
            })}
          >
            <FaPlus />
            Add product
          </Button>
        </div>

        <img src="/shop-illustration.webp" className='w-[250px] hidden lg:block' />
      </div>

      {
        productData?.length !== 0 && users?.length !== 0 && allReviews?.length !== 0 && ordersCount !== null && 
        <DashboardBoxes orders={ordersCount} products={productData?.length} users={users?.length} reviews={allReviews?.length} category={context?.catData?.length} />
      }

      <Products />

      <Orders />

      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5 pb-0'>
          <h2 className='text-[18px] font-[600]'>Total User & Total Sales</h2>
        </div>

        <div className='flex items-center px-5 py-5 pt- gap-5'>

          <span className='flex items-center gap-1 text-[15px] cursor-pointer' onClick={getTotalSalesByYear}>
            <span className='block w-[8px] h-[8px] rounded-full bg-[#16a34a]'></span>
            Total Sales
          </span>
          
          <span className='flex items-center gap-1 text-[15px] cursor-pointer' onClick={getTotalUsersByYear}>
            <span className='block w-[8px] h-[8px] rounded-full bg-[#0858f7]'></span>
            Total Users
          </span>
        </div>

        {
          chartData?.length !== 0 &&
          <BarChart
            width={context?.windowWidth > 922 ? (context?.windowWidth - 300) : (context?.windowWidth - 25)}
            height={500}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.them === "dark" ? "white" : "#000" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ angle: -90, position: "insideLeft", fontSize: 14 }}
              style={{ fill: context?.them === "dark" ? "white" : "#000" }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#071739",
                color: "white",
              }} // Set tooltip background and text color
              labelStyle={{ color: "yellow"}} // label text color
              itemStyle={{ color: "cyan "}} // set color for individul item in the tooltip
              cursor={{ fill: "white" }} // Customize the tooltip cursor background color
            />
            <Legend />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              vertical={false}
            />
              <Bar dataKey="TotalSales" stackId="a" fill="#16a34a"/>
              <Bar dataKey="TotalUsers" stackId="b" fill="#0858f7" />
          </BarChart>
        }
      </div>
    </>
  )
}

export default Dashboard; 