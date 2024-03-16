  // services/authService.ts
  export const authService = {
    async login(username: string, password: string) {
      try {
        console.log('/Login');
        
        const response = await fetch('http://localhost:3001/api/users/login', {  // Spécifiez l'URL complète du backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: username,
            password: password
          })
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la connexion : ' + response.statusText);
        }
        
        const data = await response.json();
        return data.accessToken;
      } catch (error) {
        console.error('Erreur lors de la connexion : ', error);
        throw new Error('Erreur lors de la connexion : ' + error.message);
      }
    },

    async register(name: string, email: string, password: string) {
      try {
        const response = await fetch('http://localhost:3001/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de l\'inscription : ' + response.statusText);
        }
        
        const data = await response.json();
        return data.accessToken;
      } catch (error) {
        console.error('Erreur lors de l\'inscription : ', error);
        throw new Error('Erreur lors de l\'inscription : ' + error.message);
      }
    }
  };
