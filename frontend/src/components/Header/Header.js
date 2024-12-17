import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './header.module.css';
import { useAuth } from '../../hooks/useAuth';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';

export default function Header() {
    const { user, logout } = useAuth();
    const { clearCart } = useCart(); 
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleOutsideClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleLogout = () => {
        clearCart();
        logout(); 
    };

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>Click&Drink</Link>
                <nav>
                    <ul>
                        {user ? (
                            <li
                                className={classes.menu_container}
                                onClick={() => setMenuOpen((prev) => !prev)}
                                ref={menuRef}
                            >
                                <Link to="/profile">{user.name}</Link>
                                {menuOpen && (
                                    <div className={classes.menu}>
                                        <Link to="/profile">Profile</Link>
                                        <Link to="/orders">Orders</Link>
                                        <button onClick={handleLogout} className={classes.logout_button}>Logout</button>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                        <li>
                            <Link to="/cart">
                                <FaShoppingCart size={24} color="#fff" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
