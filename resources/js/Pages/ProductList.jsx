import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
export default function ProductList(props) {
    const user = usePage().props.auth.user;
    const product = usePage().props.product;
    const filteredProducts = product.map(product => {
        return {
            ...product,
            product_img_main_photo_path: product.product_img_main_photo_path.split("/").pop()
        };
    });
console.log(filteredProducts)
    let productLength = product.length;
    // Call session status
    let sessionStatus = usePage().props.status;

    useEffect(() => {
        // call session status success message with toast
        if (sessionStatus)
            toast.success("Product Deleted", {
                position: "bottom-right",
            });
    }, [, sessionStatus]);
    const deleteHandler = (token) => {
        // return sweet alert confirmation
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Product Deleted!", {
                    icon: "warning",
                }).then(() => {
                    Inertia.get("/deleteproduct/" + token);
                });
            } else {
                swal("Your product is safe!");
            }
        });
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products / Product List{" "}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg pb-3">
                                {" "}
                                Product List Page{" "}
                            </h3>

                            <div className="overflow-x-auto relative">
                                <table className="w-full shadow border text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs border-b text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Model Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Product Main Photo
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Product Brand
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Product Luminiare Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Product Color Temperature
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    {productLength == 0 ? (
                                        <h3 className="font-bold text-lg p-4 border-b border-t w-full ">
                                            No data available for this category
                                            . . .
                                        </h3>
                                    ) : (
                                        <tbody>
                                            {/* Map product categories for TR */}
                                            {filteredProducts.map((product) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={product.id}
                                                >
                                                    <td className="py-4 px-6">
                                                        {product.product_model}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <img src={`../public/mainPhoto/${product.product_img_main_photo_path}`} width="250px" height="250px" alt="" />
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {product.product_brand}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {
                                                            product.product_luminiare_type
                                                        }
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {
                                                            product.product_color_temperature
                                                        }
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {product.uploaded_by ===
                                                        user.email ? (
                                                            <div className="flex  ">
                                                                <Link
                                                                    href={`/productedit/${product.token}`}
                                                                    className="bg-blue-500 flex items-center  hover:bg-blue-700 mr-2 w-max text-white font-bold py-2 px-4 rounded"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    className="bg-red-500 flex items-center  hover:bg-red-700 w-max text-white font-bold py-2 px-4 rounded"
                                                                    onClick={() =>
                                                                        deleteHandler(
                                                                            product.token
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex  ">
                                                                <Link
                                                                    href={`/productview/${product.token}`}
                                                                    className="bg-blue-500 flex items-center  hover:bg-blue-700 w-max text-white font-bold py-2 px-4 rounded"
                                                                >
                                                                    Detail
                                                                </Link>{" "}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}

                                            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td className="py-4 px-6">
                                                Sliver
                                            </td>
                                        </tr> */}
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
