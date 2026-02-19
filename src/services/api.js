const API_URL = 'http://localhost:5000/api';

class ApiService {
  // Get auth token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Set auth token
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Remove auth token
  removeToken() {
    localStorage.removeItem('token');
  }

  // Get user data
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Set user data
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Remove user data
  removeUser() {
    localStorage.removeItem('user');
  }

  // Register new user
  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (data.success) {
      this.setToken(data.token);
      this.setUser(data.user);
    }
    
    return data;
  }

  // Login user
  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.success) {
      this.setToken(data.token);
      this.setUser(data.user);
    }
    
    return data;
  }

  // Logout user
  logout() {
    this.removeToken();
    this.removeUser();
  }

  // Save test score
  async saveScore(scoreData) {
    const token = this.getToken();
    
    const response = await fetch(`${API_URL}/scores/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(scoreData),
    });

    return await response.json();
  }

  // Get test history
  async getHistory(page = 1, limit = 10) {
    const token = this.getToken();
    
    const response = await fetch(`${API_URL}/scores/history?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  }

  // Get user statistics
  async getStatistics() {
    const token = this.getToken();
    
    const response = await fetch(`${API_URL}/scores/statistics`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  }

  // Get leaderboard
  async getLeaderboard(limit = 10) {
    const response = await fetch(`${API_URL}/scores/leaderboard?limit=${limit}`);
    return await response.json();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new ApiService();
