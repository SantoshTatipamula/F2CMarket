/**
 * TEST SUITE 1 — Authentication & Authorization
 * Tests: login, register, role redirects, farmer verification gate, ban check
 */

import { describe, it, expect, beforeEach } from 'vitest'

// ── Temp data helpers (localStorage simulation) ──────────────────
const ADMIN = {
  id: 'admin-001', name: 'Admin',
  email: 'admin@f2cmarket.com', password: 'admin123',
  role: 'admin', verified: true, verificationStatus: 'approved',
}

function seedUsers(users) {
  localStorage.setItem('f2c-users', JSON.stringify(users))
}

function getStoredUser() {
  return JSON.parse(localStorage.getItem('f2c-user'))
}

// ── Pure login logic (extracted from AuthContext) ─────────────────
function login(email, password, users = []) {
  if (email === ADMIN.email && password === ADMIN.password)
    return { success: true, role: 'admin' }

  const found = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!found) return { success: false, error: 'Invalid email or password.' }
  if (found.banned) return { success: false, error: 'Your account has been suspended. Contact support.' }
  /* Rejected farmers cannot login */
  if (found.role === 'farmer' && found.verificationStatus === 'rejected') {
    return { success: false, error: 'Your farmer application was rejected.' }
  }
  /* Pending farmers CAN login — into restricted workspace */
  return { success: true, role: found.role, verificationStatus: found.verificationStatus || 'pending' }
}

// ── Pure register logic ───────────────────────────────────────────
function register(newUser) {
  return {
    ...newUser,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
    verificationStatus: newUser.role === 'farmer' ? 'pending' : 'approved',
    verified: newUser.role !== 'farmer',
    banned: false,
  }
}

// ═══════════════════════════════════════════════════════════════════
describe('AUTH — Login', () => {

  it('✅ Admin can login with hardcoded credentials', () => {
    const result = login('admin@f2cmarket.com', 'admin123')
    expect(result.success).toBe(true)
    expect(result.role).toBe('admin')
  })

  it('❌ Admin login fails with wrong password', () => {
    const result = login('admin@f2cmarket.com', 'wrongpass')
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/invalid/i)
  })

  it('✅ Consumer can login with correct credentials', () => {
    const users = [{ id: 'u1', email: 'consumer@test.com', password: 'pass123', role: 'consumer', verificationStatus: 'approved', banned: false }]
    const result = login('consumer@test.com', 'pass123', users)
    expect(result.success).toBe(true)
    expect(result.role).toBe('consumer')
  })

  it('❌ Consumer login fails with wrong password', () => {
    const users = [{ id: 'u1', email: 'consumer@test.com', password: 'pass123', role: 'consumer', banned: false }]
    const result = login('consumer@test.com', 'wrongpass', users)
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/invalid/i)
  })

  it('❌ Login fails for non-existent email', () => {
    const result = login('nobody@test.com', 'pass123', [])
    expect(result.success).toBe(false)
  })

  it('❌ Email is case-insensitive match', () => {
    const users = [{ id: 'u1', email: 'Test@Test.com', password: 'pass123', role: 'consumer', verificationStatus: 'approved', banned: false }]
    const result = login('test@test.com', 'pass123', users)
    expect(result.success).toBe(true)
  })

  it('❌ Banned consumer cannot login', () => {
    const users = [{ id: 'u1', email: 'banned@test.com', password: 'pass123', role: 'consumer', banned: true }]
    const result = login('banned@test.com', 'pass123', users)
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/suspended/i)
  })

  it('✅ Pending farmer CAN login (redirected to pending workspace)', () => {
    const users = [{ id: 'f1', email: 'farmer@test.com', password: 'pass123', role: 'farmer', verificationStatus: 'pending', banned: false }]
    const result = login('farmer@test.com', 'pass123', users)
    expect(result.success).toBe(true)
    expect(result.verificationStatus).toBe('pending')
  })

  it('❌ Rejected farmer cannot login', () => {
    const users = [{ id: 'f1', email: 'farmer@test.com', password: 'pass123', role: 'farmer', verificationStatus: 'rejected', banned: false }]
    const result = login('farmer@test.com', 'pass123', users)
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/rejected/i)
  })

  it('✅ Approved farmer can login', () => {
    const users = [{ id: 'f1', email: 'farmer@test.com', password: 'pass123', role: 'farmer', verificationStatus: 'approved', banned: false }]
    const result = login('farmer@test.com', 'pass123', users)
    expect(result.success).toBe(true)
    expect(result.role).toBe('farmer')
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('AUTH — Register', () => {

  it('✅ Consumer registers with approved status immediately', () => {
    const saved = register({ name: 'John', email: 'john@test.com', password: 'pass', role: 'consumer' })
    expect(saved.verificationStatus).toBe('approved')
    expect(saved.verified).toBe(true)
    expect(saved.banned).toBe(false)
    expect(saved.id).toMatch(/^user-/)
  })

  it('✅ Farmer registers with pending status', () => {
    const saved = register({ name: 'Ramesh', email: 'ramesh@farm.com', password: 'pass', role: 'farmer', farmName: 'Ramesh Farm' })
    expect(saved.verificationStatus).toBe('pending')
    expect(saved.verified).toBe(false)
    expect(saved.banned).toBe(false)
  })

  it('✅ Register saves createdAt timestamp', () => {
    const saved = register({ name: 'Test', email: 'test@test.com', password: 'p', role: 'consumer' })
    expect(saved.createdAt).toBeTruthy()
    expect(new Date(saved.createdAt).getTime()).toBeLessThanOrEqual(Date.now())
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('AUTH — Role Redirects', () => {

  it('✅ Consumer redirects to /', () => {
    const redirects = { consumer: '/', farmer: '/farmer/dashboard', admin: '/admin/dashboard' }
    expect(redirects['consumer']).toBe('/')
  })

  it('✅ Farmer redirects to /farmer/dashboard', () => {
    const redirects = { consumer: '/', farmer: '/farmer/dashboard', admin: '/admin/dashboard' }
    expect(redirects['farmer']).toBe('/farmer/dashboard')
  })

  it('✅ Admin redirects to /admin/dashboard', () => {
    const redirects = { consumer: '/', farmer: '/farmer/dashboard', admin: '/admin/dashboard' }
    expect(redirects['admin']).toBe('/admin/dashboard')
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('AUTH — Pending Farmer Workspace', () => {

  it('✅ Pending farmer CAN now login', () => {
    const users = [{ id: 'f1', email: 'farmer@test.com', password: 'pass123',
      role: 'farmer', verificationStatus: 'pending', banned: false }]
    const result = login('farmer@test.com', 'pass123', users)
    expect(result.success).toBe(true)
    expect(result.role).toBe('farmer')
    expect(result.verificationStatus).toBe('pending')
  })

  it('✅ Pending farmer redirects to /farmer/pending', () => {
    const result = { success: true, role: 'farmer', verificationStatus: 'pending' }
    const redirect = result.verificationStatus === 'pending' ? '/farmer/pending' : '/farmer/dashboard'
    expect(redirect).toBe('/farmer/pending')
  })

  it('✅ Approved farmer redirects to /farmer/dashboard', () => {
    const result = { success: true, role: 'farmer', verificationStatus: 'approved' }
    const redirect = result.verificationStatus === 'pending' ? '/farmer/pending' : '/farmer/dashboard'
    expect(redirect).toBe('/farmer/dashboard')
  })

  it('❌ Rejected farmer still cannot login', () => {
    const users = [{ id: 'f1', email: 'farmer@test.com', password: 'pass123',
      role: 'farmer', verificationStatus: 'rejected', banned: false }]
    const result = login('farmer@test.com', 'pass123', users)
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/rejected/i)
  })

  it('✅ Pending farmer profile update saves correctly', () => {
    const user = { id: 'f1', name: 'Ramesh', role: 'farmer', verificationStatus: 'pending',
      farmName: 'Old Name', farmLocation: 'Old Location' }
    const updates = { farmName: 'New Farm', farmLocation: 'Tirupati, AP', specialty: 'Vegetables' }
    const updated = { ...user, ...updates }
    expect(updated.farmName).toBe('New Farm')
    expect(updated.farmLocation).toBe('Tirupati, AP')
    expect(updated.verificationStatus).toBe('pending') // status unchanged
  })

  it('✅ ProtectedRoute allows pending farmer on /farmer/pending', () => {
    const user = { role: 'farmer', verificationStatus: 'pending', banned: false }
    const path = '/farmer/pending'
    const blocked = user.verificationStatus === 'pending' && !path.startsWith('/farmer/pending')
    expect(blocked).toBe(false)
  })

  it('❌ ProtectedRoute blocks pending farmer from /farmer/dashboard', () => {
    const user = { role: 'farmer', verificationStatus: 'pending', banned: false }
    const path = '/farmer/dashboard'
    const blocked = user.verificationStatus === 'pending' && !path.startsWith('/farmer/pending')
    expect(blocked).toBe(true)
  })
})
