import axios from "axios"
import React, { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"

function Authors() {

    const [showForm, setShowForm] = useState(false)

    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [nationality, setnationality] = useState("")
    const [bio, setbio] = useState("")
    const [data, setdata] = useState([])

    const fetch_authors = async () => {
        try {
            const res = await axios.get("http://localhost:3000/authors", {
                withCredentials: true
            })

            setdata(res.data.authors || [])

        } catch (error) {
            toast.error("Failed to load authors")
        }
    }

    useEffect(() => {
        fetch_authors()
    }, [])

    const handle_author = async () => {
        try {

            if (!first_name || !last_name || !nationality || !bio) {
                return toast.error("All fields are required")
            }

            const res = await axios.post(
                "http://localhost:3000/author",
                { first_name, last_name, nationality, bio },
                { withCredentials: true }
            )

            toast.success(res.data.message || "Author created")

            setfirst_name("")
            setlast_name("")
            setnationality("")
            setbio("")
            setShowForm(false)

            fetch_authors()

        } catch (error) {
            toast.error(error.response?.data?.error || "Error")
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col p-4 gap-6">

            <Toaster richColors position="top-right" />

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <h1 className="text-xl sm:text-2xl font-bold">
                    Authors Dashboard
                </h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                    + New Author
                </button>

            </div>

            {/* MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">

                    <div className="bg-white text-black w-full max-w-md p-5 rounded-xl space-y-3">

                        <h2 className="text-lg font-bold text-indigo-600">
                            Create Author
                        </h2>

                        <input
                            className="w-full border p-2 rounded"
                            placeholder="First Name"
                            value={first_name}
                            onChange={(e) => setfirst_name(e.target.value)}
                        />

                        <input
                            className="w-full border p-2 rounded"
                            placeholder="Last Name"
                            value={last_name}
                            onChange={(e) => setlast_name(e.target.value)}
                        />

                        <input
                            className="w-full border p-2 rounded"
                            placeholder="Nationality"
                            value={nationality}
                            onChange={(e) => setnationality(e.target.value)}
                        />

                        <textarea
                            className="w-full border p-2 rounded"
                            placeholder="Bio"
                            value={bio}
                            onChange={(e) => setbio(e.target.value)}
                        />

                        <div className="flex flex-col sm:flex-row gap-2">

                            <button
                                onClick={handle_author}
                                className="bg-indigo-600 text-white w-full py-2 rounded"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-gray-400 text-white w-full py-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* TABLE WRAPPER (FIX RESPONSIVE ISSUE) */}
            <div className="w-full overflow-x-auto border border-gray-800 rounded-xl">

                <table className="w-full min-w-[600px]">

                    <thead className="bg-gray-900 text-gray-300">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">First Name</th>
                            <th className="p-3 text-left">Last Name</th>
                            <th className="p-3 text-left">Nationality</th>
                        </tr>
                    </thead>

                    <tbody>

                        {data.length > 0 ? data.map((author, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-800 hover:bg-gray-900 transition"
                            >

                                <td className="p-3 text-indigo-400">
                                    {author.author_id}
                                </td>

                                <td className="p-3">
                                    {author.first_name}
                                </td>

                                <td className="p-3">
                                    {author.last_name}
                                </td>

                                <td className="p-3 text-purple-400">
                                    {author.nationality}
                                </td>

                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center p-6 text-gray-500">
                                    No authors found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Authors