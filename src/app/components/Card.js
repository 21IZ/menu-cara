'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMenuContext } from '../context/MenuContext';

const Card = ({ imagen, nombre, precio, descripcion, id }) => {
  const { setSelectedItem } = useMenuContext();

  const handleClick = () => {
    setSelectedItem({ imagen, nombre, precio, descripcion, id });
  };

  // Check if the item is valid before rendering
  if (!nombre || !precio) {
    return null; // Don't render invalid items
  }

  return (
    <Link href={`/menu-detail/${encodeURIComponent(id)}`} onClick={handleClick}>
      <div className="card">
        {imagen && (
          <Image 
            src={imagen} 
            alt={nombre} 
            width={200}
            height={130}
            className="card-image" 
          />
        )}
        <div className="card-content">
          <h2 className="card-title">{nombre}</h2>
          <p className="card-price">${precio}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;