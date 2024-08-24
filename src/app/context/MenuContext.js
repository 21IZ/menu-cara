'use client';

import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const getItemById = (id) => {
    return menuItems.find(item => item.id.toString() === id.toString());
  };

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems, selectedItem, setSelectedItem, getItemById }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);