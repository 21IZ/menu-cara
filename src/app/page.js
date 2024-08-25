'use client';

import React, { useState, useEffect } from 'react';
import Card from './components/Card';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        setLoading(true);
        const response = await fetch('/api/menuItems');
        if (!response.ok) {
          throw new Error('Error al cargar los ítems del menú');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        // Filtramos los elementos nulos
        const filteredData = data.filter(item => item !== null);
        setMenuItems(filteredData);
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
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <Card key={item.id} {...item} />
          ))
        ) : (
          <div>No hay items en el menú</div>
        )}
      </div>
    </div>
  );
}