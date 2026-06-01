/**
 * TEST SUITE 6 — Admin Actions
 * Tests: approve/reject farmer, ban/activate user, admin stats
 */

import { describe, it, expect } from 'vitest'

// ── Inline user management logic ───────────────────────────────────
function createUserStore(initialUsers = []) {
  let users = [...initialUsers]
  return {
    get all() { return users },
    updateUser(updated) {
      users = users.map(u => u.id === updated.id ? updated : u)
      return users.find(u => u.id === updated.id)
    },
    approveFarmer(farmer) {
      return this.updateUser({ ...farmer, verificationStatus: 'approved', verified: true })
    },
    rejectFarmer(farmer) {
      return this.updateUser({ ...farmer, verificationStatus: 'rejected', verified: false })
    },
    banUser(user)      { return this.updateUser({ ...user, banned: true  }) },
    activateUser(user) { return this.updateUser({ ...user, banned: false }) },
    getConsumers() { return users.filter(u => u.role === 'consumer') },
    getFarmers()   { return users.filter(u => u.role === 'farmer') },
    getPendingFarmers() { return users.filter(u => u.role === 'farmer' && u.verificationStatus === 'pending') },
  }
}

// ── Temp test data ──────────────────────────────────────────────────
const pendingFarmer = {
  id: 'f1', name: 'Ramesh', email: 'ramesh@farm.com',
  role: 'farmer', verificationStatus: 'pending', verified: false, banned: false,
  farmName: 'Ramesh Farm', farmLocation: 'Tirupati', govId: 'ADB1234',
}

const approvedFarmer = {
  id: 'f2', name: 'Sai', email: 'sai@farm.com',
  role: 'farmer', verificationStatus: 'approved', verified: true, banned: false,
}

const consumer1 = {
  id: 'c1', name: 'Santosh', email: 'santosh@test.com',
  role: 'consumer', banned: false, verificationStatus: 'approved',
}

const consumer2 = {
  id: 'c2', name: 'Priya', email: 'priya@test.com',
  role: 'consumer', banned: false, verificationStatus: 'approved',
}

// ═══════════════════════════════════════════════════════════════════
describe('Admin — Farmer Verification', () => {

  it('✅ Admin can approve pending farmer', () => {
    const store = createUserStore([pendingFarmer])
    const updated = store.approveFarmer(pendingFarmer)
    expect(updated.verificationStatus).toBe('approved')
    expect(updated.verified).toBe(true)
  })

  it('✅ Admin can reject pending farmer', () => {
    const store = createUserStore([pendingFarmer])
    const updated = store.rejectFarmer(pendingFarmer)
    expect(updated.verificationStatus).toBe('rejected')
    expect(updated.verified).toBe(false)
  })

  it('✅ Admin can revoke approved farmer', () => {
    const store = createUserStore([approvedFarmer])
    const updated = store.rejectFarmer(approvedFarmer)
    expect(updated.verificationStatus).toBe('rejected')
    expect(updated.verified).toBe(false)
  })

  it('✅ Admin can re-approve rejected farmer', () => {
    const rejected = { ...pendingFarmer, verificationStatus: 'rejected' }
    const store = createUserStore([rejected])
    const updated = store.approveFarmer(rejected)
    expect(updated.verificationStatus).toBe('approved')
  })

  it('✅ getPendingFarmers returns only pending', () => {
    const store = createUserStore([pendingFarmer, approvedFarmer, consumer1])
    expect(store.getPendingFarmers()).toHaveLength(1)
    expect(store.getPendingFarmers()[0].id).toBe('f1')
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Admin — User Management', () => {

  it('✅ Admin can ban a consumer', () => {
    const store = createUserStore([consumer1])
    const updated = store.banUser(consumer1)
    expect(updated.banned).toBe(true)
  })

  it('✅ Admin can activate a banned consumer', () => {
    const banned = { ...consumer1, banned: true }
    const store = createUserStore([banned])
    const updated = store.activateUser(banned)
    expect(updated.banned).toBe(false)
  })

  it('✅ getConsumers filters correctly', () => {
    const store = createUserStore([consumer1, consumer2, pendingFarmer, approvedFarmer])
    expect(store.getConsumers()).toHaveLength(2)
    store.getConsumers().forEach(u => expect(u.role).toBe('consumer'))
  })

  it('✅ getFarmers filters correctly', () => {
    const store = createUserStore([consumer1, consumer2, pendingFarmer, approvedFarmer])
    expect(store.getFarmers()).toHaveLength(2)
    store.getFarmers().forEach(u => expect(u.role).toBe('farmer'))
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Admin — Dashboard Stats', () => {

  it('✅ Counts consumers correctly', () => {
    const store = createUserStore([consumer1, consumer2, pendingFarmer])
    expect(store.getConsumers()).toHaveLength(2)
  })

  it('✅ Counts pending farmers correctly', () => {
    const store = createUserStore([pendingFarmer, approvedFarmer, consumer1])
    expect(store.getPendingFarmers()).toHaveLength(1)
  })

  it('✅ Stats update after approval', () => {
    const store = createUserStore([pendingFarmer])
    expect(store.getPendingFarmers()).toHaveLength(1)
    store.approveFarmer(pendingFarmer)
    expect(store.getPendingFarmers()).toHaveLength(0)
  })
})
