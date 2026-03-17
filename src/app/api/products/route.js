import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const productsCollection = collection(db, 'products');
    let q;

    if (category && category !== 'all') {
      q = query(productsCollection, where('category', '==', category));
    } else {
      q = query(productsCollection);
    }

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
