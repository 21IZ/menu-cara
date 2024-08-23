import { kv } from '@vercel/kv';
import { put, del } from '@vercel/blob';

console.log('NEXT_PUBLIC_KV_REST_API_URL:', process.env.NEXT_PUBLIC_KV_REST_API_URL);
console.log('NEXT_PUBLIC_KV_REST_API_TOKEN:', process.env.NEXT_PUBLIC_KV_REST_API_TOKEN);

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
    const newItem = { ...item, id: Date.now().toString() };
    items.push(newItem);
    await setMenuItems(items);
    return newItem;
  } catch (error) {
    console.error('Error adding menu item:', error);
  }
}

export async function updateMenuItem(id, updatedItem) {
  try {
    const items = await getMenuItems();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      await setMenuItems(items);
      return items[index];
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
  }
}

export async function deleteMenuItem(id) {
  try {
    const items = await getMenuItems();
    const updatedItems = items.filter(item => item.id !== id);
    await setMenuItems(updatedItems);
  } catch (error) {
    console.error('Error deleting menu item:', error);
  }
}

export async function uploadImage(file) {
  try {
    const { url } = await put(file.name, file, { access: 'public' });
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

export async function deleteImage(url) {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}