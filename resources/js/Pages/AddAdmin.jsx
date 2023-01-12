import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";

export default function Addadmin(props) {
    const users = usePage().props.users;
    const adminlist = usePage().props.adminlist;
    const [tempData, setTempData] = useState("0");
    const [brand, setBrand] = useState("");
    const deleteBrand = (id) => {
        setTempData(id);
        // sweet alert confirmation
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this brand!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            // Sweet alert success
            if (willDelete) {
                swal("Poof! Your brand has been deleted!", {
                    icon: "success",
                });
                setTempData("");
                // Inertia delete request
                Inertia.post(`/addadmin`, {
                    id: brand,
                });
            }
        });
    };
    const addBrand = (e) => {
        console.log(e);
        e.preventDefault();
        if (e.target.value == "") {
            swal("Please Select Admin", {
                icon: "warning",
                duration: 1000,
            });
        } else {
            Inertia.post("/addadmin", {
                admin: brand,
            });
            // react hot toast success
            toast.success("Admin Added Successfully", {
                position: "bottom-right",
            });
            setBrand("");
        }
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin / Add Admin
                </h2>
            }
        >
            <Head title="Add Brand " />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg pb-4">
                                Add New Admin
                            </h3>
                            <div className="flex">
                                <div className="flex-container">
                                    {/* Make tailwind form */}
                                    <form onSubmit={addBrand}>
                                        <div className="form-group">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-lg font-medium text-gray-700"
                                                >
                                                    Add Admin
                                                </label>
                                                <div className="mt-1">
                                                    {/* Make Select */}
                                                    <select
                                                        id="brand"
                                                        name="brand"
                                                        value={brand}
                                                        required
                                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                        onChange={(e) =>
                                                            setBrand(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {/* Make empty disabled default option */}
                                                        <option
                                                            value=""
                                                            selected
                                                            hidden
                                                        >
                                                            Select Admin
                                                        </option>
                                                        {/* map users for option*/}
                                                        {users.map((user) => (
                                                            <option
                                                                value={user.id}
                                                                key={user.id}
                                                            >
                                                                {user.name +
                                                                    " - " +
                                                                    user.email}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg pb-5">
                                Brand List
                            </h3>
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
                                                Admin Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map product categories for TR */}
                                        {adminlist.map((brands) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={brands.id}
                                            >
                                                <td className="py-4 px-6">
                                                    {brands.id}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {brands.email}
                                                </td>
                                                <td className="py-4 px-6"></td>
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
