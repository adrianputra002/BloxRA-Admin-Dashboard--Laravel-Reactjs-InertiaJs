import BarChartCard from '@/Components/BarChartCard';
import InformationCard from '@/Components/InformationCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
export default function Dashboard(props) {
    const  productCountByCategory = props.productCountByCategory;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden  sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="grid grid-cols-1 gap-0 sm:gap-6 sm:grid-cols-3 ">
                                <InformationCard information="Product Category     " numberCount="35" />
                                <InformationCard information="Brand" numberCount="35" />
                                <InformationCard information="Product" numberCount="40" />
                            </div>
                            <BarChartCard data={productCountByCategory}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
