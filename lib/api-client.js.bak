// API Client for Ray Egypt System
const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token') || null;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Clear token (logout)
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Get headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Authentication methods
  async login(credentials) {
    const data = await this.post('/auth/login', credentials);
    this.setToken(data.token);
    return data;
  }

  async register(userData) {
    const data = await this.post('/auth/register', userData);
    this.setToken(data.token);
    return data;
  }

  async logout() {
    this.clearToken();
  }

  async getProfile() {
    return this.get('/auth/profile');
  }

  async updateProfile(userData) {
    return this.put('/auth/profile', userData);
  }

  // Companies methods
  async getCompanies(params = {}) {
    return this.get('/companies', params);
  }

  async getCompany(id) {
    return this.get(`/companies/${id}`);
  }

  async createCompany(companyData) {
    return this.post('/companies', companyData);
  }

  async updateCompany(id, companyData) {
    return this.put(`/companies/${id}`, companyData);
  }

  async deleteCompany(id) {
    return this.delete(`/companies/${id}`);
  }

  async getIndustries() {
    return this.get('/companies/industries/all');
  }

  // Customers methods
  async getCustomers(params = {}) {
    return this.get('/customers', params);
  }

  async getCustomer(id) {
    return this.get(`/customers/${id}`);
  }

  async createCustomer(customerData) {
    return this.post('/customers', customerData);
  }

  async updateCustomer(id, customerData) {
    return this.put(`/customers/${id}`, customerData);
  }

  async deleteCustomer(id) {
    return this.delete(`/customers/${id}`);
  }

  async getCustomerStats(params = {}) {
    return this.get('/customers/stats/summary', params);
  }

  // Products methods
  async getProducts(params = {}) {
    return this.get('/products', params);
  }

  async getProduct(id) {
    return this.get(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.post('/products', productData);
  }

  async updateProduct(id, productData) {
    return this.put(`/products/${id}`, productData);
  }

  async deleteProduct(id) {
    return this.delete(`/products/${id}`);
  }

  async getProductStats() {
    return this.get('/products/stats/summary');
  }

  // Invoices methods
  async getInvoices(params = {}) {
    return this.get('/invoices', params);
  }

  async getInvoice(id) {
    return this.get(`/invoices/${id}`);
  }

  async createInvoice(invoiceData) {
    return this.post('/invoices', invoiceData);
  }

  async updateInvoice(id, invoiceData) {
    return this.put(`/invoices/${id}`, invoiceData);
  }

  async deleteInvoice(id) {
    return this.delete(`/invoices/${id}`);
  }

  async addPayment(invoiceId, paymentData) {
    return this.post(`/invoices/${invoiceId}/payments`, paymentData);
  }

  async getInvoiceStats(params = {}) {
    return this.get('/invoices/stats/summary', params);
  }

  // Dashboard methods
  async getDashboardStats() {
    try {
      const [customerStats, productStats, invoiceStats] = await Promise.all([
        this.getCustomerStats(),
        this.getProductStats(),
        this.getInvoiceStats()
      ]);

      return {
        customers: customerStats.statistics,
        products: productStats.statistics,
        invoices: invoiceStats.statistics
      };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw error;
    }
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Export for use in components
export default apiClient;

// Export class for creating instances if needed
export { ApiClient };
