import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('🔍 Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('✅ Connected to MongoDB');
    
    // Note to myself: please fucking remember to use the same database cause it's a computer not a gene bitch
    const db = client.db('devinfinity');
    console.log('📂 Using database:', db.databaseName);
    
    const collection = db.collection('products');
    console.log('📦 Accessing collection: products');
    
    const products = await collection.find({}).toArray();
    console.log('📊 Found products:', products.length);

    if (products.length === 0) {
      console.warn('⚠️ No products found in database');
    }

    const formattedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : null
    }));

    return new Response(JSON.stringify(formattedProducts), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    console.error('Full error:', err.message);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch products',
      details: err.message,
      hint: 'Check MongoDB connection and database name'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}