import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
export default function Products(props) {
    const user = usePage().props.auth.user;

    // Call session status
    const sessionStatus = usePage().props.status;
    const productcategories = usePage().props.productCategories;
    if (sessionStatus)
        toast.success(sessionStatus, {
            position: "bottom-right",
        });
    useEffect(() => {
        // call session status success message with toast
    }, [, sessionStatus]);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products{" "}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg">
                                {" "}
                                Products Page{" "}
                            </h3>
                            <div className="flex justify-between">
                                <div></div>
                                <div className="button-product-container mb-6 flex">
                                    <Link
                                        href="/addproduct"
                                        className="bg-blue-500 flex items-center  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 inline pr-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Add Product
                                    </Link>
                                    <Link
                                        href="/myproduct"
                                        className="bg-transparent ml-2 flex items-center  border border-blue-500 hover:border-transparent hover:bg-blue-700 font-bold py-2 px-4 rounded  text-gray-900 hover:text-white  "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 inline pr-1  "
                                        >

                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                        My Product
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto relative">
                                <table className="w-full shadow border text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs border-b text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Category Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                See List
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map product categories for TR */}
                                        {productcategories.map(
                                            (productcategory) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={productcategory.id}
                                                >
                                                    <td className="py-4 px-6">
                                                        {productcategory.id}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {
                                                            productcategory.category_name
                                                        }
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <Link
                                                            href={`/product/${productcategory.category_name}`}
                                                            className="bg-blue-500 flex items-center  hover:bg-blue-700 w-max text-white font-bold py-2 px-4 rounded"
                                                        >
                                                            See List
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}

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
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
