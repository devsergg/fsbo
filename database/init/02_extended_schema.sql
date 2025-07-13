-- Extended FSBO Platform Database Schema
-- This script adds additional tables for comprehensive FSBO functionality

-- Property visits/showings scheduling
CREATE TABLE property_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    visitor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    visit_date TIMESTAMP WITH TIME ZONE NOT NULL,
    visit_duration INTEGER DEFAULT 30, -- in minutes
    visit_status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled, no_show
    visitor_notes TEXT,
    owner_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Saved properties (user favorites)
CREATE TABLE saved_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    UNIQUE(user_id, property_id)
);

-- Property documents (legal docs, disclosures, etc.)
CREATE TABLE property_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL, -- disclosure, inspection, legal, marketing, etc.
    document_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    is_public BOOLEAN DEFAULT FALSE,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Property price history
CREATE TABLE property_price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    old_price DECIMAL(12,2),
    new_price DECIMAL(12,2) NOT NULL,
    change_reason VARCHAR(100),
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User preferences
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    preference_key VARCHAR(100) NOT NULL,
    preference_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, preference_key)
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- message, visit, price_change, system, etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_id UUID, -- could reference property, message, visit, etc.
    related_type VARCHAR(50), -- property, message, visit, etc.
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Property search filters (saved searches)
CREATE TABLE saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    search_name VARCHAR(255) NOT NULL,
    search_criteria JSONB NOT NULL, -- stores filter criteria as JSON
    email_alerts BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Neighborhood information
CREATE TABLE neighborhoods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_codes TEXT[], -- array of zip codes
    description TEXT,
    avg_home_price DECIMAL(12,2),
    school_rating DECIMAL(3,2),
    crime_rating DECIMAL(3,2),
    walkability_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Property reviews/ratings
CREATE TABLE property_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_type VARCHAR(50) DEFAULT 'general', -- general, neighborhood, value, etc.
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(property_id, reviewer_id, review_type)
);

-- Marketing campaigns
CREATE TABLE marketing_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    campaign_name VARCHAR(255) NOT NULL,
    campaign_type VARCHAR(50) NOT NULL, -- social_media, email, flyers, etc.
    status VARCHAR(20) DEFAULT 'draft', -- draft, active, paused, completed
    budget DECIMAL(10,2),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    target_audience JSONB, -- targeting criteria as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Property comparison table
CREATE TABLE property_comparisons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    comparison_name VARCHAR(255) NOT NULL,
    property_ids UUID[] NOT NULL, -- array of property IDs
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Property open houses
CREATE TABLE open_houses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT,
    max_attendees INTEGER,
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, active, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Open house attendees
CREATE TABLE open_house_attendees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    open_house_id UUID REFERENCES open_houses(id) ON DELETE CASCADE,
    attendee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    attended BOOLEAN DEFAULT FALSE,
    feedback TEXT,
    UNIQUE(open_house_id, attendee_id)
);

-- Create indexes for the new tables
CREATE INDEX idx_property_visits_property_id ON property_visits(property_id);
CREATE INDEX idx_property_visits_visitor_id ON property_visits(visitor_id);
CREATE INDEX idx_property_visits_date ON property_visits(visit_date);
CREATE INDEX idx_saved_properties_user_id ON saved_properties(user_id);
CREATE INDEX idx_saved_properties_property_id ON saved_properties(property_id);
CREATE INDEX idx_property_documents_property_id ON property_documents(property_id);
CREATE INDEX idx_property_documents_type ON property_documents(document_type);
CREATE INDEX idx_property_price_history_property_id ON property_price_history(property_id);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_saved_searches_user_id ON saved_searches(user_id);
CREATE INDEX idx_property_reviews_property_id ON property_reviews(property_id);
CREATE INDEX idx_marketing_campaigns_property_id ON marketing_campaigns(property_id);
CREATE INDEX idx_property_comparisons_user_id ON property_comparisons(user_id);
CREATE INDEX idx_open_houses_property_id ON open_houses(property_id);
CREATE INDEX idx_open_houses_start_time ON open_houses(start_time);
CREATE INDEX idx_open_house_attendees_open_house_id ON open_house_attendees(open_house_id);

-- Apply updated_at triggers to new tables
CREATE TRIGGER update_property_visits_updated_at BEFORE UPDATE ON property_visits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON saved_searches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_neighborhoods_updated_at BEFORE UPDATE ON neighborhoods
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketing_campaigns_updated_at BEFORE UPDATE ON marketing_campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_comparisons_updated_at BEFORE UPDATE ON property_comparisons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_open_houses_updated_at BEFORE UPDATE ON open_houses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for extended tables
INSERT INTO neighborhoods (name, city, state, zip_codes, description, avg_home_price, school_rating, walkability_score) VALUES
('Downtown', 'San Francisco', 'CA', ARRAY['94102', '94103'], 'Urban downtown area with high walkability', 1200000.00, 4.2, 90),
('Suburban Hills', 'Austin', 'TX', ARRAY['78701', '78702'], 'Family-friendly suburban area with good schools', 450000.00, 4.7, 65);

INSERT INTO user_preferences (user_id, preference_key, preference_value) 
SELECT id, 'email_notifications', 'true' FROM users WHERE email = 'demo@fsbo.com';

INSERT INTO user_preferences (user_id, preference_key, preference_value) 
SELECT id, 'preferred_contact_method', 'email' FROM users WHERE email = 'demo@fsbo.com';

COMMIT; 