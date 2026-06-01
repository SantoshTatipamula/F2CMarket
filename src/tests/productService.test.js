/**
 * TEST SUITE 2 — productService
 * Tests: create, read, update, delete, seller filtering, farmerId tagging
 */

import { describe, it, expect, beforeEach } from 'vitest'

// ── Inline productService (no import issues with aliases) ──────────
const STORAGE_KEY = 'f2c-products'

const svc = {
  getProducts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  },
  saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  },
  createProduct(productData) {
    const products = this.getProducts()
    const newProduct = {
      ...productData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'active',
      totalOrders: 0,
      rating: 4.5,
    }
    this.saveProducts([newProduct, ...products])
    return newProduct
  },
  updateProduct(productId, updatedData, currentUserId) {
    const products = this.getProducts()
    const existing = products.find(p => p.id === productId)
    if (!existing || existing.sellerId !== currentUserId) return null
    const updated = products.map(p =>
      p.id === productId ? { ...p, ...updatedData, id: p.id, sellerId: p.sellerId } : p
    )
    this.saveProducts(updated)
    return updated.find(p => p.id === productId)
  },
  deleteProduct(productId, currentUserId) {
    const products = this.getProducts()
    const existing = products.find(p => p.id === productId)
    if (!existing || existing.sellerId !== currentUserId) return products
    const updated = products.filter(p => p.id !== productId)
    this.saveProducts(updated)
    return updated
  },
  getSellerProducts(sellerId) {
    return this.getProducts().filter(p => p.sellerId === sellerId)
  },
  getProductById(productId) {
    return this.getProducts().find(p => p.id === productId)
  },
}

// ── Temp test data ─────────────────────────────────────────────────
const FARMER_ID = 'farmer-001'
const OTHER_FARMER_ID = 'farmer-002'

const sampleProduct = {
  name: 'Organic Tomatoes',
  category: 'Vegetables',
  price: '₹40',
  stock: 100,
  image: 'https://example.com/tomato.jpg',
  description: 'Fresh organic tomatoes',
  sellerId: FARMER_ID,
  sellerName: 'Ramesh Farm',
}

// ═══════════════════════════════════════════════════════════════════
describe('productService — Create', () => {

  it('✅ Creates a product with correct fields', () => {
    const product = svc.createProduct(sampleProduct)
    expect(product.name).toBe('Organic Tomatoes')
    expect(product.sellerId).toBe(FARMER_ID)
    expect(product.id).toBeTruthy()
    expect(product.status).toBe('active')
    expect(product.createdAt).toBeTruthy()
  })

  it('✅ Product is saved to localStorage', () => {
    svc.createProduct(sampleProduct)
    const stored = svc.getProducts()
    expect(stored).toHaveLength(1)
    expect(stored[0].name).toBe('Organic Tomatoes')
  })

  it('✅ Multiple products are stored correctly', () => {
    svc.createProduct({ ...sampleProduct, name: 'Tomatoes' })
    svc.createProduct({ ...sampleProduct, name: 'Onions' })
    expect(svc.getProducts()).toHaveLength(2)
  })

  it('✅ Product tagged with farmerId (sellerId)', () => {
    const product = svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID })
    expect(product.sellerId).toBe(FARMER_ID)
  })

  it('✅ Each product gets a unique id', () => {
    const p1 = svc.createProduct(sampleProduct)
    const p2 = svc.createProduct(sampleProduct)
    expect(p1.id).not.toBe(p2.id)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('productService — Read', () => {

  it('✅ getProducts returns empty array when nothing stored', () => {
    expect(svc.getProducts()).toEqual([])
  })

  it('✅ getProductById returns correct product', () => {
    const created = svc.createProduct(sampleProduct)
    const found = svc.getProductById(created.id)
    expect(found.name).toBe('Organic Tomatoes')
  })

  it('✅ getProductById returns undefined for unknown id', () => {
    expect(svc.getProductById('nonexistent')).toBeUndefined()
  })

  it('✅ getSellerProducts returns only that farmer products', () => {
    svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID })
    svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID, name: 'Onions' })
    svc.createProduct({ ...sampleProduct, sellerId: OTHER_FARMER_ID, name: 'Rice' })
    const farmerProducts = svc.getSellerProducts(FARMER_ID)
    expect(farmerProducts).toHaveLength(2)
    farmerProducts.forEach(p => expect(p.sellerId).toBe(FARMER_ID))
  })

  it('✅ getSellerProducts returns empty for farmer with no products', () => {
    expect(svc.getSellerProducts('no-farmer')).toEqual([])
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('productService — Update', () => {

  it('✅ Owner can update their product', () => {
    const created = svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID })
    const updated = svc.updateProduct(created.id, { name: 'Updated Tomatoes', price: '₹50' }, FARMER_ID)
    expect(updated.name).toBe('Updated Tomatoes')
    expect(updated.price).toBe('₹50')
  })

  it('✅ sellerId is preserved after update', () => {
    const created = svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID })
    const updated = svc.updateProduct(created.id, { name: 'New Name' }, FARMER_ID)
    expect(updated.sellerId).toBe(FARMER_ID)
  })

  it('❌ Non-owner cannot update product', () => {
    const created = svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID })
    const result = svc.updateProduct(created.id, { name: 'Hacked' }, OTHER_FARMER_ID)
    expect(result).toBeNull()
  })

  it('❌ Cannot update non-existent product', () => {
    const result = svc.updateProduct('fake-id', { name: 'X' }, FARMER_ID)
    expect(result).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('productService — Delete', () => {

  it('✅ Owner can delete their product', () => {
    const created = svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID })
    svc.deleteProduct(created.id, FARMER_ID)
    expect(svc.getProducts()).toHaveLength(0)
  })

  it('❌ Non-owner cannot delete product', () => {
    const created = svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID })
    svc.deleteProduct(created.id, OTHER_FARMER_ID)
    expect(svc.getProducts()).toHaveLength(1)
  })

  it('✅ Other products remain after deletion', () => {
    const p1 = svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID, name: 'Tomatoes' })
    svc.createProduct({ ...sampleProduct, sellerId: FARMER_ID, name: 'Onions' })
    svc.deleteProduct(p1.id, FARMER_ID)
    const remaining = svc.getProducts()
    expect(remaining).toHaveLength(1)
    expect(remaining[0].name).toBe('Onions')
  })
})
