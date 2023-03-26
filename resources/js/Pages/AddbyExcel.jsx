import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
export default function AddByExcel(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        excelfile: [],
        dimensionphoto: [],
        photometricphoto: [],
        accessoriesphoto: [],
        mainphoto: [],
    });
    const onHandleChangeMain = (event) => {
        sessionError.mainphoto = "";
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadMain(true);
    };
    const onHandleChangeExcel = (event) => {
        sessionError.excelfile = "";
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };
    const onHandleChangeDimension = (event) => {
        sessionError.dimensionphoto = "";
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadDimension(true);
    };
    const onHandleChangePhotometric = (event) => {
        sessionError.photometricphoto = "";
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadPhotometric(true);
    };
    const onHandleChangeAccessories = (event) => {
        sessionError.accessoriesphoto = "";
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadAccessories(true);
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };
    const [uploadMain, setUploadMain] = useState(false);
    const [uploadDimension, setUploadDimension] = useState(false);
    const [uploadPhotometric, setUploadPhotometric] = useState(false);
    const [uploadAccessories, setUploadAccessories] = useState(false);

    const submitExcel = (e) => {
        e.preventDefault();
        swal({
            title: "Confirmation",
            text: "Are you sure this is the right file?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Product Added!", {
                    icon: "success",
                }).then(() => {
                    post(route("product.addbyexcel"));
                });
                //   Redirect to product list
            } else {
                swal("Action cancelled!");
            }
        });
    };
    let sessionError = usePage().props.errors;
    // Toast for session error
    useEffect(() => {
        if (sessionError) {
            if (sessionError.accessoriesphoto)
                toast.error(sessionError.accessoriesphoto, {
                    position: "bottom-right",
                });
            if (sessionError.photometricphoto)
                toast.error(sessionError.photometricphoto, {
                    position: "bottom-right",
                });
            if (sessionError.dimensionphoto)
                toast.error(sessionError.dimensionphoto, {
                    position: "bottom-right",
                });

            if (sessionError.mainphoto)
                toast.error(sessionError.mainphoto, {
                    position: "bottom-right",
                });
            if (sessionError.excelfile)
                toast.error(sessionError.excelfile, {
                    position: "bottom-right",
                });
            // console.log(sessionError);
        }
    }, [sessionError]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products / Add Product With Excel
                </h2>
            }
        >
            <Head title="Add Product With Excel" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-5 font-bold text-lg">
                                Add New Product With Excel
                            </div>

                            <div>
                                <div className="mb-5 ">
                                    <label
                                        className="block  text-lg text-gray-700 text-sm font-bold mb-3"
                                        htmlFor="name"
                                    >
                                        Download Excel Sample
                                    </label>
                                    <a
                                        href="/exceltemplate"
                                        className="px-3 py-2 hover:bg-slate-600 text-white bg-slate-500"
                                    >
                                        Download
                                    </a>
                                </div>
                                <hr className="mb-4" />
                                <form onSubmit={submitExcel}>
                                    <div className="mb-5 ">
                                        <label
                                            className="block  text-lg text-gray-700 text-sm font-bold mb-3"
                                            htmlFor="name"
                                        >
                                            Upload Excel File
                                        </label>

                                        <input
                                            type="file"
                                            onChange={onHandleChange}
                                            name="excelfile"
                                            id="excelfile"
                                            className="px-3 py-2 hover:bg-slate-600 text-white bg-slate-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2  w-full">
                                        <div className="mb-7 mr-2 ">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                            >
                                                Main Photo
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            {/* Input type file */}
                                            <div className="mt-1">
                                                <label
                                                    htmlFor="mainphoto"
                                                    required
                                                    className={`
                                                        ${
                                                            uploadMain
                                                                ? "bg-green-500 hover:bg-green-700"
                                                                : "bg-blue-500 hover:bg-blue-700"
                                                        }
                                                        ml-1 cursor-pointer text-center justify-center flex items-center w-min   text-white font-bold py-2 px-3 rounded-2xl hover:rounded-sm rounded`}
                                                >
                                                    {uploadMain
                                                        ? "Done"
                                                        : "Upload"}
                                                </label>
                                                <input
                                                    onChange={
                                                        onHandleChangeMain
                                                    }
                                                    type="file"
                                                    name="mainphoto"
                                                    id="mainphoto"
                                                    className="hidden"
                                                    placeholder="Intel"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-7 mr-2  ">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                            >
                                                Dimension Photo
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            {/* Input type file */}
                                            <div className="mt-1">
                                                <label
                                                    required
                                                    htmlFor="dimensionphoto"
                                                    className={`
                                                        ${
                                                            uploadDimension
                                                                ? "bg-green-500 hover:bg-green-700"
                                                                : "bg-blue-500 hover:bg-blue-700"
                                                        }
                                                        ml-1 cursor-pointer text-center justify-center flex items-center w-min   text-white font-bold py-2 px-3 rounded-2xl hover:rounded-sm rounded`}
                                                >
                                                    {uploadDimension
                                                        ? "Done"
                                                        : "Upload"}
                                                </label>
                                                <input
                                                    onChange={
                                                        onHandleChangeDimension
                                                    }
                                                    type="file"
                                                    name="dimensionphoto"
                                                    id="dimensionphoto"
                                                    className="hidden"
                                                    placeholder="Intel"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-7 mr-2 ">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                            >
                                                Photometric Photo
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            {/* Input type file */}

                                            <div className="mt-1">
                                                <label
                                                    required
                                                    htmlFor="photometricphoto"
                                                    className={`
                                                        ${
                                                            uploadPhotometric
                                                                ? "bg-green-500 hover:bg-green-700"
                                                                : "bg-blue-500 hover:bg-blue-700"
                                                        }
                                                        ml-1 cursor-pointer text-center justify-center flex items-center w-min   text-white font-bold py-2 px-3 rounded-2xl hover:rounded-sm rounded`}
                                                >
                                                    {uploadPhotometric
                                                        ? "Done"
                                                        : "Upload"}
                                                </label>
                                                <input
                                                    onChange={
                                                        onHandleChangePhotometric
                                                    }
                                                    type="file"
                                                    name="photometricphoto"
                                                    id="photometricphoto"
                                                    className="hidden"
                                                    placeholder="Intel"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-7 mr-2  ">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                            >
                                                Accessories Photo
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            {/* Input type file */}
                                            <div className="mt-1">
                                                <label
                                                    required
                                                    htmlFor="accessoriesphoto"
                                                    className={`
                                                        ${
                                                            uploadAccessories
                                                                ? "bg-green-500 hover:bg-green-700"
                                                                : "bg-blue-500 hover:bg-blue-700"
                                                        }
                                                        ml-1 cursor-pointer text-center justify-center flex items-center w-min   text-white font-bold py-2 px-3 rounded-2xl hover:rounded-sm rounded`}
                                                >
                                                    {uploadAccessories
                                                        ? "Done"
                                                        : "Upload"}
                                                </label>
                                                <input
                                                    onChange={
                                                        onHandleChangeAccessories
                                                    }
                                                    type="file"
                                                    name="accessoriesphoto"
                                                    id="accessoriesphoto"
                                                    className="hidden"
                                                    placeholder="Intel"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-3 text-white font-bold py-2 bg-green-500 hover:bg-green-600"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
