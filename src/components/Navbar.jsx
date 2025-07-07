import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="w-full bg-[#0a0f0d] text-[#36fba1] px-6 py-4 flex justify-between items-center border-b border-[#36fba144]">
                <h1 className="text-2xl font-semibold tracking-wide">HostelHive</h1>
                <p className="text-lg opacity-80">Welcome, Student</p>
            </nav>
        </div>
    )
}

export default Navbar
