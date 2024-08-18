import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../data/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/Checkout.css';

const Checkout = ({ cartItems, clearCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [shipping, setShipping] = useState('domicilio');
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!name || !email || !address) {
      toast.error('Por favor complete todos los campos.');
      return;
    }

    const order = {
      name,
      email,
      address,
      shipping,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      clearCart();
      toast.success('Pedido realizado con éxito.');
      navigate(`/order-confirmation/${docRef.id}`);
    } catch (error) {
      toast.error('Hubo un error al realizar el pedido.');
      console.error('Error al agregar el documento:', error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Finalizar Compra</h2>
        <div className="form-group">
          <label>Nombre completo</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Dirección de despacho</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>
      
      <div className="order-summary">
        <h3>Resumen de tu pedido</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              {item.name} - {item.quantity} x ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>

        <div className="form-group">
          <label>Envío</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="domicilio"
                checked={shipping === 'domicilio'}
                onChange={(e) => setShipping(e.target.value)}
              />
              Despacho a domicilio
            </label>
            <label>
              <input
                type="radio"
                value="tienda"
                checked={shipping === 'tienda'}
                onChange={(e) => setShipping(e.target.value)}
              />
              Retiro en tienda
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Método de pago</label>
          <div className="radio-group">
            <label>
              <input type="radio" value="transferencia" checked disabled />
              Transferencia Bancaria
            </label>
          </div>
        </div>
        <button onClick={handleOrder} className="btn btn-primary">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Checkout;
