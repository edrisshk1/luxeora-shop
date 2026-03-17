import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.items || data.items.length === 0) {
      return Response.json({ success: false, error: 'No items in order' }, { status: 400 });
    }

    // Add order to Firestore
    const ordersCollection = collection(db, 'orders');
    const orderData = {
      ...data,
      total: data.total,
      tax: data.tax,
      shipping: data.shipping,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(ordersCollection, orderData);

    return Response.json({
      success: true,
      orderId: docRef.id,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
