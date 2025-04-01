// components/ProfileContent.jsx
import ChampionsSection from './ChampionSection'

const ProfileContent = ({ activeTab, userData }) => {
  return (
    <div className="comic-border bg-base-100 p-6">
      <ChampionsSection champions={userData.favoriteChampions} />
    </div>
  )
}

export default ProfileContent
