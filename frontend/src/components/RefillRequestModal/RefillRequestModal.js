import React, { useState } from 'react';
import './RefillRequestModal.css'; 
const RefillRequestModal = ({ onClose, onSubmit }) => {
    const [brandName, setBrandName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [containerType, setContainerType] = useState('');
    const [comments, setComments] = useState('');

    const brandOptions = ["H2O2U", "WaterFull", "Aqua", "WaterFall", "Crystal", "PureDrop"];

    const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
        <option key={num} value={num}>{num}</option>
    ));

    const handleSubmit = () => {
        if (!brandName || !quantity || !containerType) {
            alert('Brand name, quantity, and container type are required.');
            return;
        }
        onSubmit({ brandName, quantity, containerType, comments });
        onClose();
    };
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Request a Refill</h3>

                <label>
                    Brand Name:
                    <select
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="checkout-select"
                    >
                        <option value="">Select a Brand</option>
                        {brandOptions.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Quantity:
                    <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="checkout-select"
                    >
                        <option value="">Select Quantity</option>
                        {quantityOptions}
                    </select>
                </label>

                <label>
                    Container Type:
                    <select
                        value={containerType}
                        onChange={(e) => setContainerType(e.target.value)}
                        className="checkout-select"
                    >
                        <option value="">Select Container Type</option>
                        <option value="gallon">Gallon</option>
                        <option value="bottle">Bottle</option>
                    </select>
                </label>

                <label>
                    Additional Comments:
                    <textarea
                        placeholder="Add any details (optional)"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="checkout-textarea"
                    ></textarea>
                </label>

                <div className="modal-actions">
                    <button onClick={handleSubmit}>Submit Request</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RefillRequestModal;