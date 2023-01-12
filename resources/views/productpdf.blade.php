<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    {{-- include css --}}
    <link rel="stylesheet" href="https://cdn.tailwindcss.com">
 {{-- include app css --}}

</head>

<body>

    </style>
    <script src="https://cdn.tailwindcss.com"></script>
    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h3 className="font-bold text-lg pb-3">
                         Product Detail
                    </h3>
                    <div className="flex justify-between">
                        <div>

                        </div>

                    </div>
                    <div className="form-container">
                        <form>
                            <div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5">
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Category Product
                                        </label>
                                        <div className="mt-1">
                                            <select required id="category" name="category" value={{$product->product_category}}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                                <option selected>
                                                    {{$product->product_category}}
                                                </option>

                                            </select>
                                        </div>
                                    </div>
                                    <input type="hidden"  name="token" value={{$product->product_brand}} />
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Brand
                                        </label>
                                        <div className="mt-1">
                                            <select required id="brand" value={{$product->product_brand}} name="brand"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300  rounded-md">
                                                <option value={{ $product->product_brand }} selected>
                                                    {{ $product->product_brand }}
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
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Luminiare Type
                                        </label>
                                        <div className="mt-1">
                                            <select required value={{ $product->product_luminiare_type }} id="luminiare"
                                                name="luminiare"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                                <option value={{ $product->product_luminiare_type }} selected>
                                                    {{ $product->product_luminiare_type }}
                                                </option>
                                                <option value="Luminiare No. 1" value="Luminiare No. 1">
                                                    Luminiare No. 1
                                                </option>
                                                <option value="Luminiare No. 2" value="Luminiare No. 2">
                                                    Luminiare No. 2
                                                </option>
                                                <option value="Luminiare No. 3" value="Luminiare No. 3">
                                                    Luminiare No. 3
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                                            Product Model
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_model }} required type="text"
                                                name="model" id="model"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Product-GPT" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            Color Temperature
                                        </label>
                                        <div className="mt-1">
                                            <input type="text" value="{{ $product->product_color_temperature }}"
                                                required name="temperature" id="temperature"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="93 C" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            IP Class
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_ip_class }}type="text" required
                                                name="ipclass" id="ipclass"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="WhatIsIPClass" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            CRI
                                        </label>
                                        <div className="mt-1">
                                            <input type="text" value={{ $product->product_cri }} required
                                                name="cri" id="cri"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="CRI" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            Lumen Output
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_lumen_output }} type="text" required
                                                name="lumenoutput" id="lumenoutput"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="300 Watts" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            Light Source
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_light_source }} type="text" required
                                                name="lightsource" id="lightsource"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Stars" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            Beam Angle
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_beam_angle }} type="text" required
                                                name="beamangle" id="beamangle"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="270 Deg" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            Color Consistency
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_color_consistency }} type="text"
                                                required name="colorconsistency" id="colorconsistency"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Consistent" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            Lamp Type
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_lamp_type }} type="text" required
                                                name="lamptype" id="lamptype"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="LED" />
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            <a href="#"
                                                className="bg-blue-500 text-center justify-center flex items-center w-min  hover:bg-blue-700 text-white font-bold py-2 px-2 mr-2 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    className="w-6 h-6 inline">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </a>
                                            Driver
                                        </label>
                                        <div className="mt-1">
                                            <input value={{ $product->product_driver }} type="text" required
                                                name="driver" id="driver"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Intel" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2  w-full">
                                    <div className="mb-7 mr-2 ">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            {{-- Main Photo --}}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>


                                        <div className="mt-1">

                                            {{-- <img width="300px" height="300px" src={{ '../storage/'.$mainphoto    }} /> --}}

                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2  ">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            {{-- Dimension Photo --}}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <div className="mt-1">
                                            {{-- <img width="300px" height="300px"
                                                src={{ '../storage/'.$dimensionphoto    }} /> --}}
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2 ">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            {{-- Photometric Photo --}}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <div className="mt-1">
                                            {{-- <img width="300px" height="300px"
                                                src={{ '../storage/'.$photometricphoto    }} /> --}}
                                        </div>
                                    </div>
                                    <div className="mb-7 mr-2  ">
                                        <label htmlFor="name"
                                            className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                            {{-- Accessories Photo --}}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            {{-- <img width="300px" height="300px"
                                            src={{ asset('../storage/'.$accessoriesphoto)    }}  /> --}}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid w-full grid-cols-1">
                                    <label htmlFor="productcontent"
                                        className="block text-sm font-medium flex items-center mb-2 text-gray-700">
                                        Product Content
                                    </label>
                                    <textarea  required name="productcontent" id="productcontent"
                                    type="text"    cols="30"
                                    rows="4"
                                        className="w-full  border-2 border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500" >
                                    {{$product->product_content}}
                                    </textarea>
                                </div>
                                <div className="flex mt-4"></div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
