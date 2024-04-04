"use client"
import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

function ProfilePage({ }: Props) {
    const [data, setdata] = useState("nothing")
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')
        } catch (error: any) {
            console.log("error:", error)
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('./api/users/me')
        setdata(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>profile page</p>
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>

            <button onClick={getUserDetails} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                get user Details
            </button>
        </div>
    )
}

export default ProfilePage