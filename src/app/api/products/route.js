import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

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

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.price || !data.category) {
      return Response.json(
        { success: false, error: 'Missing required fields: name, price, category' },
        { status: 400 }
      );
    }

    // Add product to Firestore
    const productsCollection = collection(db, 'products');
    const productData = {
      name: data.name,
      price: parseFloat(data.price),
      category: data.category,
      description: data.description || '',
      image: data.image || '',
      rating: 5,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(productsCollection, productData);

    return Response.json({
      success: true,
      productId: docRef.id,
      message: 'Product added successfully',
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return Response.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Delete product from Firestore
    await deleteDoc(doc(db, 'products', productId));

    return Response.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
