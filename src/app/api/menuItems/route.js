// pages/api/route.js
import { kv } from '@vercel/kv';
import { put, del } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const items = await kv.get('menuItems') || [];
        res.status(200).json(items);
        break;
      case 'POST':
        const newItem = req.body;
        const currentItems = await kv.get('menuItems') || [];
        newItem.id = Date.now().toString();
        currentItems.push(newItem);
        await kv.set('menuItems', currentItems);
        res.status(201).json(newItem);
        break;
      case 'PUT':
        const { id, updatedItem } = req.body;
        const itemsToUpdate = await kv.get('menuItems') || [];
        const index = itemsToUpdate.findIndex(item => item.id === id);
        if (index !== -1) {
          itemsToUpdate[index] = { ...itemsToUpdate[index], ...updatedItem };
          await kv.set('menuItems', itemsToUpdate);
          res.status(200).json(itemsToUpdate[index]);
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
        break;
      case 'DELETE':
        const { deleteId } = req.body;
        const itemsToDelete = await kv.get('menuItems') || [];
        const filteredItems = itemsToDelete.filter(item => item.id !== deleteId);
        await kv.set('menuItems', filteredItems);
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
