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
export default function Tender(props) {
    const user = usePage().props.auth.user;
    const tender = usePage().props.tender;
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
    const deleteHandler = (id) => {
        // Sweet alert confirmation
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this tender!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // post id to backend laravel with another confirmation sweet alert
                swal("Poof! Your tender has been deleted!", {
                    icon: "success",
                }).then(() => {
                    // call delete function
                    Inertia.post(`/deletetender/${id}`);
                });
            } else {
                swal("Your tender is safe!");
            }
        });
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tender{" "}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg"> Tender Page </h3>
                            <div className="flex justify-between">
                                <div></div>
                                <div className="button-product-container mb-6 flex">
                                    <Link
                                        href="/addtender"
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
                                        Add Tender
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
                                                Company Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Company Contact Person
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Company Email
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
                                        {/* Map tender */}
                                        {tender.map((tender, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-200 hover:bg-gray-100"
                                            >
                                                <td className="py-3 px-6">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 px-6">
                                                    {tender.company_name}
                                                </td>
                                                <td className="py-3 px-6">
                                                    {
                                                        tender.company_contact_person
                                                    }
                                                </td>
                                                <td className="py-3 px-6">
                                                    {tender.company_email}
                                                </td>
                                                <td className="py-3 px-6">

                                                        <div className="flex ">
                                                            <Link
                                                                href={`/tenderedit/${tender.id}`}
                                                                className="bg-blue-500 flex items-center  hover:bg-blue-700 mr-2 w-max text-white font-bold py-2 px-4 rounded"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                className="bg-red-500 flex items-center  hover:bg-red-700 w-max text-white font-bold py-2 px-4 rounded"
                                                                onClick={() =>
                                                                    deleteHandler(
                                                                        tender.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>

                                                </td>
                                            </tr>
                                        ))}
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
