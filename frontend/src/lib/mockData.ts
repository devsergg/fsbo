// Mock data for FSBO platform development

export const mockProperties = [
  {
    id: '1',
    title: 'Beautiful 4-Bedroom Craftsman in Inglewood',
    price: 825000,
    address: '1234 Crenshaw Boulevard',
    city: 'Inglewood',
    state: 'CA',
    bedrooms: 4,
    bathrooms: 2.5,
    square_footage: 2100,
    property_type: 'house',
    image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2025-01-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'Modern 2-Bedroom Condo in South Park',
    price: 645000,
    address: '567 South Park Avenue, Unit 8A',
    city: 'Los Angeles',
    state: 'CA',
    bedrooms: 2,
    bathrooms: 2,
    square_footage: 1250,
    property_type: 'condo',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2025-01-09T14:30:00Z'
  },
  {
    id: '3',
    title: 'Charming 3-Bedroom Bungalow in Hawthorne',
    price: 715000,
    address: '890 El Segundo Boulevard',
    city: 'Hawthorne',
    state: 'CA',
    bedrooms: 3,
    bathrooms: 2,
    square_footage: 1800,
    property_type: 'house',
    image_url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2025-01-08T16:45:00Z'
  },
  {
    id: '4',
    title: 'Luxury 5-Bedroom Executive Home in Carson',
    price: 1250000,
    address: '456 Avalon Boulevard',
    city: 'Carson',
    state: 'CA',
    bedrooms: 5,
    bathrooms: 4,
    square_footage: 3500,
    property_type: 'house',
    image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2025-01-07T11:20:00Z'
  },
  {
    id: '5',
    title: 'Cozy 2-Bedroom Townhouse in Gardena',
    price: 585000,
    address: '789 Western Avenue',
    city: 'Gardena',
    state: 'CA',
    bedrooms: 2,
    bathrooms: 1.5,
    square_footage: 1100,
    property_type: 'townhouse',
    image_url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2025-01-06T09:15:00Z'
  },
  {
    id: '6',
    title: 'Renovated 3-Bedroom Spanish-Style in Torrance',
    price: 895000,
    address: '321 Sepulveda Boulevard',
    city: 'Torrance',
    state: 'CA',
    bedrooms: 3,
    bathrooms: 3,
    square_footage: 2400,
    property_type: 'house',
    image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    created_at: '2025-01-05T13:40:00Z'
  }
];

export const mockNeighborhoods = [
  {
    id: '1',
    name: 'Inglewood',
    city: 'Inglewood',
    state: 'CA',
    description: 'Growing neighborhood near LAX with new developments and SoFi Stadium',
    avg_home_price: 750000,
    school_rating: 4.1,
    walkability_score: 75
  },
  {
    id: '2',
    name: 'South Park',
    city: 'Los Angeles',
    state: 'CA',
    description: 'Historic neighborhood with diverse community and easy freeway access',
    avg_home_price: 680000,
    school_rating: 4.0,
    walkability_score: 80
  },
  {
    id: '3',
    name: 'Hawthorne',
    city: 'Hawthorne',
    state: 'CA',
    description: 'Suburban feel with good schools and close to beaches',
    avg_home_price: 720000,
    school_rating: 4.3,
    walkability_score: 68
  },
  {
    id: '4',
    name: 'Carson',
    city: 'Carson',
    state: 'CA',
    description: 'Family-friendly area with parks and shopping centers',
    avg_home_price: 780000,
    school_rating: 4.2,
    walkability_score: 62
  }
];

export const mockUser = {
  id: '1',
  email: 'demo@fsbo.com',
  first_name: 'Demo',
  last_name: 'User',
  phone: '555-0123',
  profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  email_verified: true,
  created_at: '2025-01-01T00:00:00Z'
};

export const mockMessages = [
  {
    id: '1',
    property_id: '1',
    sender_id: '2',
    recipient_id: '1',
    subject: 'Interest in Your Property',
    message: 'Hi! I\'m very interested in your property listing. Would it be possible to schedule a viewing this weekend?',
    is_read: false,
    created_at: '2025-01-11T14:30:00Z',
    sender_first_name: 'Jane',
    sender_last_name: 'Smith',
    property_title: 'Beautiful 4-Bedroom Craftsman in Inglewood'
  },
  {
    id: '2',
    property_id: '3',
    sender_id: '3',
    recipient_id: '1',
    subject: 'Questions About the Bungalow',
    message: 'Hello, I have a few questions about the 3-bedroom bungalow. Is the backyard fenced? Are pets allowed?',
    is_read: true,
    created_at: '2025-01-10T16:45:00Z',
    sender_first_name: 'Mike',
    sender_last_name: 'Johnson',
    property_title: 'Charming 3-Bedroom Bungalow in Hawthorne'
  }
];

export const mockPropertyImages = [
  {
    id: '1',
    property_id: '1',
    image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    image_order: 0,
    alt_text: 'Front view of the house'
  },
  {
    id: '2',
    property_id: '1',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    image_order: 1,
    alt_text: 'Living room'
  },
  {
    id: '3',
    property_id: '1',
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    image_order: 2,
    alt_text: 'Kitchen'
  }
];

export const mockAnalytics = {
  total_views: 1250,
  total_saves: 45,
  total_inquiries: 12,
  views_this_week: 89,
  views_trend: '+15%'
}; 