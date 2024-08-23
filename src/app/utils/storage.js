import { kv } from '@vercel/kv';

export async function getMenuItems() {
  try {
    return await kv.get('menuItems') || [];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

export async function setMenuItems(items) {
  try {
    await kv.set('menuItems', items);
  } catch (error) {
    console.error('Error setting menu items:', error);
  }
}

export async function addMenuItem(item) {
  try {
    const items = await getMenuItems();
    items.push(item);
    await setMenuItems(items);
  } catch (error) {
    console.error('Error adding menu item:', error);
  }
}

export async function updateMenuItem(index, updatedItem) {
  try {
    const items = await getMenuItems();
    items[index] = updatedItem;
    await setMenuItems(items);
  } catch (error) {
    console.error('Error updating menu item:', error);
  }
}

export async function deleteMenuItem(index) {
  try {
    const items = await getMenuItems();
    items.splice(index, 1);
    await setMenuItems(items);
  } catch (error) {
    console.error('Error deleting menu item:', error);
  }
}