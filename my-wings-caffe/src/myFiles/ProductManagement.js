import React, { useState, useEffect } from 'react';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProductIndex, setEditingProductIndex] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    });

    // useEffect(() => {
    //     const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    //     setProducts(storedProducts);
    // }, []);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (editingProductIndex !== null) {
    //         const updatedProducts = products.map((product, index) =>
    //             index === editingProductIndex ? productForm : product
    //         );
    //         setProducts(updatedProducts);
    //         setEditingProductIndex(null);
    //     } else {
    //         setProducts([...products, productForm]);
    //     }
    //     setProductForm({ name: '', description: '', price: '', quantity: '' });
    //     localStorage.setItem('products', JSON.stringify(products));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editingProductIndex !== null ? 'PUT' : 'POST';
        const url = editingProductIndex !== null
            ? `http://localhost:5000/products/${products[editingProductIndex].id}`
            : 'http://localhost:5000/products';
    
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productForm),
        })
            .then(() => {
                setProductForm({ name: '', description: '', price: '', quantity: '' });
                setEditingProductIndex(null);
                return fetch('http://localhost:5000/products');
            })
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    };
    

    const handleEdit = (index) => {
        setProductForm(products[index]);
        setEditingProductIndex(index);
    };

    // const handleDelete = (index) => {
    //     const updatedProducts = products.filter((_, i) => i !== index);
    //     setProducts(updatedProducts);
    //     localStorage.setItem('products', JSON.stringify(updatedProducts));
    // };

    const handleDelete = (index) => {
        const productId = products[index].id;
        fetch(`http://localhost:5000/products/${productId}`, { method: 'DELETE' })
            .then(() => fetch('http://localhost:5000/products'))
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    };
    

    const handleSell = (index) => {
        const updatedProducts = products.map((product, i) =>
            i === index ? { ...product, quantity: product.quantity - 1 } : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    return (
        <section>
            <h2>Wings Cafe Product Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={productForm.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={productForm.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={productForm.price} onChange={handleChange} required />
                <input type="number" name="quantity" placeholder="Quantity" value={productForm.quantity} onChange={handleChange} required />
                <button type="submit">{editingProductIndex !== null ? 'Update Product' : 'Add Product'}</button>
            </form>
            <table className="product-management-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td className={product.quantity <= 5 ? 'low-stock' : ''}>
                                {product.quantity}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(index)} className="edit">Edit</button>
                                <button onClick={() => handleDelete(index)} className="delete">Delete</button>
                                <button onClick={() => handleSell(index)} className="sell">Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ProductManagement;