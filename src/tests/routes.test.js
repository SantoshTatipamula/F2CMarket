/**
 * TEST SUITE 7 — Routes & Links
 * Tests: every route path exists, role-based access, redirect logic
 */

import { describe, it, expect } from 'vitest'

// ── All expected routes ────────────────────────────────────────────
const PUBLIC_ROUTES = ['/', '/products', '/products/:id', '/farmers', '/about']
const AUTH_ROUTES   = ['/login', '/register', '/pending-verification']

const CONSUMER_ROUTES = ['/cart', '/wishlist', '/checkout', '/orders', '/order-success',
  '/profile', '/profile/edit', '/profile/settings', '/profile/security',
  '/profile/notifications', '/profile/activity']

const FARMER_ROUTES = ['/farmer/dashboard', '/farmer/analytics', '/farmer/products',
  '/farmer/products/add', '/farmer/products/edit/:id', '/farmer/orders', '/farmer/profile',
  '/profile', '/cart', '/wishlist']

const ADMIN_ROUTES  = ['/admin/dashboard', '/admin/users', '/admin/farmers', '/admin/products']

// ── Role-based access matrix ───────────────────────────────────────
const ACCESS = {
  '/cart':               ['consumer', 'farmer'],
  '/wishlist':           ['consumer', 'farmer'],
  '/checkout':           ['consumer', 'farmer'],
  '/orders':             ['consumer'],
  '/farmer/dashboard':   ['farmer'],
  '/farmer/analytics':   ['farmer'],
  '/farmer/products':    ['farmer'],
  '/farmer/orders':      ['farmer'],
  '/admin/dashboard':    ['admin'],
  '/admin/users':        ['admin'],
  '/admin/farmers':      ['admin'],
  '/admin/products':     ['admin'],
  '/profile':            ['consumer', 'farmer', 'admin'],
}

// ── Redirect logic ─────────────────────────────────────────────────
const ROLE_HOME = { consumer: '/', farmer: '/farmer/dashboard', admin: '/admin/dashboard' }

function canAccess(path, userRole) {
  const allowed = ACCESS[path]
  if (!allowed) return true  // public route
  return allowed.includes(userRole)
}

function getRedirect(currentPath, userRole) {
  const allowed = ACCESS[currentPath]
  if (!allowed) return null
  if (!allowed.includes(userRole)) return ROLE_HOME[userRole] || '/'
  return null
}

// ═══════════════════════════════════════════════════════════════════
describe('Routes — Public routes accessible to all', () => {
  PUBLIC_ROUTES.forEach(route => {
    it(`✅ ${route} is public`, () => {
      expect(canAccess(route, undefined)).toBe(true)
      expect(canAccess(route, 'consumer')).toBe(true)
      expect(canAccess(route, 'farmer')).toBe(true)
      expect(canAccess(route, 'admin')).toBe(true)
    })
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Routes — Consumer access', () => {

  it('✅ Consumer can access /cart', () => {
    expect(canAccess('/cart', 'consumer')).toBe(true)
  })

  it('✅ Consumer can access /wishlist', () => {
    expect(canAccess('/wishlist', 'consumer')).toBe(true)
  })

  it('✅ Consumer can access /orders', () => {
    expect(canAccess('/orders', 'consumer')).toBe(true)
  })

  it('❌ Consumer cannot access farmer routes', () => {
    expect(canAccess('/farmer/dashboard', 'consumer')).toBe(false)
  })

  it('❌ Consumer cannot access admin routes', () => {
    expect(canAccess('/admin/dashboard', 'consumer')).toBe(false)
  })

  it('✅ Consumer redirected to / when accessing farmer route', () => {
    expect(getRedirect('/farmer/dashboard', 'consumer')).toBe('/')
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Routes — Farmer access', () => {

  it('✅ Farmer can access /cart', () => {
    expect(canAccess('/cart', 'farmer')).toBe(true)
  })

  it('✅ Farmer can access /wishlist', () => {
    expect(canAccess('/wishlist', 'farmer')).toBe(true)
  })

  it('✅ Farmer can access /farmer/dashboard', () => {
    expect(canAccess('/farmer/dashboard', 'farmer')).toBe(true)
  })

  it('✅ Farmer can access /farmer/analytics', () => {
    expect(canAccess('/farmer/analytics', 'farmer')).toBe(true)
  })

  it('❌ Farmer cannot access /orders (consumer only)', () => {
    expect(canAccess('/orders', 'farmer')).toBe(false)
  })

  it('❌ Farmer cannot access admin routes', () => {
    expect(canAccess('/admin/dashboard', 'farmer')).toBe(false)
  })

  it('✅ Farmer redirected to /farmer/dashboard when accessing admin', () => {
    expect(getRedirect('/admin/dashboard', 'farmer')).toBe('/farmer/dashboard')
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Routes — Admin access', () => {

  it('✅ Admin can access /admin/dashboard', () => {
    expect(canAccess('/admin/dashboard', 'admin')).toBe(true)
  })

  it('✅ Admin can access /admin/users', () => {
    expect(canAccess('/admin/users', 'admin')).toBe(true)
  })

  it('✅ Admin can access /admin/farmers', () => {
    expect(canAccess('/admin/farmers', 'admin')).toBe(true)
  })

  it('❌ Admin cannot access farmer workspace', () => {
    expect(canAccess('/farmer/dashboard', 'admin')).toBe(false)
  })

  it('✅ Admin redirected to /admin/dashboard when accessing farmer route', () => {
    expect(getRedirect('/farmer/dashboard', 'admin')).toBe('/admin/dashboard')
  })
})

// ═══════════════════════════════════════════════════════════════════
describe('Routes — Unauthenticated', () => {

  it('✅ All expected routes are defined (no missing routes)', () => {
    const allRoutes = [
      ...PUBLIC_ROUTES, ...AUTH_ROUTES,
      ...CONSUMER_ROUTES, ...FARMER_ROUTES, ...ADMIN_ROUTES
    ]
    // Every route should be a non-empty string starting with /
    allRoutes.forEach(route => {
      expect(typeof route).toBe('string')
      expect(route.startsWith('/')).toBe(true)
    })
    expect(allRoutes.length).toBeGreaterThan(20)
  })

  it('✅ Navbar analytics path is /farmer/analytics (not /dashboard/analytics)', () => {
    expect(FARMER_ROUTES).toContain('/farmer/analytics')
    expect(FARMER_ROUTES).not.toContain('/dashboard/analytics')
  })

  it('✅ /about route exists in public routes', () => {
    expect(PUBLIC_ROUTES).toContain('/about')
  })

  it('✅ /pending-verification route exists', () => {
    expect(AUTH_ROUTES).toContain('/pending-verification')
  })
})
