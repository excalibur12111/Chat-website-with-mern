import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddProperty = ({ onAddProperty }) => {
    const [newProperty, setNewProperty] = useState({
        title: '',
        description: '',
        image: '',
        contact: ''
    });

    const handleAddProperty = () => {
        axios.post('http://localhost:5000/api/properties', newProperty)
            .then( res => {
                // Notify the parent component about the new property
                onAddProperty(res.data);

                // Clear the newProperty state for the next entry
                setNewProperty({
                    title: '',
                    description: '',
                    image: '',
                    contact: '',
                });
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2 style={{ "color": "#007BFF" }}>
                Add a New Property
            </h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddProperty();}}>
                <div className="form-row">
                    <label>Title:
                        <input type='text'
                            value = {newProperty.title}
                            onChange = {(e) => setNewProperty({
                                ...newProperty,
                                title: e.target.value
                            })}
                        required />
                    </label>

                    <label>Description:
                        <input type="text"
                            value={newProperty.description}
                            onChange={ (e) => setNewProperty({
                                ...newProperty,
                                description: e.target.value
                            })} 
                        required />
                    </label>
                </div>

                <div className="form-row">
                    <label>Image URL:
                        <input type="text"
                            value={newProperty.image}
                            onChange={
                                (e) =>
                                    setNewProperty(
                                        {
                                            ...newProperty,
                                            image: e.target.value
                                        })} required />
                    </label>
                    <label>Contact: <input type="text"
                        value={newProperty.contact}
                        onChange={
                            (e) => setNewProperty(
                                {
                                    ...newProperty,
                                    contact: e.target.value
                                })} required />
                    </label>
                </div>

                <button type="submit"
                    style={{ backgroundColor: "blue" }}>
                    Add Property
                </button>
            </form>
        </div>
    );
};

export default AddProperty;