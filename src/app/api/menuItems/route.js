import { kv } from '@vercel/kv';

// Helper functions to interact with KV storage
async function getMenuItems() {
  const items = await kv.get('menuItems');
  return Array.isArray(items) ? items : [];
}

async function setMenuItems(items) {
  await kv.set('menuItems', items);
}

async function updateMenuItem(id, updatedItem) {
  const items = await getMenuItems();
  const index = items.findIndex(item => item && item.id === id);
  if (index === -1) {
    throw new Error('Item not found');
  }
  items[index] = { ...items[index], ...updatedItem, id };  // Ensure id is preserved
  await setMenuItems(items);
  return items[index];
}

async function deleteMenuItem(id) {
  const items = await getMenuItems();
  const index = items.findIndex(item => item && item.id === id);
  if (index === -1) {
    throw new Error('Item not found');
  }
  items.splice(index, 1);
  await setMenuItems(items);
}

// API route handlers
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      throw new Error('Missing item id');
    }
    
    const updatedItem = await request.json();
    if (typeof updatedItem !== 'object') {
      throw new Error('Invalid item data');
    }
    
    const updated = await updateMenuItem(id, updatedItem);
    
    return new Response(JSON.stringify(updated), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return new Response(JSON.stringify({ error: 'Error updating menu item', details: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      throw new Error('Missing item id');
    }
    
    await deleteMenuItem(id);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return new Response(JSON.stringify({ error: 'Error deleting menu item', details: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}