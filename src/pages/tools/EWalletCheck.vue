<template>
  <div class="ewallet-check animate-fade-in">
    <!-- Header -->
    <div class="page-header glass">
      <div class="header-icon">
        <i class="fas fa-wallet"></i>
      </div>
      <div class="header-content">
        <h1>E-Wallet Name Check</h1>
        <p>Cek nama pemilik akun e-wallet berdasarkan nomor telepon</p>
      </div>
    </div>

    <!-- Search Form -->
    <div class="search-section glass">
      <form @submit.prevent="checkAccount" class="search-form">
        <div class="form-group">
          <label>Pilih E-Wallet</label>
          <div class="select-wrapper">
            <select
              v-model="selectedBank"
              class="select-input input-dark"
              :disabled="loading"
            >
              <option value="" disabled>Pilih e-wallet...</option>
              <option
                v-for="bank in ewalletList"
                :key="bank.value"
                :value="bank.value"
              >
                {{ bank.label }}
              </option>
            </select>
            <i class="fas fa-chevron-down select-arrow"></i>
          </div>
        </div>
        <div class="form-group">
          <label>Nomor Telepon</label>
          <div class="input-wrapper">
            <i class="fas fa-phone input-icon"></i>
            <input
              v-model="accountNumber"
              type="text"
              placeholder="Contoh: 08123456789"
              class="search-input input-dark"
              :disabled="loading"
            />
          </div>
        </div>
        <button
          type="submit"
          class="search-btn btn-primary"
          :disabled="loading || !selectedBank || !accountNumber.trim()"
        >
          <span v-if="!loading">
            <i class="fas fa-search"></i>
            Cek Akun
          </span>
          <span v-else class="loading-text">
            <i class="fas fa-spinner fa-spin"></i>
            Mencari...
          </span>
        </button>
      </form>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message glass">
      <i class="fas fa-times-circle"></i>
      <div class="error-content">
        <p class="error-title">{{ error.message || "Terjadi kesalahan" }}</p>
        <p v-if="error.result?.error_message" class="error-detail">
          {{ error.result.error_message }}
        </p>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="result-skeleton glass">
      <div class="skeleton-icon skeleton"></div>
      <div class="skeleton-info">
        <div class="skeleton-line skeleton" style="width: 60%"></div>
        <div class="skeleton-line skeleton" style="width: 40%"></div>
      </div>
    </div>

    <!-- Result -->
    <div
      v-if="result && !loading && result.success"
      class="result-card glass card-hover"
    >
      <div class="result-header">
        <div class="result-icon success">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="result-info">
          <p class="result-label">Nama Pemilik Akun</p>
          <h2 class="result-name">
            {{ result.result?.accountName || result.accountName || "N/A" }}
          </h2>
        </div>
      </div>
      <div class="result-details">
        <div class="detail-row">
          <span class="detail-label">
            <i class="fas fa-wallet"></i>
            E-Wallet
          </span>
          <span class="detail-value">{{ getEwalletLabel(result.bank) }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">
            <i class="fas fa-phone"></i>
            Nomor
          </span>
          <span class="detail-value">{{ result.accountNumber }}</span>
        </div>
      </div>
    </div>

    <!-- Raw Data Toggle -->
    <div v-if="result && !loading" class="raw-data-section glass">
      <button @click="showRawData = !showRawData" class="raw-data-toggle">
        <span>{{ showRawData ? "Hide" : "Show" }} Raw Data</span>
        <i class="fas fa-chevron-down" :class="{ rotated: showRawData }"></i>
      </button>
      <transition name="slide">
        <div v-if="showRawData" class="raw-data-content">
          <pre>{{ JSON.stringify(result, null, 2) }}</pre>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { checkEWalletName } from "../../services/api";

const selectedBank = ref("");
const accountNumber = ref("");
const loading = ref(false);
const error = ref(null);
const result = ref(null);
const showRawData = ref(false);

const ewalletList = [
  { value: "dana", label: "DANA" },
  { value: "gopay", label: "GoPay" },
  { value: "ovo", label: "OVO" },
  { value: "shopeepay", label: "ShopeePay" },
  { value: "linkaja", label: "LinkAja" },
  { value: "isaku", label: "iSaku" },
  { value: "astrapay", label: "AstraPay" },
];

const getEwalletLabel = (value) => {
  const ewallet = ewalletList.find((e) => e.value === value);
  return ewallet ? ewallet.label : value?.toUpperCase();
};

const checkAccount = async () => {
  if (!selectedBank.value || !accountNumber.value.trim()) return;

  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    const response = await checkEWalletName(
      selectedBank.value,
      accountNumber.value.trim()
    );

    if (response.success) {
      result.value = response;
    } else {
      error.value = response;
    }
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.ewallet-check {
  max-width: 600px;
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
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  flex-shrink: 0;
  font-size: 1.5rem;
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

/* Search Section */
.search-section {
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.select-wrapper {
  position: relative;
}

.select-input {
  width: 100%;
  padding: 0.875rem 2.5rem 0.875rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: var(--color-text-primary);
  appearance: none;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
  font-size: 0.75rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
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
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
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

/* Error Message */
.error-message {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.error-message i {
  font-size: 1.25rem;
  margin-top: 0.125rem;
}

.error-title {
  font-weight: 600;
}

.error-detail {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

/* Loading Skeleton */
.result-skeleton {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
}

.skeleton-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 20px;
  border-radius: 0.25rem;
}

/* Result Card */
.result-card {
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.result-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.result-icon.success {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.result-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.result-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-dark-700);
  border-radius: 0.75rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.detail-label i {
  width: 16px;
  text-align: center;
}

.detail-value {
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Raw Data */
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

.raw-data-toggle i {
  transition: transform 0.2s ease;
}

.raw-data-toggle i.rotated {
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

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
