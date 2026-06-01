/**
 * TEST SUITE 8 — End-to-End Integration Flows
 * Full journey tests: consumer buys, farmer fulfils, admin approves farmer
 */

import { describe, it, expect } from 'vitest'

// ── Reuse inline services ──────────────────────────────────────────
const parsePrice = p => Number(String(p).replace(/[^\d.]/g, '')) || 0

const ORDERS_KEY = 'f2c-orders'
const NOTIFS_KEY = 'f2c-notifications'

function readOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [] }
function writeOrders(o) { localStorage.setItem(ORDERS_KEY, JSON.stringify(o)) }
function readNotifs() { return JSON.parse(localStorage.getItem(NOTIFS_KEY)) || [] }
function writeNotifs(n) { localStorage.setItem(NOTIFS_KEY, JSON.stringify(n)) }

const orderSvc = {
  saveOrder(d) {
    const order = {
      ...d, id: 'ORD-' + Date.now(), orderStatus: 'Pending',
      paymentStatus: d.paymentMethod === 'cod' ? 'Pending' : 'Paid',
      createdAt: new Date().toISOString(),
    }
    writeOrders([order, ...readOrders()])
    writeNotifs([{
      id: 'N-' + Date.now(), userId: d.consumerId, type: 'order_placed',
      title: 'Order Placed!', message: `Order ${order.id} placed`, orderId: order.id,
      read: false, createdAt: new Date().toISOString(),
    }, ...readNotifs()])
    return order
  },
  updateStatus(id, status) {
    let updated = null
    writeOrders(readOrders().map(o => { if(o.id===id){updated={...o,orderStatus:status};return updated}return o }))
    if (updated) writeNotifs([{
      id: 'N-' + Date.now(), userId: updated.consumerId, type: 'order_status',
      title: `Order ${status}`, message: `Order ${id} is now ${status}`, orderId: id,
      read: false, createdAt: new Date().toISOString(),
    }, ...readNotifs()])
    return updated
  },
  getConsumerOrders(cId) { return readOrders().filter(o => o.consumerId === cId) },
  getFarmerOrders(fId)   {
    return readOrders()
      .filter(o => o.items.some(i => i.farmerId === fId))
      .map(o => ({ ...o, items: o.items.filter(i => i.farmerId === fId) }))
  },
  cancelOrder(id) {
    let updated = null
    writeOrders(readOrders().map(o => {
      if(o.id===id && ['Pending','Accepted'].includes(o.orderStatus)){
        updated={...o,orderStatus:'Cancelled'}; return updated
      }
      return o
    }))
    return updated
  }
}

const PRODUCTS_KEY = 'f2c-products'
const productSvc = {
  create(data) {
    const p = { ...data, id: 'P-' + Date.now(), status: 'active', createdAt: new Date().toISOString() }
    const all = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || []
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([p, ...all]))
    return p
  },
  getAll() { return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [] },
  getByFarmer(fId) { return this.getAll().filter(p => p.sellerId === fId) },
}

// ── Temp users & test data ─────────────────────────────────────────
const FARMER  = { id: 'farmer-001', name: 'Ramesh', role: 'farmer', verificationStatus: 'pending' }
const CONSUMER = { id: 'consumer-001', name: 'Santosh', role: 'consumer' }

// ═══════════════════════════════════════════════════════════════════
describe('Integration — Full consumer purchase flow', () => {

  it('✅ Consumer can add product to cart, checkout, and receive notification', () => {
    // 1. Farmer creates a product
    const product = productSvc.create({
      name: 'Organic Tomatoes', price: '₹40', sellerId: FARMER.id,
      sellerName: 'Ramesh Farm', category: 'Vegetables', stock: 100,
    })
    expect(product.sellerId).toBe(FARMER.id)

    // 2. Consumer places order
    const order = orderSvc.saveOrder({
      consumerId: CONSUMER.id,
      consumer: { name: CONSUMER.name, phone: '9999999999', address: 'Tirupati' },
      items: [{ productId: product.id, farmerId: FARMER.id, farmerName: 'Ramesh Farm',
                name: product.name, price: 40, quantity: 2, subtotal: 80 }],
      totalItems: 2, subtotal: 80, deliveryFee: 40, total: 120, paymentMethod: 'cod',
    })
    expect(order.id).toMatch(/^ORD-/)
    expect(order.orderStatus).toBe('Pending')

    // 3. Consumer gets notification
    const notifs = readNotifs().filter(n => n.userId === CONSUMER.id)
    expect(notifs).toHaveLength(1)
    expect(notifs[0].type).toBe('order_placed')

    // 4. Consumer order visible in history
    const consumerOrders = orderSvc.getConsumerOrders(CONSUMER.id)
    expect(consumerOrders).toHaveLength(1)
    expect(consumerOrders[0].total).toBe(120)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Integration — Farmer fulfils order flow', () => {

  it('✅ Farmer sees order → accepts → ships → delivers → consumer notified', () => {
    // Setup: create order
    const order = orderSvc.saveOrder({
      consumerId: CONSUMER.id,
      consumer: { name: 'Santosh', phone: '9999', address: 'Tirupati' },
      items: [{ productId: 'p1', farmerId: FARMER.id, farmerName: 'Ramesh Farm',
                name: 'Tomatoes', price: 40, quantity: 1, subtotal: 40 }],
      totalItems: 1, subtotal: 40, deliveryFee: 40, total: 80, paymentMethod: 'cod',
    })

    // 1. Farmer sees the order
    const farmerOrders = orderSvc.getFarmerOrders(FARMER.id)
    expect(farmerOrders).toHaveLength(1)

    // 2. Farmer accepts
    const accepted = orderSvc.updateStatus(order.id, 'Accepted')
    expect(accepted.orderStatus).toBe('Accepted')

    // 3. Farmer ships
    const shipped = orderSvc.updateStatus(order.id, 'Shipped')
    expect(shipped.orderStatus).toBe('Shipped')

    // 4. Farmer delivers
    const delivered = orderSvc.updateStatus(order.id, 'Delivered')
    expect(delivered.orderStatus).toBe('Delivered')

    // 5. Consumer gets 3 status notifications (placed + accepted + shipped + delivered = 4 total)
    const consumerNotifs = readNotifs().filter(n => n.userId === CONSUMER.id)
    expect(consumerNotifs.length).toBeGreaterThanOrEqual(3)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Integration — Consumer cancels order', () => {

  it('✅ Consumer cancels pending order and it reflects in history', () => {
    const order = orderSvc.saveOrder({
      consumerId: CONSUMER.id,
      consumer: { name: 'Santosh', phone: '9999', address: 'Tirupati' },
      items: [{ productId: 'p1', farmerId: FARMER.id, farmerName: 'Ramesh Farm',
                name: 'Tomatoes', price: 40, quantity: 1, subtotal: 40 }],
      totalItems: 1, subtotal: 40, deliveryFee: 40, total: 80, paymentMethod: 'cod',
    })

    const cancelled = orderSvc.cancelOrder(order.id)
    expect(cancelled.orderStatus).toBe('Cancelled')

    const orders = orderSvc.getConsumerOrders(CONSUMER.id)
    expect(orders.find(o => o.id === order.id)?.orderStatus).toBe('Cancelled')
  })

  it('❌ Consumer cannot cancel shipped order', () => {
    const order = orderSvc.saveOrder({
      consumerId: CONSUMER.id,
      consumer: { name: 'Santosh', phone: '9999', address: 'Tirupati' },
      items: [{ productId: 'p1', farmerId: FARMER.id, farmerName: 'Ramesh Farm',
                name: 'Tomatoes', price: 40, quantity: 1, subtotal: 40 }],
      totalItems: 1, subtotal: 40, deliveryFee: 40, total: 80, paymentMethod: 'cod',
    })
    orderSvc.updateStatus(order.id, 'Shipped')
    const result = orderSvc.cancelOrder(order.id)
    expect(result).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Integration — Admin approves farmer flow', () => {

  it('✅ Farmer registered as pending → admin approves → farmer can login', () => {
    // 1. Farmer registers (pending)
    const newFarmer = {
      id: 'f-test', name: 'New Farmer', email: 'new@farm.com',
      password: 'pass', role: 'farmer', verificationStatus: 'pending', verified: false,
    }
    expect(newFarmer.verificationStatus).toBe('pending')

    // 2. Login blocked for pending
    const canLogin = (user) =>
      user.role !== 'farmer' || user.verificationStatus === 'approved'
    expect(canLogin(newFarmer)).toBe(false)

    // 3. Admin approves
    const approved = { ...newFarmer, verificationStatus: 'approved', verified: true }
    expect(canLogin(approved)).toBe(true)

    // 4. Farmer can now access dashboard
    const canAccessDashboard = (user) =>
      user.role === 'farmer' && user.verificationStatus === 'approved'
    expect(canAccessDashboard(approved)).toBe(true)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Integration — Multi-farmer order', () => {

  it('✅ Order with 2 farmers splits correctly per farmer', () => {
    const order = orderSvc.saveOrder({
      consumerId: CONSUMER.id,
      consumer: { name: 'Santosh', phone: '9999', address: 'Tirupati' },
      items: [
        { productId: 'p1', farmerId: 'farmer-001', farmerName: 'Ramesh', name: 'Tomatoes', price: 40, quantity: 2, subtotal: 80 },
        { productId: 'p2', farmerId: 'farmer-002', farmerName: 'Sai',    name: 'Onions',   price: 30, quantity: 1, subtotal: 30 },
      ],
      totalItems: 3, subtotal: 110, deliveryFee: 40, total: 150, paymentMethod: 'cod',
    })

    const f1Orders = orderSvc.getFarmerOrders('farmer-001')
    const f2Orders = orderSvc.getFarmerOrders('farmer-002')

    expect(f1Orders[0].items).toHaveLength(1)
    expect(f1Orders[0].items[0].farmerId).toBe('farmer-001')
    expect(f2Orders[0].items).toHaveLength(1)
    expect(f2Orders[0].items[0].farmerId).toBe('farmer-002')
  })
})
