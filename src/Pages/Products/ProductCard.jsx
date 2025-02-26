import { LuTriangle } from "react-icons/lu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseRole from "../../hooks/useRole";

const ProductCard = ({ product, refetch, isLoading }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [role] = UseRole();
    const [hasUpvoted, setHasUpvoted] = useState(false);

    const { _id, productName, productImage, productDescription, owner, upvotes, externalLink, tags, upVotedUsers } = product;

    useEffect(() => {
        if (user?.email && Array.isArray(upVotedUsers) && upVotedUsers.includes(user.email)) {
            setHasUpvoted(true);
        }
    }, [user, upVotedUsers]);

    const updateUpvote = async () => {
        if (hasUpvoted) {
            return;
        }

        try {
            await axiosSecure.patch(`/product/upvote/${_id}`);
            await axiosSecure.patch(`/product/feature-upvote/${_id}`);
            setHasUpvoted(true);
            refetch();

            Swal.fire({
                title: "Upvote done",
                icon: "success"
            });
        }
        catch (err) {
            console.log(err);
            Swal.fire({
                title: "Something went wrong",
                icon: "error"
            });
        }

    }

    return (
        <div className="w-full shadow-2xl shadow-gray-400 p-8 rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center gap-x-4">
                <img src={productImage} className="w-16 h-16" alt="" />
                <Link to={`/product/${_id}`}>
                    <h3 className="text-2xl font-black"> {productName} </h3>
                </Link>
            </div>

            <p className="text-lg my-4 flex-grow">
                {productDescription.slice(0, 140)}{productDescription.length > 100 ? "..." : ""}
            </p>

            <p className="text-xl font-black mb-2 inline"> Tags: </p>
            <div className="space-x-3 inline">
                {tags.map((tag, index) => (
                    <p key={index} className="inline px-3 rounded-xl border-2 border-[#6D1212] text-[#6D1212]">
                        {tag}
                    </p>
                ))}
            </div>

            <button
                onClick={updateUpvote}
                disabled={owner?.email === user?.email || hasUpvoted || role === "Admin" || role === "Moderator"}
                className={`flex justify-center items-center gap-x-2 text-xl text-white font-bold border-2 w-1/2 py-2 rounded-full mt-6
                    ${owner?.email === user?.email || hasUpvoted || role === "Admin" || role === "Moderator"
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-700 hover:text-[#FFF5D1] hover:cursor-pointer"}`}
            >
                <LuTriangle size={25} /> Upvote ({upvotes})
            </button>
        </div>
    );
};

export default ProductCard;
