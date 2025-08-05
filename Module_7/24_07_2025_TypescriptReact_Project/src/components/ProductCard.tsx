import React from 'react';

interface CardProps {
  title: string;
  property1: number;
  property2: string;
  className?: string;
}

const ProductCard: React.FC<CardProps> = ({ 
  title, 
  property1, 
  property2, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {title}
      </h2>
      <p className="text-gray-600 mb-3 leading-relaxed">
        {property1}
      </p>
      <p className="text-gray-600 leading-relaxed">
        {property2}
      </p>
    </div>
  );
};

export default ProductCard;