<template>
  <div class="instagram-stalker animate-fade-in">
    <!-- Header -->
    <div class="page-header glass">
      <div class="header-icon">
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
      <div class="header-content">
        <h1>Instagram Stalker</h1>
        <p>Dapatkan informasi profil Instagram dari username yang diinginkan</p>
      </div>
    </div>

    <!-- Search Form -->
    <div class="search-section glass">
      <form @submit.prevent="searchUser" class="search-form">
        <div class="input-wrapper">
          <span class="input-prefix">@</span>
          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username Instagram"
            class="search-input input-dark"
            :disabled="loading"
          />
        </div>
        <button
          type="submit"
          class="search-btn btn-primary"
          :disabled="loading || !username.trim()"
        >
          <span v-if="!loading">Cari Profil</span>
          <span v-else class="loading-text">
            <svg
              class="spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
              />
            </svg>
            Mencari...
          </span>
        </button>
      </form>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message glass">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9L9 15M9 9L15 15" />
      </svg>
      <p>{{ error }}</p>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="profile-skeleton glass">
      <div class="skeleton-header">
        <div class="skeleton-avatar skeleton"></div>
        <div class="skeleton-info">
          <div class="skeleton-line skeleton" style="width: 60%"></div>
          <div class="skeleton-line skeleton" style="width: 40%"></div>
        </div>
      </div>
      <div class="skeleton-stats">
        <div class="skeleton-stat skeleton"></div>
        <div class="skeleton-stat skeleton"></div>
        <div class="skeleton-stat skeleton"></div>
      </div>
      <div class="skeleton-bio">
        <div class="skeleton-line skeleton" style="width: 100%"></div>
        <div class="skeleton-line skeleton" style="width: 80%"></div>
        <div class="skeleton-line skeleton" style="width: 60%"></div>
      </div>
    </div>

    <!-- Result -->
    <div v-if="result && !loading" class="profile-result">
      <!-- Profile Card -->
      <div class="profile-card glass card-hover">
        <div class="profile-header">
          <div class="profile-avatar">
            <img
              :src="result.profile_pic_url_hd || result.profile_pic"
              :alt="result.username"
            />
            <button
              @click="downloadAvatar"
              class="download-avatar-btn"
              title="Download Avatar"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 15M12 15L17 10M12 15V3"
                />
              </svg>
            </button>
          </div>
          <div class="profile-info">
            <div class="profile-name-row">
              <h2>{{ result.full_name || result.username }}</h2>
              <span
                v-if="result.is_verified"
                class="verified-badge"
                title="Verified"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M9 12L11 14L15 10M12 3L13.45 5.73L16.5 5.86L17.5 8.67L20 10.5L19.14 13.5L20 16.5L17.5 18.33L16.5 21.14L13.45 21.27L12 24L10.55 21.27L7.5 21.14L6.5 18.33L4 16.5L4.86 13.5L4 10.5L6.5 8.67L7.5 5.86L10.55 5.73L12 3Z"
                  />
                </svg>
              </span>
              <span
                v-if="result.is_private"
                class="private-badge"
                title="Private Account"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path
                    d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11"
                  />
                </svg>
              </span>
            </div>
            <p class="profile-username">@{{ result.username }}</p>
            <p v-if="result.category" class="profile-category">
              {{ result.category }}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-number">{{
              formatNumber(result.media_count || result.posts || 0)
            }}</span>
            <span class="stat-label">Posts</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{
              formatNumber(result.follower_count || result.followers || 0)
            }}</span>
            <span class="stat-label">Followers</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{
              formatNumber(result.following_count || result.following || 0)
            }}</span>
            <span class="stat-label">Following</span>
          </div>
        </div>

        <!-- Bio -->
        <div v-if="result.biography || result.bio" class="profile-bio">
          <h3>Bio</h3>
          <p>{{ result.biography || result.bio }}</p>
        </div>

        <!-- Additional Info -->
        <div class="profile-details">
          <div v-if="result.external_url" class="detail-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6897C16.4231 14.4391 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.4131 2.55918 13.47 3.47L11.75 5.18"
              />
              <path
                d="M14 11C13.5705 10.4259 13.0226 9.9509 12.3934 9.60707C11.7642 9.26324 11.0685 9.05886 10.3534 9.00765C9.63821 8.95643 8.92041 9.05961 8.24866 9.3103C7.57691 9.56099 6.96689 9.95304 6.46 10.46L3.46 13.46C2.54918 14.403 2.04519 15.6661 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
              />
            </svg>
            <a :href="result.external_url" target="_blank" rel="noopener">{{
              result.external_url
            }}</a>
          </div>
          <div v-if="result.is_business_account" class="detail-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
              />
              <path
                d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
              />
            </svg>
            <span>Business Account</span>
          </div>
        </div>
      </div>

      <!-- Raw Data Toggle -->
      <div class="raw-data-section glass">
        <button @click="showRawData = !showRawData" class="raw-data-toggle">
          <span>{{ showRawData ? "Hide" : "Show" }} Raw Data</span>
          <svg
            :class="{ rotated: showRawData }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 9L12 16L5 9" />
          </svg>
        </button>
        <transition name="slide">
          <div v-if="showRawData" class="raw-data-content">
            <pre>{{ JSON.stringify(result, null, 2) }}</pre>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { instagramStalker } from "../services/api";

const username = ref("");
const loading = ref(false);
const error = ref("");
const result = ref(null);
const showRawData = ref(false);

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const searchUser = async () => {
  if (!username.value.trim()) return;

  loading.value = true;
  error.value = "";
  result.value = null;

  try {
    const response = await instagramStalker(username.value.trim());

    // Handle different response structures
    if (response.data) {
      result.value = response.data;
    } else if (response.result) {
      result.value = response.result;
    } else {
      result.value = response;
    }
  } catch (err) {
    error.value =
      err.message ||
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi.";
    console.error("Search error:", err);
  } finally {
    loading.value = false;
  }
};

const downloadAvatar = async () => {
  if (!result.value) return;

  const imageUrl = result.value.profile_pic_url_hd || result.value.profile_pic;
  if (!imageUrl) return;

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.value.username}_avatar.jpg`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error("Download error:", err);
    window.open(imageUrl, "_blank");
  }
};
</script>

<style scoped>
.instagram-stalker {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
}

.header-icon {
  width: 56px;
  height: 56px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    #f09433,
    #e6683c,
    #dc2743,
    #cc2366,
    #bc1888
  );
  flex-shrink: 0;
}

.header-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.header-content h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.header-content p {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.search-section {
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
}

.search-form {
  display: flex;
  gap: 1rem;
}

.input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 1rem;
  color: var(--color-text-muted);
  font-weight: 500;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.25rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: var(--color-text-primary);
}

.search-btn {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spin {
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.error-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.profile-skeleton {
  padding: 1.5rem;
  border-radius: 1rem;
}

.skeleton-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.skeleton-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.skeleton-line {
  height: 20px;
  border-radius: 0.25rem;
}

.skeleton-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.skeleton-stat {
  flex: 1;
  height: 60px;
  border-radius: 0.5rem;
}

.skeleton-bio {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-card {
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.profile-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: linear-gradient(var(--color-dark-700), var(--color-dark-700))
      padding-box,
    linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)
      border-box;
}

.download-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.download-avatar-btn:hover {
  background: var(--color-primary-dark);
  transform: scale(1.1);
}

.download-avatar-btn svg {
  width: 16px;
  height: 16px;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.profile-name-row h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.verified-badge {
  color: #3b82f6;
  display: flex;
  align-items: center;
}

.verified-badge svg {
  width: 22px;
  height: 22px;
}

.private-badge {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
}

.private-badge svg {
  width: 18px;
  height: 18px;
}

.profile-username {
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

.profile-category {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.profile-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-dark-700);
  border-radius: 0.75rem;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.profile-bio {
  margin-bottom: 1.5rem;
}

.profile-bio h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.profile-bio p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  white-space: pre-wrap;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.detail-item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.detail-item a {
  color: var(--color-primary);
  text-decoration: none;
  word-break: break-all;
}

.detail-item a:hover {
  text-decoration: underline;
}

.raw-data-section {
  border-radius: 0.75rem;
  overflow: hidden;
}

.raw-data-toggle {
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.raw-data-toggle:hover {
  color: var(--color-text-primary);
}

.raw-data-toggle svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.raw-data-toggle svg.rotated {
  transform: rotate(180deg);
}

.raw-data-content {
  padding: 0 1.5rem 1.5rem;
}

.raw-data-content pre {
  background: var(--color-dark-900);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
}

@media (max-width: 640px) {
  .search-form {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
    justify-content: center;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-name-row {
    justify-content: center;
  }

  .profile-stats {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--color-dark-800);
  }

  .stat-number {
    font-size: 1.25rem;
  }
}
</style>
