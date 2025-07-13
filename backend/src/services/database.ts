import { Pool, PoolClient } from 'pg';
import pool from '../config/database';

export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  /**
   * Get a database client from the pool
   */
  async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  /**
   * Execute a query with optional parameters
   */
  async query(text: string, params?: any[]): Promise<any> {
    try {
      const result = await this.pool.query(text, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  /**
   * Execute a query that returns a single row
   */
  async queryOne(text: string, params?: any[]): Promise<any> {
    const result = await this.query(text, params);
    return result.length > 0 ? result[0] : null;
  }

  /**
   * Execute a transaction
   */
  async transaction(callback: (client: PoolClient) => Promise<any>): Promise<any> {
    const client = await this.getClient();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // User operations
  async createUser(userData: {
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    phone?: string;
    profile_image_url?: string;
  }): Promise<any> {
    const query = `
      INSERT INTO users (email, password_hash, first_name, last_name, phone, profile_image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    return await this.queryOne(query, [
      userData.email,
      userData.password_hash,
      userData.first_name,
      userData.last_name,
      userData.phone,
      userData.profile_image_url
    ]);
  }

  async getUserByEmail(email: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE email = $1';
    return await this.queryOne(query, [email]);
  }

  async getUserById(id: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE id = $1';
    return await this.queryOne(query, [id]);
  }

  // Property operations
  async createProperty(propertyData: {
    user_id: string;
    title: string;
    description?: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    price: number;
    bedrooms?: number;
    bathrooms?: number;
    square_footage?: number;
    lot_size?: number;
    year_built?: number;
    property_type: string;
    listing_status?: string;
  }): Promise<any> {
    const query = `
      INSERT INTO properties (
        user_id, title, description, address, city, state, zip_code, price,
        bedrooms, bathrooms, square_footage, lot_size, year_built, property_type, listing_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;
    return await this.queryOne(query, [
      propertyData.user_id,
      propertyData.title,
      propertyData.description,
      propertyData.address,
      propertyData.city,
      propertyData.state,
      propertyData.zip_code,
      propertyData.price,
      propertyData.bedrooms,
      propertyData.bathrooms,
      propertyData.square_footage,
      propertyData.lot_size,
      propertyData.year_built,
      propertyData.property_type,
      propertyData.listing_status || 'draft'
    ]);
  }

  async getPropertyById(id: string): Promise<any> {
    const query = `
      SELECT p.*, u.first_name, u.last_name, u.email, u.phone
      FROM properties p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `;
    return await this.queryOne(query, [id]);
  }

  async getPropertiesByUserId(userId: string): Promise<any[]> {
    const query = 'SELECT * FROM properties WHERE user_id = $1 ORDER BY created_at DESC';
    return await this.query(query, [userId]);
  }

  async searchProperties(filters: {
    city?: string;
    state?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    bathrooms?: number;
    property_type?: string;
    listing_status?: string;
    limit?: number;
    offset?: number;
  }): Promise<any[]> {
    let query = `
      SELECT p.*, u.first_name, u.last_name, u.phone
      FROM properties p
      JOIN users u ON p.user_id = u.id
      WHERE p.listing_status = 'active'
    `;
    const params: any[] = [];
    let paramCount = 0;

    if (filters.city) {
      query += ` AND LOWER(p.city) = LOWER($${++paramCount})`;
      params.push(filters.city);
    }

    if (filters.state) {
      query += ` AND LOWER(p.state) = LOWER($${++paramCount})`;
      params.push(filters.state);
    }

    if (filters.min_price) {
      query += ` AND p.price >= $${++paramCount}`;
      params.push(filters.min_price);
    }

    if (filters.max_price) {
      query += ` AND p.price <= $${++paramCount}`;
      params.push(filters.max_price);
    }

    if (filters.bedrooms) {
      query += ` AND p.bedrooms >= $${++paramCount}`;
      params.push(filters.bedrooms);
    }

    if (filters.bathrooms) {
      query += ` AND p.bathrooms >= $${++paramCount}`;
      params.push(filters.bathrooms);
    }

    if (filters.property_type) {
      query += ` AND p.property_type = $${++paramCount}`;
      params.push(filters.property_type);
    }

    query += ` ORDER BY p.created_at DESC`;

    if (filters.limit) {
      query += ` LIMIT $${++paramCount}`;
      params.push(filters.limit);
    }

    if (filters.offset) {
      query += ` OFFSET $${++paramCount}`;
      params.push(filters.offset);
    }

    return await this.query(query, params);
  }

  // Property images operations
  async addPropertyImage(propertyId: string, imageData: {
    image_url: string;
    image_order?: number;
    alt_text?: string;
  }): Promise<any> {
    const query = `
      INSERT INTO property_images (property_id, image_url, image_order, alt_text)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    return await this.queryOne(query, [
      propertyId,
      imageData.image_url,
      imageData.image_order || 0,
      imageData.alt_text
    ]);
  }

  async getPropertyImages(propertyId: string): Promise<any[]> {
    const query = `
      SELECT * FROM property_images 
      WHERE property_id = $1 
      ORDER BY image_order ASC, created_at ASC
    `;
    return await this.query(query, [propertyId]);
  }

  // Saved properties operations
  async saveProperty(userId: string, propertyId: string, notes?: string): Promise<any> {
    const query = `
      INSERT INTO saved_properties (user_id, property_id, notes)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, property_id) DO UPDATE SET notes = $3
      RETURNING *
    `;
    return await this.queryOne(query, [userId, propertyId, notes]);
  }

  async getSavedProperties(userId: string): Promise<any[]> {
    const query = `
      SELECT sp.*, p.title, p.price, p.city, p.state, p.bedrooms, p.bathrooms
      FROM saved_properties sp
      JOIN properties p ON sp.property_id = p.id
      WHERE sp.user_id = $1
      ORDER BY sp.saved_at DESC
    `;
    return await this.query(query, [userId]);
  }

  // Messages operations
  async createMessage(messageData: {
    property_id: string;
    sender_id: string;
    recipient_id: string;
    subject?: string;
    message: string;
    parent_message_id?: string;
  }): Promise<any> {
    const query = `
      INSERT INTO messages (property_id, sender_id, recipient_id, subject, message, parent_message_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    return await this.queryOne(query, [
      messageData.property_id,
      messageData.sender_id,
      messageData.recipient_id,
      messageData.subject,
      messageData.message,
      messageData.parent_message_id
    ]);
  }

  async getMessages(userId: string, propertyId?: string): Promise<any[]> {
    let query = `
      SELECT m.*, 
             s.first_name as sender_first_name, s.last_name as sender_last_name,
             r.first_name as recipient_first_name, r.last_name as recipient_last_name,
             p.title as property_title
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      JOIN users r ON m.recipient_id = r.id
      JOIN properties p ON m.property_id = p.id
      WHERE (m.sender_id = $1 OR m.recipient_id = $1)
    `;
    const params = [userId];

    if (propertyId) {
      query += ` AND m.property_id = $2`;
      params.push(propertyId);
    }

    query += ` ORDER BY m.created_at DESC`;

    return await this.query(query, params);
  }

  // Analytics operations
  async recordPropertyView(propertyId: string, userId?: string, ipAddress?: string, userAgent?: string): Promise<void> {
    const query = `
      INSERT INTO listing_analytics (property_id, event_type, user_id, ip_address, user_agent)
      VALUES ($1, 'view', $2, $3, $4)
    `;
    await this.query(query, [propertyId, userId, ipAddress, userAgent]);
  }

  async getPropertyAnalytics(propertyId: string): Promise<any> {
    const query = `
      SELECT 
        event_type,
        COUNT(*) as count,
        DATE_TRUNC('day', created_at) as date
      FROM listing_analytics
      WHERE property_id = $1
      GROUP BY event_type, DATE_TRUNC('day', created_at)
      ORDER BY date DESC
    `;
    return await this.query(query, [propertyId]);
  }

  // Neighborhoods operations
  async getNeighborhoods(city?: string, state?: string): Promise<any[]> {
    let query = 'SELECT * FROM neighborhoods';
    const params: any[] = [];
    const conditions: string[] = [];

    if (city) {
      conditions.push(`LOWER(city) = LOWER($${params.length + 1})`);
      params.push(city);
    }

    if (state) {
      conditions.push(`LOWER(state) = LOWER($${params.length + 1})`);
      params.push(state);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY name ASC';

    return await this.query(query, params);
  }

  // Close the database connection
  async close(): Promise<void> {
    await this.pool.end();
  }
}

// Export a singleton instance
export const dbService = new DatabaseService();
export default dbService; 