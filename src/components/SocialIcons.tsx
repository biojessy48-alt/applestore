import React from 'react';
import { SocialLinks } from '../types';

interface SocialIconsProps {
  socialLinks?: SocialLinks;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'header' | 'footer' | 'floating';
}

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.65 6.34 6.34 0 0 0 9.35 22a6.3 6.3 0 0 0 6.31-6.31V9.5a8.16 8.16 0 0 0 4.93 1.63v-3.44a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.62.77-1.62 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.156 4.221 4.299-1.127zm11.125-6.606c-.29-.146-1.715-.847-1.98-.943-.266-.097-.459-.146-.653.146-.193.292-.749.943-.918 1.137-.169.193-.338.218-.628.073-.29-.146-1.226-.452-2.336-1.442-.864-.771-1.447-1.724-1.616-2.014-.169-.292-.018-.45.127-.594.13-.13.29-.338.435-.508.145-.17.193-.292.29-.484.097-.193.048-.363-.024-.508-.073-.146-.653-1.572-.895-2.152-.236-.566-.476-.489-.653-.498-.17-.008-.363-.01-.556-.01-.193 0-.508.073-.774.363-.266.292-1.016.992-1.016 2.42 0 1.427 1.04 2.808 1.185 3.002.145.193 2.049 3.128 4.964 4.387.693.3 1.234.48 1.656.613.696.22 1.329.189 1.83.114.558-.083 1.715-.701 1.957-1.378.242-.677.242-1.258.17-1.378-.073-.121-.266-.193-.556-.338z"/>
  </svg>
);

export const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const SocialIcons: React.FC<SocialIconsProps> = ({
  socialLinks,
  size = 'md',
  variant = 'header'
}) => {
  if (!socialLinks) return null;

  const { facebookUrl, instagramUrl, tiktokUrl, whatsappUrl, youtubeUrl } = socialLinks;

  const iconSizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const buttonSizeClass = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-2.5' : 'p-2';

  const items = [
    {
      name: 'Facebook',
      url: facebookUrl,
      icon: FacebookIcon,
      hoverClass: 'hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-blue-500/20'
    },
    {
      name: 'Instagram',
      url: instagramUrl,
      icon: InstagramIcon,
      hoverClass: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-rose-500 shadow-rose-500/20'
    },
    {
      name: 'TikTok',
      url: tiktokUrl,
      icon: TikTokIcon,
      hoverClass: 'hover:bg-black hover:text-cyan-400 hover:border-cyan-400 shadow-cyan-400/20'
    },
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      icon: WhatsAppIcon,
      hoverClass: 'hover:bg-emerald-500 hover:text-white hover:border-emerald-400 shadow-emerald-500/20'
    },
    {
      name: 'YouTube',
      url: youtubeUrl,
      icon: YoutubeIcon,
      hoverClass: 'hover:bg-red-600 hover:text-white hover:border-red-500 shadow-red-500/20'
    }
  ].filter(item => item.url && item.url.trim() !== '');

  if (items.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {items.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`تابعنا على ${item.name}`}
            className={`
              ${buttonSizeClass}
              rounded-xl transition-all duration-300 transform hover:-translate-y-0.5
              flex items-center justify-center shadow-sm
              ${variant === 'header' 
                ? 'bg-slate-800/80 text-slate-300 border border-slate-700/60' 
                : 'bg-slate-900 text-slate-300 border border-slate-800'
              }
              ${item.hoverClass}
            `}
          >
            <IconComponent className={iconSizeClass} />
          </a>
        );
      })}
    </div>
  );
};
