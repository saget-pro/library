import axios from "axios"
import React, { useState } from "react"
import { Toaster, toast } from "sonner"

function Report() {

    const [first_date, setFirstDate] = useState("")
    const [last_date, setLastDate] = useState("")
    const [data, setData] = useState([])

    const fetchReport = async () => {
        try {

            if (!first_date || !last_date) {
                return toast.error("Select both dates")
            }

            const res = await axios.get("http://localhost:3000/report", {
                params: { first_date, last_date },
                withCredentials: true
            })

            setData(res.data.data || [])
            toast.success("Report loaded")

        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to load report")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white p-6">

            <Toaster richColors position="top-right" />

            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-6"> Books Report</h1>

            {/* FILTER */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 print:hidden">

                <input
                    type="date"
                    value={first_date}
                    onChange={(e) => setFirstDate(e.target.value)}
                    className="p-2 rounded text-white"
                />

                <input
                    type="date"
                    value={last_date}
                    onChange={(e) => setLastDate(e.target.value)}
                    className="p-2 rounded text-white"
                />

                <button
                    onClick={fetchReport}
                    className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Generate
                </button>
                 <button
                    onClick={()=>window.print()}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Print Report
                </button>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10">

                <table className="w-full min-w-[800px]">

                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Genre</th>
                            <th className="p-3">Copies</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>

                    <tbody>

                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-6 text-gray-300">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index} className="border-t border-white/10 hover:bg-white/10">

                                    <td className="p-3 text-pink-300">
                                        {item.title}
                                    </td>

                                    <td className="p-3 text-purple-300">
                                        {item.first_name} {item.last_name}
                                    </td>

                                    <td className="p-3">
                                        {item.genre}
                                    </td>

                                    <td className="p-3">
                                        {item.copies_available}
                                    </td>

                                    <td className="p-3 text-indigo-300">
                                        {item.date}
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Report