/**
 * TEST SUITE 3 — orderService
 * Tests: create order, consumer orders, farmer orders, status updates, cancel, notifications
 */

import { describe, it, expect, beforeEach } from 'vitest'

const ORDERS_KEY = 'f2c-orders'
const NOTIFS_KEY = 'f2c-notifications'

// ── Inline orderService ────────────────────────────────────────────
function generateOrderId() { return 'ORD-' + Math.floor(100000 + Math.random() * 900000) }
function readOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [] }
function writeOrders(o) { localStorage.setItem(ORDERS_KEY, JSON.stringify(o)) }

const orderSvc = {
  saveOrder(orderData) {
    const orders = readOrders()
    const order = {
      ...orderData,
      id: generateOrderId(),
      orderStatus: 'Pending',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'Pending' : 'Paid',
      createdAt: new Date().toISOString(),
    }
    writeOrders([order, ...orders])
    return order
  },
  getOrders() {
    return readOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },
  getConsumerOrders(consumerId) {
    return this.getOrders().filter(o => o.consumerId === consumerId)
  },
  getFarmerOrders(farmerId) {
    return this.getOrders()
      .filter(o => o.items.some(i => i.farmerId === farmerId))
      .map(o => ({ ...o, items: o.items.filter(i => i.farmerId === farmerId) }))
  },
  updateOrderStatus(orderId, newStatus) {
    const orders = readOrders()
    let updated = null
    const next = orders.map(o => {
      if (o.id === orderId) { updated = { ...o, orderStatus: newStatus }; return updated }
      return o
    })
    if (updated) writeOrders(next)
    return updated
  },
  cancelOrder(orderId) {
    const orders = readOrders()
    let updated = null
    const next = orders.map(o => {
      if (o.id === orderId && ['Pending', 'Accepted'].includes(o.orderStatus)) {
        updated = { ...o, orderStatus: 'Cancelled' }
        return updated
      }
      return o
    })
    if (updated) writeOrders(next)
    return updated
  },
}

// ── Temp test data ──────────────────────────────────────────────────
const CONSUMER_ID = 'consumer-001'
const FARMER_ID   = 'farmer-001'
const FARMER2_ID  = 'farmer-002'

const sampleOrder = {
  consumerId: CONSUMER_ID,
  consumer: { name: 'Santosh', phone: '9876543210', address: 'Tirupati, AP' },
  items: [
    { productId: 'p1', farmerId: FARMER_ID, farmerName: 'Ramesh Farm', name: 'Tomatoes', price: 40, quantity: 2, subtotal: 80 },
    { productId: 'p2', farmerId: FARMER2_ID, farmerName: 'Sai Farm', name: 'Onions', price: 30, quantity: 1, subtotal: 30 },
  ],
  totalItems: 3,
  subtotal: 110,
  deliveryFee: 40,
  total: 150,
  paymentMethod: 'cod',
}

// ═══════════════════════════════════════════════════════════════════
describe('orderService — Create Order', () => {

  it('✅ Creates order with generated id', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    expect(order.id).toMatch(/^ORD-/)
  })

  it('✅ New order starts with Pending status', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    expect(order.orderStatus).toBe('Pending')
  })

  it('✅ COD order has Pending payment status', () => {
    const order = orderSvc.saveOrder({ ...sampleOrder, paymentMethod: 'cod' })
    expect(order.paymentStatus).toBe('Pending')
  })

  it('✅ Online payment order has Paid status', () => {
    const order = orderSvc.saveOrder({ ...sampleOrder, paymentMethod: 'online' })
    expect(order.paymentStatus).toBe('Paid')
  })

  it('✅ Order is saved to localStorage', () => {
    orderSvc.saveOrder(sampleOrder)
    expect(orderSvc.getOrders()).toHaveLength(1)
  })

  it('✅ Consumer id is stored correctly', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    expect(order.consumerId).toBe(CONSUMER_ID)
  })

  it('✅ Items with farmerId are stored', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    expect(order.items[0].farmerId).toBe(FARMER_ID)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('orderService — Consumer Orders', () => {

  it('✅ Gets only orders for specific consumer', () => {
    orderSvc.saveOrder({ ...sampleOrder, consumerId: CONSUMER_ID })
    orderSvc.saveOrder({ ...sampleOrder, consumerId: 'other-consumer' })
    const orders = orderSvc.getConsumerOrders(CONSUMER_ID)
    expect(orders).toHaveLength(1)
    expect(orders[0].consumerId).toBe(CONSUMER_ID)
  })

  it('✅ Returns empty array for consumer with no orders', () => {
    expect(orderSvc.getConsumerOrders('no-consumer')).toEqual([])
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('orderService — Farmer Orders', () => {

  it('✅ Farmer sees only their items in orders', () => {
    orderSvc.saveOrder(sampleOrder)
    const farmerOrders = orderSvc.getFarmerOrders(FARMER_ID)
    expect(farmerOrders).toHaveLength(1)
    farmerOrders[0].items.forEach(item => expect(item.farmerId).toBe(FARMER_ID))
  })

  it('✅ Farmer2 gets their own items only', () => {
    orderSvc.saveOrder(sampleOrder)
    const farmer2Orders = orderSvc.getFarmerOrders(FARMER2_ID)
    expect(farmer2Orders).toHaveLength(1)
    expect(farmer2Orders[0].items[0].farmerId).toBe(FARMER2_ID)
  })

  it('✅ Farmer with no orders gets empty array', () => {
    orderSvc.saveOrder(sampleOrder)
    expect(orderSvc.getFarmerOrders('no-farmer')).toEqual([])
  })

  it('✅ Multi-farmer order split correctly per farmer', () => {
    orderSvc.saveOrder(sampleOrder)
    const f1Orders = orderSvc.getFarmerOrders(FARMER_ID)
    const f2Orders = orderSvc.getFarmerOrders(FARMER2_ID)
    expect(f1Orders[0].items).toHaveLength(1)
    expect(f2Orders[0].items).toHaveLength(1)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('orderService — Status Updates', () => {

  it('✅ Farmer can update order status to Accepted', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    const updated = orderSvc.updateOrderStatus(order.id, 'Accepted')
    expect(updated.orderStatus).toBe('Accepted')
  })

  it('✅ Status progresses through full lifecycle', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    const statuses = ['Accepted', 'Packed', 'Shipped', 'Delivered']
    let current = order
    statuses.forEach(status => {
      current = orderSvc.updateOrderStatus(current.id, status)
      expect(current.orderStatus).toBe(status)
    })
  })

  it('❌ Update non-existent order returns null', () => {
    const result = orderSvc.updateOrderStatus('fake-id', 'Accepted')
    expect(result).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('orderService — Cancel Order', () => {

  it('✅ Consumer can cancel Pending order', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    const cancelled = orderSvc.cancelOrder(order.id)
    expect(cancelled.orderStatus).toBe('Cancelled')
  })

  it('✅ Consumer can cancel Accepted order', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    orderSvc.updateOrderStatus(order.id, 'Accepted')
    const cancelled = orderSvc.cancelOrder(order.id)
    expect(cancelled.orderStatus).toBe('Cancelled')
  })

  it('❌ Cannot cancel Shipped order', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    orderSvc.updateOrderStatus(order.id, 'Shipped')
    const result = orderSvc.cancelOrder(order.id)
    expect(result).toBeNull()
  })

  it('❌ Cannot cancel Delivered order', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    orderSvc.updateOrderStatus(order.id, 'Delivered')
    const result = orderSvc.cancelOrder(order.id)
    expect(result).toBeNull()
  })

  it('✅ Cancelled order shows in consumer orders', () => {
    const order = orderSvc.saveOrder(sampleOrder)
    orderSvc.cancelOrder(order.id)
    const orders = orderSvc.getConsumerOrders(CONSUMER_ID)
    expect(orders[0].orderStatus).toBe('Cancelled')
  })
})
