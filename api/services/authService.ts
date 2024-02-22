// services/authService.ts
export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Connexion réussie');
      } else {
        console.error('Erreur lors de la connexion : ', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
    }
  },

  logout() {
    localStorage.removeItem('token');
    console.log('Déconnexion réussie');
  },

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  },
};