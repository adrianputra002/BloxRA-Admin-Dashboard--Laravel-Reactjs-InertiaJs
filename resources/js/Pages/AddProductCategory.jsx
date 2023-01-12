import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";

export default function AddProductCategory(props) {
    const productCategory = usePage().props.productCategory;
const [tempData, setTempData] = useState("0");
const [category,setCategory] = useState("");
const deleteCategory = (id) => {
setTempData(id);
// sweet alert confirmation
swal({
title: "Are you sure?",
text: "Once deleted, you will not be able to recover this category!",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
    // Sweet alert success
    if (willDelete) {
        swal("Poof! Your category has been deleted!", {
            icon: "success",
        });
        setTempData("");
        // Inertia delete request
        Inertia.get(`/productcategorydelete/${id}`);
    }
});



}
const addCategory = (e) => {

e.preventDefault();
Inertia.post("/addproductcategory", {
category: category,
});
// react hot toast success
toast.success("Category Added Successfully", {
position: "bottom-right",
});
setCategory("");
}
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin / Add Product Category
                </h2>
            }
        >
            <Head title="Add Product Category " />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg pb-4">
                                Add New Category
                            </h3>
                            <div className="flex">
                                <div className="flex-container">
                                    {/* Make tailwind form */}
                                    <form onSubmit={addCategory}>
                                        <div className="form-group">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-lg font-medium text-gray-700"
                                                >
                                                    Category Name
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required value={category}
                                                         onChange={(e)=>setCategory(e.target.value)}
                                                        type="text"
                                                        name="model"
                                                        id="model"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md w-60"
                                                        placeholder="Indoor Product"
                                                    />
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
                      <h3 className="font-bold text-lg pb-5">Product Category List</h3>
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
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map product categories for TR */}
                                        {productCategory.map(
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
                                                        <div  onClick={()=>deleteCategory(productcategory.id)} className="cursor-pointer text-red-500">

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
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
