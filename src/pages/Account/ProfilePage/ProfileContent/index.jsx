// components/ProfileContent.jsx
import ProfileInfo from './ProfileInfo'
import ChampionsSection from './ChampionSection'
import SettingsSection from './SettingsSection'

const ProfileContent = ({ activeTab, userData }) => {
  return (
    <div className="comic-border bg-base-100 p-6">
      {activeTab === 'profile' && <ProfileInfo />}
      {activeTab === 'champions' && (
        <ChampionsSection champions={userData.favoriteChampions} />
      )}
      {activeTab === 'settings' && <SettingsSection />}
    </div>
  )
}

export default ProfileContent
