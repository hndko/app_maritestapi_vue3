<template>
  <div class="home-page animate-fade-in">
    <!-- Welcome Section -->
    <div class="welcome-section glass card-hover">
      <div class="welcome-content">
        <h1 class="welcome-title">
          Welcome to <span class="gradient-text">API Tools</span> Dashboard
        </h1>
        <p class="welcome-description">
          Kumpulan tools berbasis API yang siap digunakan. Pilih tool yang anda
          butuhkan dari menu di sebelah kiri.
        </p>
      </div>
      <div class="welcome-illustration">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="url(#grad1)"
            stroke-width="2"
            opacity="0.3"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            stroke="url(#grad1)"
            stroke-width="2"
            opacity="0.5"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            stroke="url(#grad1)"
            stroke-width="2"
            opacity="0.7"
          />
          <circle cx="100" cy="100" r="20" fill="url(#grad1)" opacity="0.9" />
          <defs>
            <linearGradient id="grad1" x1="20" y1="20" x2="180" y2="180">
              <stop stop-color="#6366f1" />
              <stop offset="1" stop-color="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats-grid">
      <div class="stat-card glass card-hover">
        <div class="stat-icon stat-icon-purple">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-info">
          <p class="stat-value">1</p>
          <p class="stat-label">Total APIs</p>
        </div>
      </div>

      <div class="stat-card glass card-hover">
        <div class="stat-icon stat-icon-blue">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M22 12H18L15 21L9 3L6 12H2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-info">
          <p class="stat-value">Active</p>
          <p class="stat-label">API Status</p>
        </div>
      </div>

      <div class="stat-card glass card-hover">
        <div class="stat-icon stat-icon-green">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M9 12L11 14L15 10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-info">
          <p class="stat-value">Ready</p>
          <p class="stat-label">System Status</p>
        </div>
      </div>
    </div>

    <!-- Available Tools -->
    <div class="tools-section">
      <h2 class="section-title">Available Tools</h2>
      <div class="tools-grid">
        <router-link to="/instagram-stalker" class="tool-card glass card-hover">
          <div class="tool-icon tool-icon-instagram">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="18" cy="6" r="1" fill="currentColor" />
            </svg>
          </div>
          <div class="tool-info">
            <h3>Instagram Stalker</h3>
            <p>Dapatkan informasi profil Instagram dari username target</p>
          </div>
          <div class="tool-arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Welcome Section */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.welcome-content {
  max-width: 60%;
}

.welcome-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.welcome-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.welcome-illustration {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
}

.welcome-illustration svg {
  width: 100%;
  height: 100%;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-icon-purple {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  color: #a78bfa;
}

.stat-icon-blue {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2),
    rgba(99, 102, 241, 0.2)
  );
  color: #60a5fa;
}

.stat-icon-green {
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.2),
    rgba(74, 222, 128, 0.2)
  );
  color: #4ade80;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Tools Section */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.tools-grid {
  display: grid;
  gap: 1rem;
}

.tool-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.tool-icon {
  width: 56px;
  height: 56px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tool-icon svg {
  width: 28px;
  height: 28px;
}

.tool-icon-instagram {
  background: linear-gradient(
    135deg,
    #f09433,
    #e6683c,
    #dc2743,
    #cc2366,
    #bc1888
  );
  color: white;
}

.tool-info {
  flex: 1;
}

.tool-info h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.tool-info p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.tool-arrow {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

.tool-arrow svg {
  width: 20px;
  height: 20px;
}

.tool-card:hover .tool-arrow {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column;
    text-align: center;
  }

  .welcome-content {
    max-width: 100%;
    margin-bottom: 1.5rem;
  }

  .welcome-illustration {
    width: 120px;
    height: 120px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
