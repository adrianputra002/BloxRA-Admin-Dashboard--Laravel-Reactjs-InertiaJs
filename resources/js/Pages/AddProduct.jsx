import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { set } from "lodash";
import { useState } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
export default function Products(props) {
    const [uploadMain, setUploadMain] = useState(false);
    const [uploadDimension, setUploadDimension] = useState(false);
    const [uploadPhotometric, setUploadPhotometric] = useState(false);
    const [uploadAccessories, setUploadAccessories] = useState(false);
    const productCategory = usePage().props.categories;
    const brand = usePage().props.brand;
    const { data, setData, post, processing, errors, reset } = useForm({
        category: "",
        brand: "",
        luminaire: "",
        model: "",
        temperature: "",
        ipclass: "",
        luminiare: "",
        cri: "",
        lumenoutput: "",
        lightsource: "",

        beamangle: "",
        driver: "",
        colorconsistency: "",
        lamptype: "",
        dimensionphoto: [],
        photometricphoto: [],
        accessoriesphoto: [],
        mainphoto: [],

        productcontent: "",
    });
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };
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

    const onHandleChangeDimension = (event) => {
        // destroy session error
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

    const user = usePage().props.auth.user;
    // console.log(user);
    const submitProduct = (e) => {
        e.preventDefault();
        // console.log(e);
// sweet alert confirmation  before and after submit
swal({
    title: "Are you sure?",
    text: "Once submitted, product will be uploaded!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
})
    .then((willDelete) => {
        if (willDelete) {
            swal("Poof! Your product has been uploaded!", {
                icon: "success",
            }).then(()=>{
        post(route("product.add"));

            })
        } else {
            swal("Your product is safe!");
        }
    });


    };
    const uploadMainHandler = (e) => {
        setUploadMain(true);
        console.log(e.target.files[0]);
    };
    // get session error
    let sessionError = usePage().props.errors;
    // Toast for session error
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

        // console.log(sessionError);
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products / <small> Add Product </small>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg pb-3">
                                Add a New Product
                            </h3>

                            <div className="flex justify-between">
                                <div></div>
                                <div>
                                    <Link
                                        href={route("product.addbyexcel")}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add by Excel
                                    </Link>
                                </div>
                            </div>
                            <div className="form-container">
                                <form onSubmit={submitProduct}>
                                    <div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Category Product
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        required
                                                        id="category"
                                                        name="category"
                                                        value={data.category}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    >
                                                        <option
                                                            disabled
                                                            defaultValue
                                                            value=""
                                                        >
                                                            -- select an option
                                                            --
                                                        </option>
                                                        {/* Loop product category */}
                                                        {productCategory.map(
                                                            (item) => (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.category_name
                                                                    }
                                                                >
                                                                    {
                                                                        item.category_name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Brand
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        required
                                                        id="brand"
                                                        value={data.brand}
                                                        name="brand"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option
                                                            disabled
                                                            defaultValue
                                                            value=""
                                                        >
                                                            -- select an option
                                                            --
                                                        </option>
                                                        {/* loop brand*/}
                                                        {brand.map((item) => (
                                                            <option
                                                                value={
                                                                    item.brand_name
                                                                }
                                                            >
                                                                {
                                                                    item.brand_name
                                                                }
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Luminiare Type
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        value={data.luminiare}
                                                        id="luminiare"
                                                        name="luminiare"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option
                                                            disabled
                                                            defaultValue
                                                            value=""
                                                        >
                                                            -- select an option
                                                            --
                                                        </option>
                                                        <option value="Luminiare No. 1">
                                                            Luminiare No. 1
                                                        </option>
                                                        <option value="Luminiare No. 2">
                                                            Luminiare No. 2
                                                        </option>
                                                        <option value="Luminiare No. 3">
                                                            Luminiare No. 3
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Product Model
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="model"
                                                        id="model"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Product-GPT"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    Color Temperature
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        required
                                                        name="temperature"
                                                        id="temperature"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="93 C"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    IP Class
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        required
                                                        name="ipclass"
                                                        id="ipclass"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="WhatIsIPClass"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    CRI
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        name="cri"
                                                        id="cri"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="CRI"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    Lumen Output
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        required
                                                        name="lumenoutput"
                                                        id="lumenoutput"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="300 Watts"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    Light Source
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        required
                                                        name="lightsource"
                                                        id="lightsource"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Stars"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    Beam Angle
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        required
                                                        name="beamangle"
                                                        id="beamangle"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="270 Deg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    Color Consistency
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        name="colorconsistency"
                                                        id="colorconsistency"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Consistent"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    Lamp Type
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        name="lamptype"
                                                        id="lamptype"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="LED"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-7 mr-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6 inline"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    Driver
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        required
                                                        name="driver"
                                                        id="driver"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Intel"
                                                    />
                                                </div>
                                            </div>
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
                                        <div className="grid w-full grid-cols-1">
                                            <label
                                                htmlFor="productcontent"
                                                className="block text-sm font-medium flex items-center mb-2 text-gray-700"
                                            >
                                                Product Content
                                            </label>
                                            <textarea
                                                required
                                                onChange={onHandleChange}
                                                name="productcontent"
                                                id="productcontent"
                                                cols="30"
                                                rows="4"
                                                className="w-full  border-2 border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500"
                                            ></textarea>
                                        </div>
                                        <div className="flex mt-4"></div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
