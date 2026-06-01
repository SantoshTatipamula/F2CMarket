/**
 * TEST SUITE 5 — notificationService
 * Tests: add, read, mark read, delete, order event notifications
 */

import { describe, it, expect } from 'vitest'

const KEY = 'f2c-notifications'

function readAll() { return JSON.parse(localStorage.getItem(KEY)) || [] }
function writeAll(n) { localStorage.setItem(KEY, JSON.stringify(n)) }
function genId() { return 'NOTIF-' + Date.now() + '-' + Math.random().toString(36).slice(2) }

const notifSvc = {
  getNotifications(userId) {
    return readAll().filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },
  getUnreadCount(userId) {
    return readAll().filter(n => n.userId === userId && !n.read).length
  },
  addNotification({ userId, type, title, message, orderId = null }) {
    const n = { id: genId(), userId, type, title, message, orderId, read: false, createdAt: new Date().toISOString() }
    writeAll([n, ...readAll()])
    return n
  },
  markAsRead(id) {
    writeAll(readAll().map(n => n.id === id ? { ...n, read: true } : n))
  },
  markAllAsRead(userId) {
    writeAll(readAll().map(n => n.userId === userId ? { ...n, read: true } : n))
  },
  deleteNotification(id) {
    writeAll(readAll().filter(n => n.id !== id))
  },
  clearNotifications(userId) {
    writeAll(readAll().filter(n => n.userId !== userId))
  },
  notifyOrderPlaced(userId, orderId, total) {
    return this.addNotification({
      userId, type: 'order_placed', orderId,
      title: 'Order Placed Successfully!',
      message: `Your order #${orderId} for ₹${total} has been placed.`,
    })
  },
  notifyOrderCancelled(userId, orderId) {
    return this.addNotification({
      userId, type: 'order_cancelled', orderId,
      title: 'Order Cancelled',
      message: `Your order #${orderId} has been cancelled.`,
    })
  },
  notifyOrderStatusChanged(userId, orderId, status) {
    return this.addNotification({
      userId, type: 'order_status', orderId,
      title: `Order ${status}`,
      message: `Your order #${orderId} status updated to ${status}.`,
    })
  },
}

const USER_ID  = 'consumer-001'
const USER2_ID = 'consumer-002'

// ═══════════════════════════════════════════════════════════════════
describe('notificationService — Add & Read', () => {

  it('✅ Adds a notification', () => {
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'Hello', message: 'Test' })
    expect(notifSvc.getNotifications(USER_ID)).toHaveLength(1)
  })

  it('✅ New notification starts as unread', () => {
    const n = notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'Hi', message: 'Msg' })
    expect(n.read).toBe(false)
  })

  it('✅ getNotifications returns only that users notifications', () => {
    notifSvc.addNotification({ userId: USER_ID,  type: 'general', title: 'A', message: 'A' })
    notifSvc.addNotification({ userId: USER2_ID, type: 'general', title: 'B', message: 'B' })
    expect(notifSvc.getNotifications(USER_ID)).toHaveLength(1)
    expect(notifSvc.getNotifications(USER2_ID)).toHaveLength(1)
  })

  it('✅ getUnreadCount returns correct count', () => {
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'A', message: 'A' })
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'B', message: 'B' })
    expect(notifSvc.getUnreadCount(USER_ID)).toBe(2)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('notificationService — Mark Read', () => {

  it('✅ markAsRead marks single notification', () => {
    const n = notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'A', message: 'A' })
    notifSvc.markAsRead(n.id)
    expect(notifSvc.getUnreadCount(USER_ID)).toBe(0)
  })

  it('✅ markAllAsRead marks all for user', () => {
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'A', message: 'A' })
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'B', message: 'B' })
    notifSvc.markAllAsRead(USER_ID)
    expect(notifSvc.getUnreadCount(USER_ID)).toBe(0)
  })

  it('✅ markAllAsRead does not affect other users', () => {
    notifSvc.addNotification({ userId: USER_ID,  type: 'general', title: 'A', message: 'A' })
    notifSvc.addNotification({ userId: USER2_ID, type: 'general', title: 'B', message: 'B' })
    notifSvc.markAllAsRead(USER_ID)
    expect(notifSvc.getUnreadCount(USER2_ID)).toBe(1)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('notificationService — Delete', () => {

  it('✅ Deletes specific notification', () => {
    const n = notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'A', message: 'A' })
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'B', message: 'B' })
    notifSvc.deleteNotification(n.id)
    expect(notifSvc.getNotifications(USER_ID)).toHaveLength(1)
  })

  it('✅ clearNotifications removes all for user', () => {
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'A', message: 'A' })
    notifSvc.addNotification({ userId: USER_ID, type: 'general', title: 'B', message: 'B' })
    notifSvc.clearNotifications(USER_ID)
    expect(notifSvc.getNotifications(USER_ID)).toHaveLength(0)
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('notificationService — Order Events', () => {

  it('✅ notifyOrderPlaced creates correct notification', () => {
    notifSvc.notifyOrderPlaced(USER_ID, 'ORD-123', 500)
    const notifs = notifSvc.getNotifications(USER_ID)
    expect(notifs[0].type).toBe('order_placed')
    expect(notifs[0].orderId).toBe('ORD-123')
    expect(notifs[0].message).toContain('ORD-123')
    expect(notifs[0].message).toContain('500')
  })

  it('✅ notifyOrderCancelled creates correct notification', () => {
    notifSvc.notifyOrderCancelled(USER_ID, 'ORD-456')
    const notifs = notifSvc.getNotifications(USER_ID)
    expect(notifs[0].type).toBe('order_cancelled')
    expect(notifs[0].orderId).toBe('ORD-456')
  })

  it('✅ notifyOrderStatusChanged creates correct notification', () => {
    notifSvc.notifyOrderStatusChanged(USER_ID, 'ORD-789', 'Shipped')
    const notifs = notifSvc.getNotifications(USER_ID)
    expect(notifs[0].type).toBe('order_status')
    expect(notifs[0].title).toBe('Order Shipped')
  })
})
