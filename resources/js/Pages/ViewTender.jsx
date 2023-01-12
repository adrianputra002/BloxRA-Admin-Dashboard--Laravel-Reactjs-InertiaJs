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
import jsPDF from "jspdf";
import { set } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
export default function AddTender(props) {
    const [uploadMain, setUploadMain] = useState(false);
    const [uploadDimension, setUploadDimension] = useState(false);
    const [uploadPhotometric, setUploadPhotometric] = useState(false);
    const [uploadAccessories, setUploadAccessories] = useState(false);
    const product = usePage().props.product;
    const productCategory = usePage().props.categories;
    const brand = usePage().props.brand;
    const tender=usePage().props.tender;
    const products = usePage().props.products;
    const { data, setData, post, processing, errors, reset } = useForm({
        category: "",
        companyname: tender.company_name,
        contactperson: tender.company_contact_person,
        email: tender.company_email,
        phonenumber: tender.company_phone_number,
        address: tender.company_address,
        city: tender.company_city,
        state: tender.company_state,
        country: tender.company_counter,
        assignproductid: "",

        brand: product.product_brand,
        model: "",
        temperature: "",
        ipclass: "",
        luminiare: product.product_luminiare_type
    });
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };
    useEffect(() => {}, [data]);
    const onHandleChangeCustom = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        // filter product where product id= event.target.value
        let product = props.products.filter(
            (product) => product.id == event.target.value
        );

        // set product data to form
        // Copy data first before setting it

        setData({
            ...data,
            luminiare: product[0].product_luminiare_type,
            brand: product[0].product_brand,
        });
        // set brand
    };
    const generatePDF = () => {
            const doc = new jsPDF("portrait", "pt", "a1");
            doc.html(document.body, {
                callback: () => {
                    doc.save("document.pdf");
                },
            });
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
        // Sweet alert submit confirmation
        swal({
            title: "Are you sure?",
            text: "Once submitted, this tender will be uploaded!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // post to route tender.add with the data list

                swal("Tender has been submitted!", {
                    icon: "success",
                }).then(()=>{
                    post(route("tender.add"));
                })
            } else {
                swal("Action cancelled!");
            }
        });
    };
    const uploadMainHandler = (e) => {
        setUploadMain(true);
        console.log(e.target.files[0]);
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
                    Tender / <small> View Tender </small>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-bold text-lg pb-4">
                                Company Detail
                            </h3>
                            <div className="flex justify-between">
                                <div></div>
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
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pb-5">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Company Name
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="companyname"
                                                        id="companyname"
                                                        value={data.companyname}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Bloxr"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Contact Person
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="contactperson"
                                                        value={
                                                            data.contactperson
                                                        }
                                                        id="contactperson"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Contact Person"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Email Address
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        value={data.email}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="YourEmail@email.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Phone Number
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="phonenumber"
                                                        value={data.phonenumber}
                                                        id="phonenumber"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="085351748536"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Address
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="address"
                                                        value={data.address}
                                                        id="address"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Bloxr Street No. 31"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    City
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="city"
                                                        value={data.city}
                                                        id="city"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Sibolga"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    State
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="state"
                                                        value={data.state}
                                                        id="state"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="North Sumatra"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Country
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="country"
                                                        value={data.country}
                                                        id="country"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Indonesia"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-9">
                                            <hr />
                                        </div>
                                        <h3 className="font-bold text-lg py-4">
                                            Spec. Code
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pb-5">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Assign Product
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required type="text"
                                                        id="assignproductid"
                                                        name="assignproductid"
                                                        value={
                                                            product.product_model
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        onChange={
                                                            onHandleChangeCustom
                                                        }
                                                 /   >

                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Brand
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="brand"
                                                        value={data.brand}
                                                        id="brand"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="GoGrab"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Luminiare Type
                                                </label>
                                                <div className="mt-1">
                                                    <input readOnly
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="luminiare"
                                                        id="luminiare"
                                                        value={data.luminiare}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Luminiare 2"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex mt-4"></div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
