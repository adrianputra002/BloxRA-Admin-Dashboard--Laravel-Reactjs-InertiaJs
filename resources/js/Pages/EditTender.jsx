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
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
export default function EditTender(props) {
    const [uploadMain, setUploadMain] = useState(false);
    const [uploadDimension, setUploadDimension] = useState(false);
    const [uploadPhotometric, setUploadPhotometric] = useState(false);
    const [uploadAccessories, setUploadAccessories] = useState(false);
    const [uploadMainSecond, setUploadMainSecond] = useState(false);
    const [uploadDimensionSecond, setUploadDimensionSecond] = useState(false);
    const [uploadPhotometricSecond, setUploadPhotometricSecond] =
        useState(false);
    const [uploadAccessoriesSecond, setUploadAccessoriesSecond] =
        useState(false);
    const [uploadMainThird, setUploadMainThird] = useState(false);
    const [uploadDimensionThird, setUploadDimensionThird] = useState(false);
    const [uploadPhotometricThird, setUploadPhotometricThird] = useState(false);
    const [uploadAccessoriesThird, setUploadAccessoriesThird] = useState(false);
    const product = usePage().props.product;
    const tender = usePage().props.tender;
    const productCategory = usePage().props.categories;
    const products = usePage().props.products;
    const brand = usePage().props.brand;
    const { data, setData, post, processing, errors, reset } = useForm({
        id: tender.id,
        category: "",
        companyname: tender.company_name,
        contactperson: tender.company_contact_person,
        email: tender.company_email,
        phonenumber: tender.company_phone_number,
        address: tender.company_address,
        city: tender.company_city,
        state: tender.company_state,
        country: tender.company_country,
        assignproductid: tender.assignproductid,
        notes: tender.notes,
        model: "",
        temperature: tender.temperature,
        ipclass: tender.ipclass,
        luminiare: tender.luminiare,
        brand: tender.brand,
        luminaire: "",
        cri: tender.cri,
        lumenoutput: tender.lumenoutput,
        lightsource: tender.lightsource,
        dimensionphoto: {path:tender.dimensionphoto.replace(
            /public\//,
            "storage/"
        ),},
        photometricphoto:  {path: tender.photometricphoto.replace(
            /public\//,
            "storage/"
        ),},
        accessoriesphoto: "",
        mainphoto: {path: tender.mainphoto.replace(
            /public\//,
            "storage/"
        ),},
        beamangle: tender.beamangle,
        driver: tender.driver,
        colorconsistency: tender.colorconsistency,
        lamptype: tender.lamptype,

        // Second Product

        categorysecond: "",
        assignproductidsecond: tender.assignproductidsecond,
        notessecond: tender.notessecond,
        modelsecond: "",
        temperaturesecond: tender.temperaturesecond,
        ipclasssecond: tender.ipclasssecond,
        luminiaresecond: tender.luminiaresecond,
        brandsecond: tender.brandsecond,
        luminairesecond: "",
        modelsecond: "",
        temperaturesecond: tender.temperaturesecond,
        ipclasssecond: tender.ipclasssecond,
        crisecond: tender.crisecond,
        lumenoutputsecond: tender.lumenoutputsecond,
        lightsourcesecond: tender.lightsourcesecond,
        dimensionphotosecond: {path: tender.dimensionphotosecond.replace(
            /public\//,
            "storage/"
        ),},
        photometricphotosecond: {path: tender.photometricphotosecond.replace(
            /public\//,
            "storage/"
        ),},
        accessoriesphotosecond: "",
        mainphotosecond: {path: tender.mainphotosecond.replace(
            /public\//,
            "storage/"
        ),},
        beamanglesecond: tender.beamanglesecond,
        driversecond: tender.driversecond,
        colorconsistencysecond: tender.colorconsistencysecond,
        lamptypesecond: tender.lamptypesecond,

        // Third Product

        categorythird: "",
        assignproductidthird: tender.assignproductidthird,
        notesthird: tender.notesthird,
        modelthird: "",
        temperaturethird: tender.temperaturethird,
        ipclassthird: tender.ipclassthird,
        luminiarethird: tender.luminiarethird,
        brandthird: tender.brandthird,
        luminairethird: "",
        modelthird: "",
        temperaturethird: tender.temperaturethird,
        ipclassthird: tender.ipclassthird,
        crithird: tender.crithird,
        lumenoutputthird: tender.lumenoutputthird,
        lightsourcethird: tender.lightsourcethird,
        dimensionphotothird:  {path: tender.dimensionphotothird.replace(
            /public\//,
            "storage/"
        ),},
        photometricphotothird: {path: tender.photometricphotothird.replace(
            /public\//,
            "storage/"
        ),},
        accessoriesphotothird: [],
        mainphotothird: {path: tender.mainphotothird.replace(
            /public\//,
            "storage/"
        ),},
        beamanglethird: tender.beamanglethird,
        driverthird: tender.driverthird,
        colorconsistencythird: tender.colorconsistencythird,
        lamptypethird: tender.lamptypethird,
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
            assignproductid: product[0].id,
            temperature: product[0].product_temperature,
            ipclass: product[0].product_ip_class,
            cri: product[0].product_cri,
            lumenoutput: product[0].product_lumen_output,
            lightsource: product[0].product_light_source,
            beamangle: product[0].product_beam_angle,
            driver: product[0].product_driver,
            colorconsistency: product[0].product_color_consistency,
            lamptype: product[0].product_lamp_type,
            category: product[0].product_category,
            temperature: product[0].product_color_temperature,
            mainphoto: {
                name: product[0].product_img_main_photo_name,
                path: product[0].product_img_main_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_main_photo_size,
            },
            dimensionphoto: {
                name: product[0].product_img_dimension_photo_name,
                path: product[0].product_img_dimension_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_dimension_photo_size,
            },
            photometricphoto: {
                name: product[0].product_img_photometric_photo_name,
                path: product[0].product_img_photometric_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_photometric_photo_size,
            },
            accessoriesphoto: {
                name: product[0].product_img_accessories_photo_name,
                path: product[0].product_img_accessories_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_accessories_photo_size,
            },
        });
        setUploadMain(false);
        setUploadDimension(false);
        setUploadPhotometric(false);
        setUploadAccessories(false);
        // set brand
    };
    const onHandleChangeCustomSecond = (event) => {
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
            luminiaresecond: product[0].product_luminiare_type,
            brandsecond: product[0].product_brand,
            assignproductidsecond: product[0].id,
            temperaturesecond: product[0].product_temperature,
            ipclasssecond: product[0].product_ip_class,
            crisecond: product[0].product_cri,
            lumenoutputsecond: product[0].product_lumen_output,
            lightsourcesecond: product[0].product_light_source,
            beamanglesecond: product[0].product_beam_angle,
            driversecond: product[0].product_driver,
            colorconsistencysecond: product[0].product_color_consistency,
            lamptypesecond: product[0].product_lamp_type,
            categorysecond: product[0].product_category,
            temperaturesecond: product[0].product_color_temperature,
            mainphotosecond: {
                name: product[0].product_img_main_photo_name,
                path: product[0].product_img_main_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_main_photo_size,
            },
            dimensionphotosecond: {
                name: product[0].product_img_dimension_photo_name,
                path: product[0].product_img_dimension_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_dimension_photo_size,
            },
            photometricphotosecond: {
                name: product[0].product_img_photometric_photo_name,
                path: product[0].product_img_photometric_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_photometric_photo_size,
            },
            accessoriesphotosecond: {
                name: product[0].product_img_accessories_photo_name,
                path: product[0].product_img_accessories_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_accessories_photo_size,
            },
        });
        setUploadMainSecond(false);
        setUploadDimensionSecond(false);
        setUploadPhotometricSecond(false);
        setUploadAccessoriesSecond(false);
        // set brand
    };
    const onHandleChangeCustomThird = (event) => {
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
            luminiarethird: product[0].product_luminiare_type,
            brandthird: product[0].product_brand,
            assignproductidthird: product[0].id,
            temperaturethird: product[0].product_temperature,
            ipclassthird: product[0].product_ip_class,
            crithird: product[0].product_cri,
            lumenoutputthird: product[0].product_lumen_output,
            lightsourcethird: product[0].product_light_source,
            beamanglethird: product[0].product_beam_angle,
            driverthird: product[0].product_driver,
            colorconsistencythird: product[0].product_color_consistency,
            lamptypethird: product[0].product_lamp_type,
            categorythird: product[0].product_category,
            temperaturethird: product[0].product_color_temperature,
            mainphotothird: {
                name: product[0].product_img_main_photo_name,
                path: product[0].product_img_main_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_main_photo_size,
            },
            dimensionphotothird: {
                name: product[0].product_img_dimension_photo_name,
                path: product[0].product_img_dimension_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_dimension_photo_size,
            },
            photometricphotothird: {
                name: product[0].product_img_photometric_photo_name,
                path: product[0].product_img_photometric_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_photometric_photo_size,
            },
            accessoriesphotothird: {
                name: product[0].product_img_accessories_photo_name,
                path: product[0].product_img_accessories_photo_path.replace(
                    /public\//,
                    "storage/"
                ),
                size: product[0].product_img_accessories_photo_size,
            },
        });
        setUploadMainThird(false);
        setUploadDimensionThird(false);
        setUploadPhotometricThird(false);
        setUploadAccessoriesThird(false);
        // set brand
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

    const onHandleChangeMainSecond = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadMainSecond(true);
    };
    const onHandleChangeDimensionSecond = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadDimensionSecond(true);
    };
    const onHandleChangePhotometricSecond = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadPhotometricSecond(true);
    };
    const onHandleChangeMainThird = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadMainThird(true);
    };
    const onHandleChangeDimensionThird = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadDimensionThird(true);
    };
    const onHandleChangePhotometricThird = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
        setUploadPhotometricThird(true);
    };

    const user = usePage().props.auth.user;
    // console.log(user);
    const submitProduct = (e) => {
        e.preventDefault();
        // Sweet alert submit confirmation
        swal({
            title: "Are you sure?",
            text: "Once submitted, this tender will be edited!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // post to route tender.add with the data list

                swal("Tender has been edited!", {
                    icon: "success",
                }).then(() => {
                    post(route("tender.editsubmit"));
                });
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
        if (sessionError.photometricphotosecond)
            toast.error(sessionError.photometricphotosecond, {
                position: "bottom-right",
            });
        if (sessionError.dimensionphotosecond)
            toast.error(sessionError.dimensionphotosecond, {
                position: "bottom-right",
            });
        if (sessionError.mainphotosecond)
            toast.error(sessionError.mainphotosecond, {
                position: "bottom-right",
            });
        if (sessionError.photometricphotothird)
            toast.error(sessionError.photometricphotothird, {
                position: "bottom-right",
            });
        if (sessionError.dimensionphotothird)
            toast.error(sessionError.dimensionphotothird, {
                position: "bottom-right",
            });
        if (sessionError.mainphotothird)
            toast.error(sessionError.mainphotothird, {
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
                    Tender / <small> Edit Tender </small>
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
                                                    <input
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
                                                    <input
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
                                                    <input
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
                                                    <input
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
                                                    <input
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
                                                    <input
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
                                                    <input
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
                                                    <input
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
                                                    <select
                                                        required
                                                        id="assignproductid"
                                                        name="assignproductid"
                                                        value={
                                                            data.assignproductid
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        onChange={
                                                            onHandleChangeCustom
                                                        }
                                                    >
                                                        <option
                                                            disabled
                                                            defaultValue
                                                        >
                                                            -- select an option
                                                            --
                                                        </option>
                                                        {/* Loop product category */}
                                                        {products.map(
                                                            (item) => (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.product_brand +
                                                                        " - " +
                                                                        item.product_model}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
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
                                                    <input
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
                                                    <input
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
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Product Category
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="category"
                                                        id="category"
                                                        value={data.category}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Luminiare 2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Color Temperature
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="temperature"
                                                        id="temperature"
                                                        value={data.temperature}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="93"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    IP Class
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="ipclass"
                                                        id="ipclass"
                                                        value={data.ipclass}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="IP 404"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    CRI
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="cri"
                                                        id="cri"
                                                        value={data.cri}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="15KW"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Lumen Output
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lumenoutput"
                                                        id="lumenoutput"
                                                        value={data.lumenoutput}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="150 Watts"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Light Source
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lightsource"
                                                        id="lightsource"
                                                        value={data.lightsource}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Stars"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Beam Angle
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="beamangle"
                                                        id="beamangle"
                                                        value={data.beamangle}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="270 Deg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Color Consistency
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="colorconsistency"
                                                        id="colorconsistency"
                                                        value={
                                                            data.colorconsistency
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Consistent"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Lamp Type
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lamptype"
                                                        id="lamptype"
                                                        value={data.lamptype}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="LED"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Driver
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="driver"
                                                        name="driver"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        value={data.driver}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option
                                                            value={data.driver}
                                                        >
                                                            {data.driver}
                                                        </option>
                                                        <option value="ON/OFF DRIVER">
                                                            ON/OFF DRIVER
                                                        </option>
                                                        <option value="0-10V Driver">
                                                            0-10V Driver
                                                        </option>
                                                        <option value="1-10V Driver">
                                                            1-10V Driver
                                                        </option>
                                                        <option value="1-DALI Driver">
                                                            1-DALI Driver
                                                        </option>
                                                        <option value="Phase Dim Driver">
                                                            Phase Dim Driver
                                                        </option>
                                                        <option value="DMX 512">
                                                            DMX 512
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Notes
                                                </label>

                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="notes"
                                                        id="notes"
                                                        value={data.notes}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Different LED Color, and Luminiare Type"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Main Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.mainphoto.path &&
                                                    !uploadMain ? (
                                                        <>
                                                            {" "}
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .mainphoto
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />{" "}
                                                            <input
                                                                type="hidden"
                                                                name="mainphotopath"
                                                                value={
                                                                    data
                                                                        .mainphoto
                                                                        .path
                                                                }
                                                            />{" "}
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Dimension Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.dimensionphoto.path &&
                                                    !uploadDimension ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .dimensionphoto
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />{" "}
                                                            <input
                                                                type="hidden"
                                                                name="dimensionphotopath"
                                                                value={
                                                                    data
                                                                        .dimensionphoto
                                                                        .path
                                                                }
                                                            />{" "}
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Photometric Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.photometricphoto
                                                        .path &&
                                                    !uploadPhotometric ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .photometricphoto
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="photometricphotopath"
                                                                value={
                                                                    data
                                                                        .photometricphoto
                                                                        .path
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-12">
                                            <hr />
                                        </div>
                                        <h3 className="font-bold text-lg py-4">
                                            Spec. Code 2
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
                                                    <select
                                                        required
                                                        id="assignproductidsecond"
                                                        name="assignproductidsecond"
                                                        value={
                                                            data.assignproductidsecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        onChange={
                                                            onHandleChangeCustomSecond
                                                        }
                                                    >
                                                        <option
                                                            disabled
                                                            defaultValue
                                                        >
                                                            -- select an option
                                                            --
                                                        </option>
                                                        {/* Loop product category */}
                                                        {products.map(
                                                            (item) => (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.product_brand +
                                                                        " - " +
                                                                        item.product_model}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
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
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="brandsecond"
                                                        value={data.brandsecond}
                                                        id="brandsecond"
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
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="luminiaresecond"
                                                        id="luminiaresecond"
                                                        value={
                                                            data.luminiaresecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Luminiare 2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Product Category
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="categorysecond"
                                                        id="categorysecond"
                                                        value={
                                                            data.categorysecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Luminiare 2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Color Temperature
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="temperaturesecond"
                                                        id="temperaturesecond"
                                                        value={
                                                            data.temperaturesecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="93"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    IP Class
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="ipclasssecond"
                                                        id="ipclasssecond"
                                                        value={
                                                            data.ipclasssecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="IP 404"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    CRI
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="crisecond"
                                                        id="crisecond"
                                                        value={data.crisecond}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="15KW"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Lumen Output
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lumenoutputsecond"
                                                        id="lumenoutputsecond"
                                                        value={
                                                            data.lumenoutputsecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="150 Watts"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Light Source
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lightsourcesecond"
                                                        id="lightsourcesecond"
                                                        value={
                                                            data.lightsourcesecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Stars"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Beam Angle
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="beamanglesecond"
                                                        id="beamanglesecond"
                                                        value={
                                                            data.beamanglesecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="270 Deg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Color Consistency
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="colorconsistencysecond"
                                                        id="colorconsistencysecond"
                                                        value={
                                                            data.colorconsistencysecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Consistent"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Lamp Type
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lamptypesecond"
                                                        id="lamptypesecond"
                                                        value={
                                                            data.lamptypesecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="LED"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Driver
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="driversecond"
                                                        name="driversecond"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        value={
                                                            data.driversecond
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option
                                                            value={
                                                                data.driversecond
                                                            }
                                                        >
                                                            {data.driversecond}
                                                        </option>
                                                        <option value="ON/OFF DRIVER">
                                                            ON/OFF DRIVER
                                                        </option>
                                                        <option value="0-10V Driver">
                                                            0-10V Driver
                                                        </option>
                                                        <option value="1-10V Driver">
                                                            1-10V Driver
                                                        </option>
                                                        <option value="1-DALI Driver">
                                                            1-DALI Driver
                                                        </option>
                                                        <option value="Phase Dim Driver">
                                                            Phase Dim Driver
                                                        </option>
                                                        <option value="DMX 512">
                                                            DMX 512
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Notes
                                                </label>

                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="notessecond"
                                                        id="notessecond"
                                                        value={data.notessecond}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Different LED Color, and Luminiare Type"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Main Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.mainphotosecond
                                                        .path &&
                                                    !uploadMainSecond ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .mainphotosecond
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="mainphotopathsecond"
                                                                value={
                                                                    data
                                                                        .mainphotosecond
                                                                        .path
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Dimension Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.dimensionphotosecond
                                                        .path &&
                                                    !uploadDimensionSecond ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .dimensionphotosecond
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="dimensionphotopathsecond"
                                                                value={
                                                                    data
                                                                        .dimensionphotosecond
                                                                        .path
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Photometric Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.photometricphotosecond
                                                        .path &&
                                                    !uploadPhotometricSecond ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .photometricphotosecond
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="photometricphotopathsecond"
                                                                value={
                                                                    data
                                                                        .photometricphotosecond
                                                                        .path
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-12">
                                            <hr />
                                        </div>
                                        <h3 className="font-bold text-lg py-4">
                                            Spec. Code 3
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
                                                    <select
                                                        required
                                                        id="assignproductidthird"
                                                        name="assignproductidthird"
                                                        value={
                                                            data.assignproductidthird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        onChange={
                                                            onHandleChangeCustomThird
                                                        }
                                                    >
                                                        <option
                                                            disabled
                                                            defaultValue
                                                        >
                                                            -- select an option
                                                            --
                                                        </option>
                                                        {/* Loop product category */}
                                                        {products.map(
                                                            (item) => (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.product_brand +
                                                                        " - " +
                                                                        item.product_model}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
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
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="brandthird"
                                                        value={data.brandthird}
                                                        id="brandthird"
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
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="luminiarethird"
                                                        id="luminiarethird"
                                                        value={
                                                            data.luminiarethird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Luminiare 2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Product Category
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="categorythird"
                                                        id="categorythird"
                                                        value={
                                                            data.categorythird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Luminiare 2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Color Temperature
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="temperaturethird"
                                                        id="temperaturethird"
                                                        value={
                                                            data.temperaturethird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="93"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    IP Class
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="ipclassthird"
                                                        id="ipclassthird"
                                                        value={
                                                            data.ipclassthird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="IP 404"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    CRI
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="crithird"
                                                        id="crithird"
                                                        value={data.crithird}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="15KW"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Lumen Output
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lumenoutputthird"
                                                        id="lumenoutputthird"
                                                        value={
                                                            data.lumenoutputthird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="150 Watts"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Light Source
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lightsourcethird"
                                                        id="lightsourcethird"
                                                        value={
                                                            data.lightsourcethird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Stars"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Beam Angle
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="beamanglethird"
                                                        id="beamanglethird"
                                                        value={
                                                            data.beamanglethird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="270 Deg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Color Consistency
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="colorconsistencythird"
                                                        id="colorconsistencythird"
                                                        value={
                                                            data.colorconsistencythird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Consistent"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Lamp Type
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="lamptypethird"
                                                        id="lamptypethird"
                                                        value={
                                                            data.lamptypethird
                                                        }
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="LED"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Driver
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="driverthird"
                                                        name="driverthird"
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        value={data.driverthird}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option
                                                            value={
                                                                data.driverthird
                                                            }
                                                        >
                                                            {data.driverthird}
                                                        </option>
                                                        <option value="ON/OFF DRIVER">
                                                            ON/OFF DRIVER
                                                        </option>
                                                        <option value="0-10V Driver">
                                                            0-10V Driver
                                                        </option>
                                                        <option value="1-10V Driver">
                                                            1-10V Driver
                                                        </option>
                                                        <option value="1-DALI Driver">
                                                            1-DALI Driver
                                                        </option>
                                                        <option value="Phase Dim Driver">
                                                            Phase Dim Driver
                                                        </option>
                                                        <option value="DMX 512">
                                                            DMX 512
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Notes
                                                </label>

                                                <div className="mt-1">
                                                    <input
                                                        required
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        type="text"
                                                        name="notesthird"
                                                        id="notesthird"
                                                        value={data.notesthird}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Different LED Color, and Luminiare Type"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Main Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.mainphotothird.path &&
                                                    !uploadMainThird ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .mainphotothird
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="mainphotopaththird"
                                                                value={
                                                                    data
                                                                        .mainphotothird
                                                                        .path
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Dimension Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.dimensionphotothird
                                                        .path &&
                                                    !uploadDimensionThird ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .dimensionphotothird
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />{" "}
                                                            <input
                                                                type="hidden"
                                                                name="dimensionphotopaththird"
                                                                value={
                                                                    data
                                                                        .dimensionphotothird
                                                                        .path
                                                                }
                                                            />{" "}
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="mb-3 mr-2">
                                                <label
                                                    htmlFor="model"
                                                    className="block  font-medium text-gray-700 text-xl font-bold"
                                                >
                                                    Photometric Photo
                                                </label>
                                                <div className="mt-1">
                                                    {data.photometricphotothird
                                                        .path &&
                                                    !uploadPhotometricThird ? (
                                                        <>
                                                            <img
                                                                src={`../${
                                                                    data
                                                                        .photometricphotothird
                                                                        .path
                                                                }`}
                                                                alt=""
                                                                width="250px"
                                                                height="250px"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="photometricphotopaththird"
                                                                value={
                                                                    data
                                                                        .photometricphotothird
                                                                        .path
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <h1 className="font-bold text-lg text-gray-500 py-3">
                                                            {" "}
                                                            Custom Upload{" "}
                                                        </h1>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>




                                    <button
                                        type="submit"
                                        className="bg-yellow-500 mt-7 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
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
