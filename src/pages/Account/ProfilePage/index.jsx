// ProfilePage.jsx - Componente principal
import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import ProfileContent from './ProfileContent';

const ProfilePage = () => {
  // Estado para los datos del usuario (simulado)
  const [userData, setUserData] = useState({
    username: "McPeMauri",
    displayName: "Mauricio Martínez",
    avatar: "Aatrox",
    banner: "Aatrox",
    bio: "Main de mid desde la temporada 3. Especialista en campeones de control.",
    mainRole: "Midlane",
    secondaryRole: "Support",
    favoriteChampions: ["Ahri", "Lux", "Syndra", "Leona", "Orianna"],
    socialLinks: {
      discord: "SummonerPro#1234",
      twitch: "twitch.tv/summonerpro",
      opgg: "op.gg/summoner/userName=SummonerPro"
    },
    registeredDate: "Mayo 2022",
    lastLogin: "Hace 2 días"
  });

  // Estado para pestañas
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <section>
      <h1 className="text-3xl comic-title mb-6">Mi Perfil</h1>
      
      <ProfileHeader userData={userData} />
      
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <ProfileContent activeTab={activeTab} userData={userData} />
    </section>
  );
};

export default ProfilePage;
