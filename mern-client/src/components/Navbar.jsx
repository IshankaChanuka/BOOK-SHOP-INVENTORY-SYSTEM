import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// REACT ICON
import {FaBarsStaggered, FaBlog, FaXmark} from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);

    // TOGGLE MENU
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    // NAV ITEMS
    const navItems = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Shop", path: "/shop" },
        { label: "Sell Your Book", path: "/admin/dashboard" },
        { label: "Blog", path: "/blog" },
    ]

    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in decoration-3000'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* LOGO */}
                    <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center'>
                        <FaBlog className='inline-block' />Books
                    </Link>

                    {/* NAV ITEMS FOR LARGE DEVICES */}

                    <ul className='md:flex space-x-12 hidden'>

                        {navItems.map(({ label, path }) => (
                            <li key={path}>
                                <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/*BTN FOR LG DEVICES*/}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        <button><FaBarsStaggered className='w-5 hover:text-blue-700' /></button>
                    </div>

                    {/*MENU FOR THE MOBILE DEVICES*/}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered className='h-5'/>
                            }
                        </button>
                    </div>

                    {/* NAV ITEM FOR SM DEVICES */}
                        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>

                        {navItems.map(({ label, path }) => (
                            <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>
                                {label}
                            </Link>
                        ))}
                    </div>


                </div>
            </nav>
        </header>
    );
}

export default Navbar;
