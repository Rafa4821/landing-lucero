import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const CartWidget = ({ cartItems, cartItemsCount, showCart, handleCloseCart, handleShowCart }) => {
  return (
    <>
      <Button variant="dark" onClick={handleShowCart}>
        <FaShoppingCart size={24} />
        <span className="ml-2">{cartItemsCount}</span>
      </Button>

      <Modal show={showCart} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <Modal.Title>Carro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <p>El carrito esta vacio</p>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.name} - {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartWidget;
