// components/ProfileHeader.jsx
import RoleInfo from './RoleInfo'

const ProfileHeader = ({ userData }) => {
  return (
    <div className="comic-border bg-base-100 mb-8">
      <div className="relative h-40 bg-primary">
        {/* Banner temático de LoL */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Avatar basado en ícono de invocador */}
        <div className="absolute -bottom-16 left-8 comic-border bg-base-100 p-1">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${userData.avatar}.png`}
            alt="Avatar de invocador"
            className="w-32 h-32 object-cover"
          />
        </div>
      </div>

      {/* Información del perfil */}
      <div className="pt-20 pb-6 px-6">
        <div className="mb-4">
          <h2 className="comic-title text-2xl text-base-content">
            {userData.displayName}
          </h2>
          <p className="text-neutral opacity-80">@{userData.username}</p>
        </div>

        <p className="mb-4">{userData.bio}</p>

        <RoleInfo
          mainRole={userData.mainRole}
          secondaryRole={userData.secondaryRole}
        />
      </div>
    </div>
  )
}

export default ProfileHeader
