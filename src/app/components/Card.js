'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMenuContext } from '../context/MenuContext';

const Card = ({ menuItems }) => {
  const { setSelectedItem } = useMenuContext();

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const validMenuItems = menuItems.filter(item => item !== null && item !== undefined);

  if (validMenuItems.length === 0) {
    return <p>No hay ítems disponibles en el menú.</p>;
  }

  return (
    <>
      {validMenuItems.map((item) => (
        <Link href={`/menuDetail/${encodeURIComponent(item.id)}`} key={item.id} onClick={() => handleClick(item)} className="card-link">
          <div className="card">
            {item.imagen ? (
              <Image 
                src={item.imagen} 
                alt={item.nombre} 
                width={200}
                height={130}
                className="card-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpg";
                }}
              />
            ) : (
              <div className="card-image-placeholder">No image available</div>
            )}
            <div className="card-content">
              <h2 className="card-title">{item.nombre}</h2>
              <p className="card-price">${item.precio}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Card;