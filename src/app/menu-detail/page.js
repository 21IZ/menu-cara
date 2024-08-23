import React from 'react';
import { useMenuContext } from '../context/MenuContext'; // Asegúrate de que esta ruta sea correcta
import Link from 'next/link';

function MenuDetail() {
  const { selectedItem } = useMenuContext();

  if (!selectedItem) return <div>No se ha seleccionado ningún ítem</div>;

  const { imagen, titulo, precio, descripcion } = selectedItem;

  return (
    <div className="menu-detail">
      <img src={imagen} alt={titulo} className="menu-detail-image" />
      <h1 className="menu-detail-title">{titulo}</h1>
      <p className="menu-detail-price" style={{ color: 'red' }}>${precio}</p>
      <p className="menu-detail-description">{descripcion}</p>
      <Link href="/menu">
        <a>Volver al Menú</a>
      </Link>
    </div>
  );
}

export default MenuDetail;
