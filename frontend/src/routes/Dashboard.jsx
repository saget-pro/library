import React, { useEffect, useState } from "react"
import axios from "axios"
import { Toaster, toast } from "sonner"
import { BookOpen, Users, TrendingUp, Calendar, Award, Library } from "lucide-react"

function Dashboard() {

    const [authors, setAuthors] = useState([])
    const [books, setBooks] = useState([])

    const fetchAuthors = async () => {
        try {
            const res = await axios.get("http://localhost:3000/authors", {
                withCredentials: true
            })
            setAuthors(res.data.authors || [])
        } catch {
            toast.error("Failed to load authors")
        }
    }

    const fetchBooks = async () => {
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
        fetchAuthors()
        fetchBooks()
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen p-4">
            <Toaster richColors position="top-right" />
            
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                                <Library className="w-8 h-8 text-blue-600" />
                                Library Dashboard
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Welcome back! Here's what's happening in your library today.
                                
                            </p>
                        </div>
                        <div className="bg-blue-50 px-4 py-2 rounded-lg">
                            <span className="text-sm text-blue-600">Today :{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="flex flex-wrap gap-4 mb-6">
                    
                    {/* Total Books Card */}
                    <div className="flex-1 min-w-[200px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-5">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 text-sm">Total Books</p>
                                <p className="text-4xl font-bold text-white mt-2">{books.length}</p>
                                <p className="text-blue-100 text-xs mt-2">+{books.length} this month</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Total Authors Card */}
                    <div className="flex-1 min-w-[200px] bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-5">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-purple-100 text-sm">Total Authors</p>
                                <p className="text-4xl font-bold text-white mt-2">{authors.length}</p>
                                <p className="text-purple-100 text-xs mt-2">Talented writers</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Active Books Card */}
                    <div className="flex-1 min-w-[200px] bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-5">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-green-100 text-sm">Active Books</p>
                                <p className="text-4xl font-bold text-white mt-2">{books.length}</p>
                                <p className="text-green-100 text-xs mt-2">Available for reading</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Ratio Card */}
                   
                </div>

            

                {/* Content Grid */}
                <div className="flex flex-wrap gap-6">
                    
                    {/* Recent Books Section */}
                    <div className="flex-1 min-w-[300px] bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-gray-800">Recent Books</h2>
                                <span className="ml-auto text-xs text-gray-500">Latest </span>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr className="text-left text-xs font-medium text-gray-500">
                                        <th className="px-5 py-3">Title</th>
                                        <th className="px-5 py-3">Genre</th>
                                        <th className="px-5 py-3">Author</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {books.slice(0, 5).map((book, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3">
                                                <span className="font-medium text-gray-800">{book.title}</span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                    {book.genre}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-purple-600">
                                                {book.first_name}
                                            </td>
                                        </tr>
                                    ))}
                                    {books.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-5 py-8 text-center text-gray-400">
                                                No books found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Authors Section */}
                    <div className="flex-1 min-w-[300px] bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-600" />
                                <h2 className="text-lg font-semibold text-gray-800">Recent Authors</h2>
                                <span className="ml-auto text-xs text-gray-500">Latest 5</span>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr className="text-left text-xs font-medium text-gray-500">
                                        <th className="px-5 py-3">Author Name</th>
                                        <th className="px-5 py-3">Nationality</th>
                                        <th className="px-5 py-3">Books</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {authors.slice(0, 5).map((author, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        {author.first_name?.charAt(0)}{author.last_name?.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-800">
                                                        {author.first_name} {author.last_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                                                    {author.nationality}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-blue-600">
                                                {books.filter(b => b.author_id === author.author_id).length} books
                                            </td>
                                        </tr>
                                    ))}
                                    {authors.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-5 py-8 text-center text-gray-400">
                                                No authors found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center text-gray-400 text-sm">
                    <p>© 2024 Library Management System | All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard