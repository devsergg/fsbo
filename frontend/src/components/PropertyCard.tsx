'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  square_footage: number;
  property_type: string;
  image_url: string;
  created_at: string;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFootage = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  // Get FSBO tag based on property ID for variety
  const getFSBOTag = (id: string) => {
    const tags = [
      'No Commission',
      'FSBO',
      'Direct from Owner',
      'No Agent Fees',
      'Save Thousands'
    ];
    return tags[parseInt(id) % tags.length];
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200">
        {/* Property Image */}
        <div className="relative h-48 bg-gray-200">
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            className="object-cover"
          />
          
          {/* FSBO Tag */}
          <div className="absolute top-3 left-3">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">
              {getFSBOTag(property.id)}
            </span>
          </div>

          {/* Save Button */}
          <button 
            className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1.5 transition-all duration-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg className="h-4 w-4 text-gray-600 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Property Details */}
        <div className="p-3">
          {/* Price */}
          <div className="text-xl font-bold text-gray-900 mb-1">
            {formatPrice(property.price)}
          </div>

          {/* Property Features */}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-3">{property.bedrooms} bds</span>
            <span className="mr-3">{property.bathrooms} ba</span>
            <span>{formatSquareFootage(property.square_footage)} sqft</span>
          </div>

          {/* Address */}
          <div className="text-gray-600 text-sm mb-1">
            {property.address}
          </div>
          <div className="text-gray-600 text-sm">
            {property.city}, {property.state}
          </div>
        </div>
      </div>
    </Link>
  );
} 