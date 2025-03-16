// components/SocialLinks.jsx
const SocialLinks = ({ links }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(links).map(([platform, Link]) => (
        <a key={platform} href="#" className="btn btn-sm btn-primary">
          {platform === 'discord'
            ? '📱 Discord'
            : platform === 'twitch'
            ? '📺 Twitch'
            : platform === 'opgg'
            ? '📊 OP.GG'
            : platform}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
