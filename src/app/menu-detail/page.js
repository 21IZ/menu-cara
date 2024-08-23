import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuContext } from '../context/MenuContext';

function MenuDetail() {
  const { selectedItem } = useMenuContext();
  const navigate = useNavigate();

  if (!selectedItem) return <div>No se ha seleccionado ningún ítem</div>;

  const { imagen, titulo, precio, descripcion } = selectedItem;

  return (
    <div className="menu-detail">
      <img src={imagen} alt={titulo} className="menu-detail-image" />
      <h1 className="menu-detail-title">{titulo}</h1>
      <p className="menu-detail-price" style={{ color: 'red' }}>${precio}</p>
      <p className="menu-detail-description">{descripcion}</p>
      <button onClick={() => navigate('/menu')}>Volver al Menú</button>
    </div>
  );
}

export default MenuDetail;
