import React from 'react';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, UserIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Types for different card variants
export type CardVariant = 'default' | 'elevated' | 'bordered' | 'gradient' | 'glass';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconPosition = 'top' | 'top-left' | 'top-right' | 'left' | 'right';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

// Action button configuration
export interface CardAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

// Badge configuration
export interface CardBadge {
  text: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

// Stat configuration for metric cards
export interface CardStat {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
}

// Main card props interface
export interface CardProps {
  // Content
  title?: string;
  subtitle?: string;
  description?: string;
  content?: React.ReactNode;
  
  // Icon configuration
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: IconPosition;
  iconSize?: IconSize;
  iconColor?: string;
  iconBackground?: boolean;
  
  // Image
  image?: string;
  imageAlt?: string;
  imagePosition?: 'top' | 'left' | 'right' | 'background';
  
  // Actions and interactions
  actions?: CardAction[];
  badges?: CardBadge[];
  clickable?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  
  // Stats (for metric cards)
  stats?: CardStat[];
  
  // Meta information
  author?: string;
  date?: string;
  location?: string;
  category?: string;
  
  // Styling
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  
  // States
  loading?: boolean;
  disabled?: boolean;
  selected?: boolean;
  
  // Layout
  horizontal?: boolean;
  fullHeight?: boolean;
}

// Helper function to get icon size classes
const getIconSizeClasses = (size: IconSize): string => {
  switch (size) {
    case 'sm': return 'h-4 w-4';
    case 'md': return 'h-6 w-6';
    case 'lg': return 'h-8 w-8';
    case 'xl': return 'h-12 w-12';
    default: return 'h-6 w-6';
  }
};

// Helper function to get card variant classes
const getVariantClasses = (variant: CardVariant): string => {
  switch (variant) {
    case 'elevated':
      return 'bg-white shadow-lg hover:shadow-xl border border-gray-100';
    case 'bordered':
      return 'bg-white border-2 border-gray-200 hover:border-gray-300';
    case 'gradient':
      return 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-md';
    case 'glass':
      return 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg';
    default:
      return 'bg-white shadow-md hover:shadow-lg border border-gray-200';
  }
};

// Helper function to get size classes
const getSizeClasses = (size: CardSize): string => {
  switch (size) {
    case 'sm': return 'p-4';
    case 'md': return 'p-6';
    case 'lg': return 'p-8';
    case 'xl': return 'p-10';
    default: return 'p-6';
  }
};

// Badge component
const Badge: React.FC<CardBadge> = ({ text, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}>
      {text}
    </span>
  );
};

// Action Button component
const ActionButton: React.FC<CardAction> = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  icon: Icon, 
  disabled = false 
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 disabled:bg-gray-50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed ${variantClasses[variant]}`}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {label}
    </button>
  );
};

// Stat component for metric cards
const StatItem: React.FC<CardStat> = ({ label, value, change, trend, icon: Icon }) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const TrendIcon = trend === 'up' ? ArrowTrendingUpIcon : trend === 'down' ? ArrowTrendingDownIcon : null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {Icon && <Icon className="h-5 w-5 text-gray-500 mr-2" />}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-semibold text-gray-900 mr-2">{value}</span>
        {change && trend && (
          <div className={`flex items-center text-sm ${trendColors[trend]}`}>
            {TrendIcon && <TrendIcon className="h-4 w-4 mr-1" />}
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Card Component
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  content,
  icon: Icon,
  iconPosition = 'top',
  iconSize = 'md',
  iconColor = 'text-gray-600',
  iconBackground = false,
  image,
  imageAlt,
  imagePosition = 'top',
  actions = [],
  badges = [],
  clickable = false,
  onClick,
  href,
  target,
  stats = [],
  author,
  date,
  location,
  category,
  variant = 'default',
  size = 'md',
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  loading = false,
  disabled = false,
  selected = false,
  horizontal = false,
  fullHeight = false,
}) => {
  // Base classes
  const baseClasses = `
    rounded-lg transition-all duration-200 
    ${getVariantClasses(variant)}
    ${getSizeClasses(size)}
    ${clickable || href ? 'cursor-pointer hover:scale-[1.02]' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
    ${fullHeight ? 'h-full' : ''}
    ${horizontal ? 'flex flex-row' : 'flex flex-col'}
    ${className}
  `;

  const iconClasses = `
    ${getIconSizeClasses(iconSize)} 
    ${iconColor}
    ${iconBackground ? 'p-2 bg-gray-100 rounded-full' : ''}
  `;

  // Handle click events
  const handleClick = () => {
    if (disabled) return;
    if (href) {
      if (target === '_blank') {
        window.open(href, '_blank');
      } else {
        window.location.href = href;
      }
    } else if (onClick) {
      onClick();
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={baseClasses}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  // Content wrapper for horizontal layout
  const ContentWrapper = ({ children }: { children: React.ReactNode }) => 
    horizontal ? <div className="flex-1">{children}</div> : <>{children}</>;

  return (
    <div 
      className={baseClasses}
      onClick={handleClick}
      role={clickable || href ? 'button' : undefined}
      tabIndex={clickable || href ? 0 : undefined}
    >
      {/* Background Image */}
      {image && imagePosition === 'background' && (
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-lg opacity-10"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Top Image */}
      {image && imagePosition === 'top' && !horizontal && (
        <div className="mb-4">
          <img 
            src={image} 
            alt={imageAlt || ''} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Left Image for horizontal layout */}
      {image && (imagePosition === 'left' || horizontal) && (
        <div className="mr-4 flex-shrink-0">
          <img 
            src={image} 
            alt={imageAlt || ''} 
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
      )}

      <ContentWrapper>
        {/* Header */}
        <div className={`mb-4 ${headerClassName}`}>
          {/* Icon at top positions */}
          {Icon && ['top', 'top-left', 'top-right'].includes(iconPosition) && (
            <div className={`mb-3 flex ${
              iconPosition === 'top' ? 'justify-center' :
              iconPosition === 'top-left' ? 'justify-start' : 'justify-end'
            }`}>
              <Icon className={iconClasses} />
            </div>
          )}

          {/* Title and Icon for left/right positions */}
          <div className="flex items-start justify-between">
            <div className="flex items-start flex-1">
              {Icon && iconPosition === 'left' && (
                <Icon className={`${iconClasses} mr-3 mt-1`} />
              )}
              
              <div className="flex-1">
                {/* Badges */}
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {badges.map((badge, index) => (
                      <Badge key={index} {...badge} />
                    ))}
                  </div>
                )}

                {/* Title */}
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {title}
                  </h3>
                )}

                {/* Subtitle */}
                {subtitle && (
                  <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
                )}

                {/* Category */}
                {category && (
                  <p className="text-xs text-blue-600 font-medium mb-2">{category}</p>
                )}
              </div>
            </div>

            {Icon && iconPosition === 'right' && (
              <Icon className={`${iconClasses} ml-3`} />
            )}
          </div>

          {/* Meta information */}
          {(author || date || location) && (
            <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
              {author && (
                <div className="flex items-center">
                  <UserIcon className="h-3 w-3 mr-1" />
                  {author}
                </div>
              )}
              {date && (
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {date}
                </div>
              )}
              {location && (
                <div className="flex items-center">
                  <MapPinIcon className="h-3 w-3 mr-1" />
                  {location}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 ${contentClassName}`}>
          {/* Description */}
          {description && (
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {description}
            </p>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <div className="space-y-3 mb-4">
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} />
              ))}
            </div>
          )}

          {/* Custom Content */}
          {content && <div className="mb-4">{content}</div>}
        </div>

        {/* Footer */}
        {actions.length > 0 && (
          <div className={`flex flex-wrap gap-2 mt-4 ${footerClassName}`}>
            {actions.map((action, index) => (
              <ActionButton key={index} {...action} />
            ))}
          </div>
        )}
      </ContentWrapper>

      {/* Right Image */}
      {image && imagePosition === 'right' && !horizontal && (
        <div className="ml-4 flex-shrink-0">
          <img 
            src={image} 
            alt={imageAlt || ''} 
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

// Example usage component
// const CardExamples = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
//           Custom Card Components
//         </h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Basic Card */}
//           <Card
//             title="Basic Card"
//             description="This is a simple card with basic content and styling."
//             icon={Heart}
//             iconPosition="top"
//             actions={[
//               { label: 'View Details', onClick: () => alert('View clicked!') }
//             ]}
//           />

//           {/* Metric Card */}
//           <Card
//             title="Sales Overview"
//             variant="elevated"
//             icon={DollarSign}
//             iconPosition="top-left"
//             iconBackground={true}
//             stats={[
//               { label: 'Revenue', value: '$12,345', change: '+15%', trend: 'up', icon: TrendingUp },
//               { label: 'Orders', value: '156', change: '+8%', trend: 'up', icon: ShoppingCart },
//               { label: 'Customers', value: '89', change: '-2%', trend: 'down', icon: Users },
//             ]}
//           />

//           {/* Profile Card */}
//           <Card
//             title="John Doe"
//             subtitle="Senior Developer"
//             description="Full-stack developer with 5+ years of experience in React and Node.js."
//             image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
//             imageAlt="John Doe"
//             author="Engineering Team"
//             date="Joined 2020"
//             location="San Francisco, CA"
//             badges={[
//               { text: 'Senior', variant: 'primary' },
//               { text: 'Remote', variant: 'success' }
//             ]}
//             actions={[
//               { label: 'Contact', onClick: () => {}, icon: Mail, variant: 'primary' },
//               { label: 'Profile', onClick: () => {}, icon: User, variant: 'secondary' }
//             ]}
//           />

//           {/* Product Card */}
//           <Card
//             title="Wireless Headphones"
//             subtitle="$299.99"
//             description="Premium quality wireless headphones with noise cancellation and 30-hour battery life."
//             image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
//             imageAlt="Wireless Headphones"
//             category="Electronics"
//             variant="bordered"
//             badges={[
//               { text: 'Best Seller', variant: 'warning' },
//               { text: 'Free Shipping', variant: 'success' }
//             ]}
//             actions={[
//               { label: 'Add to Cart', onClick: () => {}, icon: ShoppingCart, variant: 'primary' },
//               { label: 'Wishlist', onClick: () => {}, icon: Heart, variant: 'ghost' }
//             ]}
//           />

//           {/* Activity Card */}
//           <Card
//             title="System Activity"
//             icon={Activity}
//             iconPosition="top-right"
//             variant="gradient"
//             content={
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center text-sm">
//                   <span>CPU Usage</span>
//                   <span className="font-medium">45%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span>Memory</span>
//                   <span className="font-medium">67%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
//                 </div>
//               </div>
//             }
//           />

//           {/* Achievement Card */}
//           <Card
//             title="Achievement Unlocked!"
//             subtitle="Coding Streak"
//             description="You've coded for 30 days straight. Keep up the great work!"
//             icon={Award}
//             iconPosition="top"
//             iconSize="xl"
//             iconColor="text-yellow-500"
//             variant="glass"
//             date="Today"
//             actions={[
//               { label: 'Share Achievement', onClick: () => {}, icon: Share2, variant: 'primary' }
//             ]}
//           />

//           {/* Horizontal Card */}
//           <Card
//             title="Blog Post"
//             subtitle="5 min read"
//             description="Learn how to build scalable React applications with TypeScript and best practices."
//             image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop"
//             imageAlt="Blog post"
//             horizontal={true}
//             author="Jane Smith"
//             date="2 days ago"
//             actions={[
//               { label: 'Read More', onClick: () => {}, icon: ExternalLink, variant: 'ghost' }
//             ]}
//           />

//           {/* Loading Card */}
//           <Card
//             loading={true}
//             size="lg"
//           />

//           {/* Interactive Card */}
//           <Card
//             title="Click Me!"
//             description="This card is clickable and will show an alert when clicked."
//             icon={ChevronRight}
//             iconPosition="right"
//             clickable={true}
//             onClick={() => alert('Card clicked!')}
//             variant="elevated"
//             selected={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default Card;