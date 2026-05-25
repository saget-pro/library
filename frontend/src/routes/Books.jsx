import axios from "axios"
import React, { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"

function Books() {

    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])

    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState(null)
    const [deleteId, setDeleteId] = useState(null)

    const [title, settitle] = useState("")
    const [isbn, setisbn] = useState("")
    const [genre, setgenre] = useState("")
    const [copies_available, setcopies_available] = useState("")
    const [published_year, setpublished_year] = useState("")
    const [author_id, setauthor_id] = useState("")

    // FETCH AUTHORS
    const fetch_authors = async () => {
        try {
            const res = await axios.get("http://localhost:3000/authors", {
                withCredentials: true
            })
            setAuthors(res.data.authors || [])
        } catch {
            toast.error("Failed to load authors")
        }
    }

    // FETCH BOOKS
    const fetch_books = async () => {
        try {
            const res = await axios.get("http://localhost:3000/get_book", {
                withCredentials: true
            })

            setBooks(Array.isArray(res.data) ? res.data : res.data.books || [])

        } catch {
            toast.error("Failed to load books")
        }
    }

    useEffect(() => {
        fetch_authors()
        fetch_books()
    }, [])

    const resetForm = () => {
        settitle("")
        setisbn("")
        setgenre("")
        setcopies_available("")
        setpublished_year("")
        setauthor_id("")
        setEditId(null)
    }

    // CREATE / UPDATE
    const handleSubmit = async () => {
        try {

            if (!title || !isbn || !genre || !copies_available || !published_year || !author_id) {
                return toast.error("All fields are required")
            }

            if (editId) {
                await axios.put(`http://localhost:3000/update_book/${editId}`, {
                    title, isbn, genre, copies_available, published_year, author_id
                }, { withCredentials: true })

                toast.success("Book updated")
            } else {
                await axios.post("http://localhost:3000/book", {
                    title, isbn, genre, copies_available, published_year, author_id
                }, { withCredentials: true })

                toast.success("Book added")
            }

            setShowForm(false)
            resetForm()
            fetch_books()

        } catch {
            toast.error("Something went wrong")
        }
    }

    // DELETE
    const confirmDelete = (id) => {
        setDeleteId(id)
    }

    const deleteBook = async () => {
        try {
            await axios.delete(`http://localhost:3000/delete_book/${deleteId}`, {
                withCredentials: true
            })

            toast.success("Book deleted")
            setDeleteId(null)
            fetch_books()

        } catch {
            toast.error("Delete failed")
        }
    }

    const editBook = (book) => {
        setShowForm(true)
        setEditId(book.book_id)

        settitle(book.title)
        setisbn(book.isbn)
        setgenre(book.genre)
        setcopies_available(book.copies_available)
        setpublished_year(book.published_year)
        setauthor_id(book.author_id)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#4c1d95] p-4 text-white">

            <Toaster richColors position="top-right" />

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold"> Books System</h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
                >
                    + Add Book
                </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5">

                <table className="w-full min-w-[800px]">

                    <thead className="bg-white/10 text-white">
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Author</th>
                            <th className="p-4 text-left">Genre</th>
                            <th className="p-4 text-left">Copies</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {books.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-6 text-gray-300">
                                    No books found
                                </td>
                            </tr>
                        ) : (
                            books.map((book, index) => (
                                <tr key={index} className="border-t border-white/10 hover:bg-white/10">

                                    <td className="p-4 text-pink-300">{book.book_id}</td>
                                    <td className="p-4">{book.title}</td>
                                    <td className="p-4">{book.first_name}</td>
                                    <td className="p-4">{book.genre}</td>
                                    <td className="p-4">{book.copies_available}</td>

                                    <td className="p-4 flex gap-2">

                                        <button
                                            onClick={() => editBook(book)}
                                            className="bg-yellow-400 text-black px-3 py-1 rounded-lg hover:scale-105"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => confirmDelete(book.book_id)}
                                            className="bg-red-500 px-3 py-1 rounded-lg hover:scale-105"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

            {/* FORM MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">

                    <div className="bg-white text-black w-full max-w-md p-5 rounded-2xl space-y-3">

                        <h2 className="text-lg font-bold text-purple-600">
                            {editId ? "Edit Book" : "Add Book"}
                        </h2>

                        <input className="border p-2 w-full rounded" placeholder="Title"
                            value={title} onChange={(e) => settitle(e.target.value)} />

                        <input className="border p-2 w-full rounded" placeholder="ISBN"
                            value={isbn} onChange={(e) => setisbn(e.target.value)} />

                        <input className="border p-2 w-full rounded" placeholder="Genre"
                            value={genre} onChange={(e) => setgenre(e.target.value)} />

                        <input className="border p-2 w-full rounded" placeholder="Copies"
                            value={copies_available} onChange={(e) => setcopies_available(e.target.value)} />

                        <input className="border p-2 w-full rounded" placeholder="Year"
                            value={published_year} onChange={(e) => setpublished_year(e.target.value)} />

                        <select className="border p-2 w-full rounded"
                            value={author_id}
                            onChange={(e) => setauthor_id(e.target.value)}>

                            <option value="">Select Author</option>
                            {authors.map(a => (
                                <option key={a.author_id} value={a.author_id}>
                                    {a.first_name} {a.last_name}
                                </option>
                            ))}

                        </select>

                        <div className="flex gap-2">

                            <button
                                onClick={handleSubmit}
                                className="bg-purple-600 text-white w-full py-2 rounded"
                            >
                                {editId ? "Update" : "Save"}
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

            {/* DELETE CONFIRM MODAL */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

                    <div className="bg-white text-black p-6 rounded-xl w-[90%] max-w-sm text-center">

                        <h2 className="text-xl font-bold text-red-500">
                            Delete Book?
                        </h2>

                        <p className="my-3 text-gray-600">
                            This action cannot be undone.
                        </p>

                        <div className="flex gap-2">

                            <button
                                onClick={deleteBook}
                                className="bg-red-500 text-white w-full py-2 rounded"
                            >
                                Yes Delete
                            </button>

                            <button
                                onClick={() => setDeleteId(null)}
                                className="bg-gray-400 text-white w-full py-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default Books