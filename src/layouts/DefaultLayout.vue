<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar glass">
      <!-- Logo -->
      <div class="sidebar-header">
        <div class="logo-container">
          <div class="logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="url(#gradient)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="url(#gradient)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="url(#gradient)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient id="gradient" x1="2" y1="2" x2="22" y2="22">
                  <stop stop-color="#6366f1" />
                  <stop offset="1" stop-color="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="logo-text">
            <h1 class="gradient-text">API Tools</h1>
            <p>Dashboard</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <p class="nav-section-title">Main Menu</p>

          <!-- Dashboard Link -->
          <router-link
            to="/"
            class="nav-item"
            :class="{ active: $route.path === '/' }"
          >
            <i class="fas fa-home nav-icon"></i>
            <span>Dashboard</span>
          </router-link>

          <!-- Stalker Dropdown -->
          <div class="nav-dropdown">
            <button
              class="nav-item nav-dropdown-toggle"
              :class="{ active: isStalkerActive, open: stalkerOpen }"
              @click="stalkerOpen = !stalkerOpen"
            >
              <i class="fas fa-eye nav-icon"></i>
              <span>Stalker</span>
              <i
                class="fas fa-chevron-down dropdown-arrow"
                :class="{ rotated: stalkerOpen }"
              ></i>
            </button>
            <transition name="dropdown">
              <div v-if="stalkerOpen" class="nav-dropdown-menu">
                <router-link
                  to="/instagram-stalker"
                  class="nav-item nav-subitem"
                  :class="{ active: $route.path === '/instagram-stalker' }"
                >
                  <i class="fab fa-instagram nav-icon"></i>
                  <span>Instagram</span>
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Tools Dropdown -->
          <div class="nav-dropdown">
            <button
              class="nav-item nav-dropdown-toggle"
              :class="{ active: isToolsActive, open: toolsOpen }"
              @click="toolsOpen = !toolsOpen"
            >
              <i class="fas fa-tools nav-icon"></i>
              <span>Tools</span>
              <i
                class="fas fa-chevron-down dropdown-arrow"
                :class="{ rotated: toolsOpen }"
              ></i>
            </button>
            <transition name="dropdown">
              <div v-if="toolsOpen" class="nav-dropdown-menu">
                <router-link
                  to="/e-wallet-check"
                  class="nav-item nav-subitem"
                  :class="{ active: $route.path === '/e-wallet-check' }"
                >
                  <i class="fas fa-wallet nav-icon"></i>
                  <span>E-Wallet Check</span>
                </router-link>
              </div>
            </transition>
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div class="sidebar-footer">
        <div class="footer-info">
          <p class="footer-version">v1.0.0</p>
          <p class="footer-copyright">© 2025 Mari Partner</p>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Bar -->
      <header class="topbar glass">
        <div class="topbar-left">
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="page-title">
            <h2>{{ $route.meta.title }}</h2>
          </div>
        </div>
        <div class="topbar-right">
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>API Connected</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="page-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Mobile Overlay -->
    <div
      class="mobile-overlay"
      :class="{ active: mobileMenuOpen }"
      @click="mobileMenuOpen = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Stalker submenu paths
const stalkerPaths = ["/instagram-stalker"];

// Tools submenu paths
const toolsPaths = ["/e-wallet-check"];

// Check if any stalker page is active
const isStalkerActive = computed(() => stalkerPaths.includes(route.path));

// Check if any tools page is active
const isToolsActive = computed(() => toolsPaths.includes(route.path));

// Dropdown state - auto open if active
const stalkerOpen = ref(isStalkerActive.value);
const toolsOpen = ref(isToolsActive.value);

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 260px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 100%;
  height: 100%;
}

.logo-text h1 {
  font-size: 1.25rem;
  font-weight: 700;
}

.logo-text p {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.nav-section-title {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  padding-left: 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.875rem;
  border-radius: 0.625rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(99, 102, 241, 0.08);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15),
    rgba(139, 92, 246, 0.15)
  );
  color: var(--color-text-primary);
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.nav-icon {
  width: 20px;
  font-size: 1rem;
  text-align: center;
  flex-shrink: 0;
  opacity: 0.85;
}

/* Dropdown Menu */
.nav-dropdown {
  margin-bottom: 0.375rem;
}

.nav-dropdown-toggle {
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  justify-content: flex-start;
}

.nav-dropdown-toggle.open {
  background: rgba(99, 102, 241, 0.05);
}

.dropdown-arrow {
  font-size: 0.75rem;
  margin-left: auto;
  opacity: 0.6;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.nav-dropdown-toggle:hover .dropdown-arrow {
  opacity: 1;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.nav-dropdown-menu {
  padding-left: 0;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.nav-subitem {
  padding-left: 2.5rem;
  font-size: 0.8125rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 0.75rem;
  margin-bottom: 0;
  margin-left: 0;
  border-radius: 0.5rem;
}

.nav-subitem:hover {
  background: rgba(99, 102, 241, 0.08);
}

.nav-subitem.active {
  background: rgba(99, 102, 241, 0.12);
  color: var(--color-text-primary);
}

.nav-subitem .nav-icon {
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Dropdown Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  max-height: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  max-height: 200px;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-info {
  text-align: center;
}

.footer-version {
  font-size: 0.75rem;
  color: var(--color-primary);
}

.footer-copyright {
  font-size: 0.65rem;
  color: var(--color-text-muted);
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Topbar */
.topbar {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background: var(--color-dark-700);
  color: var(--color-text-primary);
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
}

.page-title h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #22c55e;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse-slow 2s ease-in-out infinite;
}

/* Page Content */
.page-content {
  flex: 1;
  padding: 1.5rem;
}

/* Mobile Overlay */
.mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-overlay.active {
  opacity: 1;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-overlay {
    display: block;
    pointer-events: none;
  }

  .mobile-overlay.active {
    pointer-events: auto;
  }
}
</style>
