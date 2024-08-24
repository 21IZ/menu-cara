'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMenuContext } from '../context/MenuContext';

const Card = ({ image, title, price, description, id }) => {
  const { setSelectedItem } = useMenuContext();

  const handleClick = () => {
    setSelectedItem({ image, title, price, description, id });
  };

  return (
    <Link href={`/menu-detail/${id}`} onClick={handleClick}>
      <div className="card">
        {image && (
          <Image 
            src={image} 
            alt={title} 
            width={200}
            height={130}
            className="card-image" 
          />
        )}
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-price">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;