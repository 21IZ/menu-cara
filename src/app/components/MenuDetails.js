import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMenuContext } from '../context/MenuContext';

export default function MenuDetail() {
  const { selectedItem } = useMenuContext();

  if (!selectedItem) return <div>No item selected</div>;

  const { image, title, price, description } = selectedItem;

  return (
    <div className="menu-detail">
      <Image src={image} alt={title} width={400} height={300} className="menu-detail-image" />
      <h1 className="menu-detail-title">{title}</h1>
      <p className="menu-detail-price" style={{ color: 'red' }}>${price}</p>
      <p className="menu-detail-description">{description}</p>
      <Link href="/menu">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}