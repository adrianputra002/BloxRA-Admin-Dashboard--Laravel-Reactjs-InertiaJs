import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import jsPDF from "jspdf";
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
import axios, { Axios } from "axios";
export default function EditProduct(props) {
    const [uploadMain, setUploadMain] = useState(false);
    const [uploadDimension, setUploadDimension] = useState(false);
    const [uploadPhotometric, setUploadPhotometric] = useState(false);
    const [uploadAccessories, setUploadAccessories] = useState(false);
    //    get use page mainphoto
    const mainphotoimg = usePage().props.mainphoto;
    const { data, setData, post, processing, errors, reset } = useForm({
        category: props.product.product_category,
        brand: props.product.product_brand,
        model: props.product.product_model,
        token: props.product.token,
        temperature: props.product.product_color_temperature,
        ipclass: props.product.product_ip_class,
        luminiare: props.product.product_luminiare_type,
        cri: props.product.product_cri,
        lumenoutput: props.product.product_lumen_output,
        lightsource: props.product.product_light_source,
        beamangle: props.product.product_beam_angle,
        driver: props.product.product_driver,
        colorconsistency: props.product.product_color_consistency,
        lamptype: props.product.product_lamp_type,
        dimensionphoto: {
            name: props.product.product_img_dimension_photo_name,
            size: props.product.product_img_dimension_photo_size,
            // remove path 'public/' from the string
            path: props.product.product_img_dimension_photo_path.replace(
                "public/",
                ""
            ),
            // path: props.product.product_img_dimension_photo_path,
        },
        photometricphoto: {
            name: props.product.product_img_photometric_photo_name,
            size: props.product.product_img_photometric_photo_size,
            path: props.product.product_img_photometric_photo_path.replace(
                "public/",
                ""
            ),
        },
        accessoriesphoto: {
            name: props.product.product_img_accessories_photo_name,
            size: props.product.product_img_accessories_photo_size,
            path: props.product.product_img_accessories_photo_path.replace(
                "public/",
                ""
            ),
        },
        mainphoto: {
            name: props.product.product_img_main_photo_name,
            size: props.product.product_img_main_photo_size,
            path: props.product.product_img_main_photo_path.replace(
                "public/",
                ""
            ),
        },
        productcontent: props.product.product_content,
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
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadMain(true);
    };
    const onHandleChangeDimension = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadDimension(true);
    };
    const generatePDF = () => {
        const doc = new jsPDF("portrait","pt","a1");
        doc.html(document.body, {
          callback: () => {
            doc.save('document.pdf');
          },
        });
    };
    const onHandleChangePhotometric = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadPhotometric(true);
    };
    const onHandleChangeAccessories = (event) => {
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

        post(route("product.editsubmit"));
    };
    const uploadMainHandler = (e) => {
        setUploadMain(true);
    };
    // get session error
    const sessionError = usePage().props.errors;
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
                    Products / <small> Edit Product </small>
                </h2>
            }
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg pb-3">
                                Edit Product Detail
                            </h3>
                            <div className="flex justify-between">
                                <div>

                                </div>
                                <a
                                  onClick={generatePDF}
                                    className="px-3 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Export to PDF
                                </a>
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
                                                            value={
                                                                data.category
                                                            }
                                                            defaultValue
                                                        >
                                                            {data.category}
                                                        </option>
                                                        <option value="Indoor Product">
                                                            Indoor Product
                                                        </option>
                                                        <option value="Outdoor Product">
                                                            Outdoor Product
                                                        </option>
                                                        <option value="Decorative Product">
                                                            Decorative Product
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <input
                                                type="hidden"
                                                onChange={onHandleChange}
                                                name="token"
                                                value={data.token}
                                            />
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
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300  rounded-md"
                                                    >
                                                        <option
                                                            value={data.brand}
                                                            defaultValue
                                                        >
                                                            {data.brand}
                                                        </option>
                                                        <option value="Brand No. 1">
                                                            Brand No. 1
                                                        </option>
                                                        <option value="Brand No. 2">
                                                            Brand No. 2
                                                        </option>
                                                        <option value="Brand No. 3">
                                                            Brand No. 3
                                                        </option>
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
                                                            value={
                                                                data.luminiare
                                                            }
                                                            defaultValue
                                                        >
                                                            {data.luminiare}
                                                        </option>
                                                        <option
                                                            {...(data.luminiare ===
                                                                "Luminiare No. 1" &&
                                                                "defaultValue")}
                                                            value="Luminiare No. 1"
                                                        >
                                                            Luminiare No. 1
                                                        </option>
                                                        <option
                                                            {...(data.luminiare ===
                                                                "Luminiare No. 2" &&
                                                                "defaultValue")}
                                                            value="Luminiare No. 2"
                                                        >
                                                            Luminiare No. 2
                                                        </option>
                                                        <option
                                                            {...(data.luminiare ===
                                                                "Luminiare No. 3" &&
                                                                "defaultValue")}
                                                            value="Luminiare No. 3"
                                                        >
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
                                                        value={data.model}
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
                                                        value={data.temperature}
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
                                                        value={data.ipclass}
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
                                                        value={data.cri}
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
                                                        value={data.lumenoutput}
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
                                                        value={data.lightsource}
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
                                                        value={data.beamangle}
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
                                                        value={
                                                            data.colorconsistency
                                                        }
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
                                                        value={data.lamptype}
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
                                                        value={data.driver}
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
                                                    <img
                                                        width="300px"
                                                        height="300px"
                                                        src={`../storage/${data.mainphoto.path}`}
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
                                                    <img
                                                        width="300px"
                                                        height="300px"
                                                        src={`../storage/${data.dimensionphoto.path}`}
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
                                                    <img
                                                        width="300px"
                                                        height="300px"
                                                        src={`../storage/${data.photometricphoto.path}`}
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
                                                    <img
                                                        width="300px"
                                                        height="300px"
                                                        src={`../storage/${data.accessoriesphoto.path}`}
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
                                                value={data.productcontent}
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
                                        className="bg-orange-500  hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Submit Edit
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
