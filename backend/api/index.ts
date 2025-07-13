import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { testConnection } from '../src/config/database';

// Load environment variables
dotenv.config();

// Initialize database connection
testConnection();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || process.env.NEXT_PUBLIC_API_URL || '*',
  credentials: true
})); // Enable CORS
app.use(express.json({ limit: '10mb' })); // JSON parsing with file upload support
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', async (_req, res) => {
  try {
    // Test database connection
    await testConnection();
    
    res.json({ 
      status: 'OK', 
      message: 'FSBO Platform API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      database: 'disconnected'
    });
  }
});

// API routes
app.get('/api', (_req, res) => {
  res.json({ 
    message: 'Welcome to FSBO Platform API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      listings: '/api/listings',
      users: '/api/users',
      properties: '/api/properties',
      messages: '/api/messages',
      analytics: '/api/analytics'
    }
  });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The endpoint ${req.originalUrl} does not exist`
  });
});

// Export the Express app as a Vercel function
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
}; 