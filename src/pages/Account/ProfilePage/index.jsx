import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      // Obtener token de autenticación del almacenamiento local
      const token = localStorage.getItem('token');
      
      // Configurar encabezados de autorización
      const config = {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      };

      // Realizar solicitud al backend
      const response = await axios.get('http://localhost:3000/profile/me', config);
      
      // Transformar datos para coincidir con el formato esperado por los componentes
      const transformedUserData = {
        username: response.data.riotProfile.summonerName,
        displayName: response.data.riotProfile.summonerName,
        avatar: response.data.riotProfile.iconId.toString(),
        banner: response.data.riotProfile.favoriteChampions[0]?.id || 'Desconocido',
        bio: "Invocador de League of Legends",
        mainRole: response.data.riotProfile.mainRoles[0] || "Desconocido",
        secondaryRole: response.data.riotProfile.mainRoles[1] || "Desconocido",
        favoriteChampions: response.data.riotProfile.favoriteChampions.map(champ => champ.id),
        summonerLevel: response.data.riotProfile.level,
        rank: "En desarrollo" // Necesitarás agregar lógica de ranking si es necesario
      };
      
      setUserData(transformedUserData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No se encontraron datos</div>;

  return (
    <section>
      <h1 className="text-3xl comic-title mb-6">Mi Perfil</h1>
      
      <ProfileHeader userData={userData} />
      
      <ProfileContent userData={userData} />
    </section>
  );
};

export default ProfilePage;