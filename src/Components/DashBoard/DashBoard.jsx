import React from 'react';
import { NavLink } from 'react-router-dom';
import Statistics from './AdminDashBoard/Statistics'
import useAuth from '../../Hooks/useAuth';
import UseRole from '../../Hooks/UseRole';
import Sidebar from './Sidebar';
import { AiFillProduct } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdHome } from "react-icons/md";

const DashBoard = () => {
    const { user } = useAuth();
    const [role, isLoading] = UseRole();
    console.log(role);
    return (
        <div className='flex'>
            <div className='w-1/6 bg-[#4F0202] min-h-screen'>
                <Sidebar></Sidebar>

                {
                    role === 'User' &&
                    <div className='flex flex-col'>
                        {/* <h3 > User Related Links </h3> */}
                        
                        <NavLink to='/dashboard/my-profile' className={({ isActive }) => `flex justify-center items-center gap-x-2 mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-bold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> <FaUserCircle size={25}></FaUserCircle> My Profile </NavLink>

                        <NavLink to='/dashboard/add-product' className={({ isActive }) => `flex justify-center items-center gap-x-2 mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-bold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> <IoAddCircle size={25}></IoAddCircle> Add Product </NavLink>

                        <NavLink to='/dashboard/my-products' className={({ isActive }) => `flex justify-center items-center gap-x-2 mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-bold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> <AiFillProduct size={25}></AiFillProduct> My Products </NavLink>

                        <NavLink to='/' className={({ isActive }) => `flex justify-center items-center gap-x-2 mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-bold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> <MdHome size={25}></MdHome> Back to Home </NavLink>
                    </div>

                }

                {
                    role === "Moderator" &&
                    <div className='flex flex-col'>
                        {/* <h3 className='mt-6'> Moderator Related Links </h3> */}
                        <NavLink to='/dashboard/review-products' className={({ isActive }) => `mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-semibold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> Review Products </NavLink>

                        <NavLink to='/dashboard/reported-contents' className={({ isActive }) => `mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-semibold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> Reported Contents </NavLink>
                    </div>
                }

                {
                    role === "Admin" &&
                    <div className='flex flex-col'>
                        {/* <h3 className='mt-6'> Admin Related Links </h3> */}
                        <NavLink to='/dashboard/manage-users' className={({ isActive }) => `mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-semibold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> Manage Users </NavLink>

                        <NavLink to='/dashboard/manage-coupons' className={({isActive}) => `mb-4 py-2 rounded-xl w-11/12 mx-auto text-center text-xl font-semibold ${isActive ? 'bg-[#6D1212] text-[#FFF5D1]' : 'bg-[#FFF5D1] text-[#6D1212]'}`}> Manage Coupons </NavLink> 


                    </div>
                }
            </div>


            <div className='border-2 w-full'>
                <h2> Dashboard Related things will be updated here </h2>
                {
                    role === "Admin" && <div> <Statistics></Statistics> </div>
                }
            </div>
        </div>
    );
};

export default DashBoard;