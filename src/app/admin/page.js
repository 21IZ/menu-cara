'use client';

import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ nombre: '', descripcion: '', precio: '', imagen: null });
  const [editingItem, setEditingItem] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    try {
      const response = await fetch('/api/menuItems');
      if (!response.ok) {
        throw new Error('Error al obtener los ítems del menú');
      }
      const data = await response.json();
      console.log('Datos recibidos:', data);
      // Filtramos los elementos null
      const filteredData = data.filter(item => item !== null);
      setMenuItems(filteredData);
    } catch (error) {
      console.error('Error al obtener los ítems del menú', error);
    }
  }

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir la imagen');
      }
  
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  };

  const handleAdd = async () => {
    if (!newItem.nombre || !newItem.descripcion || !newItem.precio || !newItem.imagen) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const imageUrl = await handleImageUpload(newItem.imagen);
      const newItemWithImage = { ...newItem, imagen: imageUrl, id: Date.now().toString() };
      const response = await fetch('/api/menuItems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItemWithImage),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', response.status, errorData);
        throw new Error(`Error al agregar el ítem: ${errorData.error}. ${errorData.details || ''}`);
      }

      const addedItem = await response.json();
      setMenuItems([...menuItems, addedItem]);
      setNewItem({ nombre: '', descripcion: '', precio: '', imagen: null });
      setPreviewImage('');
      alert('Ítem agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el ítem:', error);
      alert(`Error al agregar el ítem: ${error.message}`);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setPreviewImage(item.imagen || '');
  };

  const handleSaveEdit = async () => {
    try {
      let imageUrl = editingItem.imagen;
      if (editingItem.imagen instanceof File) {
        imageUrl = await handleImageUpload(editingItem.imagen);
      }
  
      const updatedItem = { ...editingItem, imagen: imageUrl };
      const response = await fetch(`/api/menuItems?id=${updatedItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al guardar la edición: ${errorData.error}. ${errorData.details || ''}`);
      }
      const updated = await response.json();
      setMenuItems(menuItems.map(item => item.id === updated.id ? updated : item));
      setEditingItem(null);
      setPreviewImage('');
      alert('Ítem actualizado con éxito');
    } catch (error) {
      console.error('Error al guardar la edición', error);
      alert(error.message);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/menuItems?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al eliminar el ítem: ${errorData.error}. ${errorData.details || ''}`);
      }
      setMenuItems(menuItems.filter(item => item.id !== id));
      alert('Ítem eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el elemento', error);
      alert(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({ ...newItem, imagen: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className='admin'>
      <h1>Panel de Administración</h1>

      {menuItems.length === 0 ? (
        <p>No hay ítems en el menú. Agrega algunos usando el formulario de abajo.</p>
      ) : (
        <ul className='product-list'>
          {menuItems.map(item => (
            <li key={item.id} className='product-item'>
              <div className='product-info'>
                <span className='product-name'>{item.nombre}</span>
                <br />
                <span className='product-price'>${item.precio}</span>
                <br />
                <span className='product-description'>
                  {item.descripcion && item.descripcion.length > 50 
                    ? `${item.descripcion.substring(0, 50)}...` 
                    : item.descripcion}
                </span>
                <div className='product-buttons'>
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </div>
              </div>
              {item.imagen && <img src={item.imagen} alt={item.nombre} className='product-image' />}
            </li>
          ))}
        </ul>
      )}
      {editingItem && (
        <div className="admin-edit">
          <h2>Editar Oferta</h2>
          <input
            type="text"
            value={editingItem.nombre}
            onChange={(e) => setEditingItem({ ...editingItem, nombre: e.target.value })}
            className="admin-edit-input"
          />
          <input
            type="text"
            value={editingItem.descripcion}
            onChange={(e) => setEditingItem({ ...editingItem, descripcion: e.target.value })}
            className="admin-edit-input"
          />
          <input
            type="number"
            value={editingItem.precio}
            onChange={(e) => setEditingItem({ ...editingItem, precio: e.target.value })}
            className="admin-edit-input"
          />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setEditingItem({ ...editingItem, imagen: file });
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
            accept="image/*"
            className="admin-edit-file-input"
          />
          {previewImage && <img src={previewImage} alt="Vista previa" className="admin-preview-image" />}
          <button onClick={handleSaveEdit} className="admin-edit-button">Guardar</button>
        </div>
      )}

      <div className="admin-add">
        <h2>Agregar <br />Nuevo Ítem</h2>
        <input
          type="text"
          value={newItem.nombre}
          onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
          placeholder="Nombre"
          className="admin-add-input"
        />
        <input
          type="text"
          value={newItem.descripcion}
          onChange={(e) => setNewItem({ ...newItem, descripcion: e.target.value })}
          placeholder="Descripción"
          className="admin-add-input"
        />
        <input
          type="number"
          value={newItem.precio}
          onChange={(e) => setNewItem({ ...newItem, precio: e.target.value })}
          placeholder="Precio"
          className="admin-add-input"
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="admin-add-file-input"
        />
        {previewImage && <img src={previewImage} alt="Vista previa" className="admin-preview-image" />}
        <button onClick={handleAdd} className="admin-add-button">Agregar</button>
      </div>
    </div>
  );
}

export default AdminPanel;
