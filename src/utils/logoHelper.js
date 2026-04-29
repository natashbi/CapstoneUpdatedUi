// Logo utility for custom branding
export const getLogoUrl = () => {
  // Try to load custom logo from public folder
  // If not found, return null to use default icon
  return '/logos/logo.png';
};

export const LogoImage = ({ className = '' }) => {
  const [hasLogo, setHasLogo] = window.React?.useState?.(true) || [true, () => {}];

  if (!hasLogo) return null;

  return (
    <img
      src={getLogoUrl()}
      alt="WeCare Logo"
      className={className}
      onError={() => setHasLogo(false)}
    />
  );
};
