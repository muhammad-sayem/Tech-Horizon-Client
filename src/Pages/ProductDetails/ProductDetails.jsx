import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaExternalLinkAlt } from "react-icons/fa";
import { LuTriangle } from "react-icons/lu";
import { MdReportGmailerrorred } from "react-icons/md";
import Swal from "sweetalert2";
import UseRole from "../../Hooks/UseRole";
import useAuth from "../../Hooks/useAuth";
import { useState, useEffect } from "react";

const ProductDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { user } = useAuth();
    const [role] = UseRole();
    const [hasUpvoted, setHasUpvoted] = useState(false);

    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/product/${id}`);
            return data;
        }
    });

    useEffect(() => {
        if (user?.email && Array.isArray(product?.upVotedUsers) && product.upVotedUsers.includes(user.email)) {
            setHasUpvoted(true);
        }
    }, [user, product]);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const { productName, productImage, productDescription, upvotes, tags, owner, reported } = product;
    console.log(product);

    const updateUpvote = async () => {
        if (!user || hasUpvoted) return;

        try {
            await axiosSecure.patch(`/product/upvote/${id}`);
            setHasUpvoted(true);
            refetch();

            Swal.fire({
                title: "Upvote done",
                icon: "success"
            });
        } catch (err) {
            Swal.fire({
                title: "Something went wrong",
                icon: "error"
            });
        }
    };

    const handleReport = async () => {
        try {
            await axiosSecure.patch(`/product/report/${id}`);
            refetch();
            Swal.fire({
                title: "Report done",
                icon: "success"
            });

        }
        catch (err) {
            console.log(err);
            Swal.fire({
                title: "Something wrong",
                icon: "error"
            });
        }
    }

    return (
        <div className='w-2/3 mx-auto mb-8'>
            <div className='gap-x-8 p-12 shadow-2xl'>
                <div className='flex flex-col items-center'>
                    <img src={productImage} alt='' className='h-16 w-16' />
                    <h3 className="text-2xl font-black"> {productName} </h3>
                </div>

                <div>
                    <p className="text-lg text-gray-500 my-4"> {productDescription} </p>

                    <p className="text-2xl font-black mb-3"> Tags: </p>
                    <div className="flex gap-x-4">
                        {tags.map((tag, index) => (
                            <p key={index} className="px-7 py-1 rounded-xl border-2 border-[#6D1212] text-[#6D1212] font-bold"> {tag} </p>
                        ))}
                    </div>

                    <div className="flex gap-x-3 my-8">
                        <Link className="flex justify-center items-center gap-x-2 text-xl font-bold border-2 border-black w-1/3 py-2 rounded-full hover:bg-[#6D1212] hover:text-[#FFF5D1]">
                            <FaExternalLinkAlt size={25}></FaExternalLinkAlt>  Visit
                        </Link>

                        <button
                            onClick={updateUpvote}
                            disabled={!user || owner?.email === user?.email || hasUpvoted || role === 'Admin' || role === "Moderator"}
                            className={`flex justify-center items-center gap-x-2 text-xl text-white font-bold border-2 w-1/3 py-2 rounded-full 
                                ${!user || owner?.email === user?.email || hasUpvoted || role === 'Admin' || role === "Moderator"
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-700 hover:text-[#FFF5D1] hover:cursor-pointer'}`}
                        >
                            <LuTriangle size={25}></LuTriangle> Upvote ({upvotes})
                        </button>

                        <button disabled={reported === true} onClick={handleReport} className={`flex justify-center items-center gap-x-2 text-xl text-white  font-bold border-2 w-1/3 py-2 rounded-full  ${reported === true ? "bg-red-900 cursor-not-allowed" : "bg-red-500 hover:bg-red-700 hover:text-[#FFF5D1] hover:cursor-pointer"}`}>
                            <MdReportGmailerrorred size={30}></MdReportGmailerrorred> Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
