import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <ul className="social-links">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                    </ul>
                </div>
                <div className="footer-section contact-us">
                    <h4>Contact Us</h4>
                    <p>Phone: <a href="tel:+961000000">+961 000 000</a></p>
                    <div className="email-container">
                        <p>Email: <a href="mailto:info@clickndrink.com">info@clickndrink.com</a></p>
                    </div>
                </div>
                <div className="footer-section">
                    <div className="footer-section-about-us">
                        <h4><Link to="/about-us">About Us</Link></h4>
                        <h4><Link to="/terms-and-conditions">Terms and Conditions</Link></h4>
                        <h4><Link to="/frequently-asked-questions">FAQ</Link></h4>
                    </div>
                </div>
            </div>
        </footer>
    );
}
