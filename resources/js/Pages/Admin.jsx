import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Page
                </h2>
            }
        >
            <Head title="Admin Page" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                           <h1 className="font-bold pb-3"> Product Setting</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-5 mt-3">
                                <div className="bg-white overflow-hidden shadow-sm border sm:rounded-lg">
                                    <div className="border-b-2  text-blue-400 font-bold text-lg">
                                        <div className="p-6">
                                            Add Product Category
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        You can add a new product category from
                                        this button below.
                                        <br />
                                        Ex. Indoor Product, Outdoor Product,
                                        Electric Product etc.
                                        <br />
                                        <div className="mt-4">
                                            <Link
                                                href={route("category.addcategoryview")}
                                                className="px-3  py-2 bg-blue-500 hover:bg-blue-600 text-white  mt-3"
                                            >
                                                Add New Category
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow-sm border sm:rounded-lg">
                                    <div className="border-b-2  text-slate-400 font-bold text-lg">
                                        <div className="p-6">
                                            Add  Brand
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        You can add a new  Brand from
                                        this button below.
                                        <br />
                                        Ex. Toyoto, Shope, PalPay, Twittar etc.
                                        <br />
                                        <div className="mt-4">
                                            <Link
                                                href={route("brand.addbrandview")}
                                                className="px-3  py-2 bg-slate-500 hover:bg-slate-600 text-white  mt-3"
                                            >
                                                Add New Brand
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow-sm border sm:rounded-lg">
                                    <div className="border-b-2  text-blue-400 font-bold text-lg">
                                        <div className="p-6">
                                            Add  Luminiare Type
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        You can add a new  Luminiare Type from
                                        this button below.
                                        <br />
                                        Ex. Luminiare Type 1, Luminiare Type 2, Luminiare Type 3 etc.
                                        <br />
                                        <div className="mt-4">
                                            <Link
                                                href={route("product.admin")}
                                                className="px-3  py-2 bg-blue-500 hover:bg-blue-600 text-white  mt-3"
                                            >
                                                Coming Soon
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>{" "}
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h1 className="font-bold pb-3"> User Setting</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-5 mt-3">
                                <div className="bg-white overflow-hidden shadow-sm border sm:rounded-lg">
                                    <div className="border-b-2  text-red-400 font-bold text-lg">
                                        <div className="p-6">
                                            Disable Product Page for Non-Admin
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        You can temporarily disable all the product function for non admin user.
                                        <br />
                                    Only admin can access the product page while this function enabled.
                                        <br />
                                        <div className="mt-4">
                                            <Link
                                                href={route("product.admin")}
                                                className="px-3  py-2 bg-red-500 hover:bg-red-600 text-white  mt-3"
                                            >
                                                Coming Soon
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow-sm border sm:rounded-lg">
                                    <div className="border-b-2  text-slate-400 font-bold text-lg">
                                        <div className="p-6">
                                            Add  New Admin
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        You can add a new admin  from this button below.
                                        <br />
                                        Need to choose 1 username from the list.
                                        <br />
                                        <div className="mt-4">
                                            <Link
                                                href={route("admin.addview")}
                                                className="px-3  py-2 bg-slate-500 hover:bg-slate-600 text-white  mt-3"
                                            >
                                              Add New Admin
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
