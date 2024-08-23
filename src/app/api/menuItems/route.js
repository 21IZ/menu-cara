import { kv } from '@vercel/kv';

// Helper functions to interact with KV storage
async function getMenuItems() {
  return await kv.get('menuItems') || [];
}

async function setMenuItems(items) {
  await kv.set('menuItems', items);
}

async function addMenuItem(item) {
  const items = await getMenuItems();
  items.push(item);
  await setMenuItems(items);
}

async function updateMenuItem(index, updatedItem) {
  const items = await getMenuItems();
  items[index] = updatedItem;
  await setMenuItems(items);
}

async function deleteMenuItem(index) {
  const items = await getMenuItems();
  items.splice(index, 1);
  await setMenuItems(items);
}

// API route handlers
export async function GET() {
  try {
    const items = await getMenuItems();
    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return new Response(JSON.stringify({ error: 'Error fetching menu items' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const { item } = await request.json();
    await addMenuItem(item);
    return new Response(JSON.stringify(item), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding menu item:', error);
    return new Response(JSON.stringify({ error: 'Error adding menu item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  try {
    const { index, updatedItem } = await request.json();
    await updateMenuItem(index, updatedItem);
    return new Response(JSON.stringify(updatedItem), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return new Response(JSON.stringify({ error: 'Error updating menu item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { index } = await request.json();
    await deleteMenuItem(index);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return new Response(JSON.stringify({ error: 'Error deleting menu item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
