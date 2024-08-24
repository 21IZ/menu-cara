'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMenuContext } from '../../../context/MenuContext';

export default function MenuDetail() {
  const params = useParams();
  const { getItemById } = useMenuContext();

  const selectedItem = getItemById(params.id);

  if (!selectedItem) return <div>Cargando...</div>;

  const { image, title, price, description } = selectedItem;

  return (
    <div className="menu-detail">
      <Image src={image} alt={title} width={400} height={300} className="menu-detail-image" />
      <h1 className="menu-detail-title">{title}</h1>
      <p className="menu-detail-price" style={{ color: 'red' }}>${price}</p>
      <p className="menu-detail-description">{description}</p>
      <Link href="/">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}