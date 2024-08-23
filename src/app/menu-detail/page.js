'use client';

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getMenuItems } from '../api/menuItems/storage';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        setLoading(true);
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching the menu items', error);
        setError('Error al cargar el menú. Llama a +5354547503');
      } finally {
        setLoading(false);
      }
    }
    fetchMenuItems();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="menu">
      <h1>Menú</h1>
      <div className="menu-items">
        {menuItems.map(item => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}