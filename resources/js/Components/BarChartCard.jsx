import React, { useState } from "react";
import {
    BarChart,
    Bar,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";
const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
        fill: "#7F63F4",
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
        fill: "#7F63F4",
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
        fill: "#7F63F4",
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        fill: "#7F63F4",
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        fill: "#7F63F4",
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        fill: "#7F63F4",
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
        fill: "#7F63F4",
    },
];

function BarChartCard(props) {
    let productCountByCategory = "";
    useState(() => {
        productCountByCategory = props.data.map((item) => {
            return {
                count: item["count"],
                name:
                    item["category_name"] == null
                        ? "other"
                        : item["category_name"],
            };
        });
    }, [, productCountByCategory]);
    return (
        <div className="p-2 sm:p-5  bg-white shadow border">
            <h1 className="font-bold text-lg text-slate-600 pb-4">
                Product By Category
            </h1>
            <ResponsiveContainer width="95%" height={300}>
                <BarChart
                    width={500}
                    height={500}
                    data={productCountByCategory}
                >
                    <XAxis dataKey="name" />
                    <CartesianGrid />
                    <YAxis />
                    <Bar dataKey="count" fill="#8884d8" />
                    <Tooltip />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartCard;
