import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

export const mongoConfig: MongooseModuleOptions = {
  onConnectionCreate: (connection) => {
    connection.on('connected', () =>
      Logger.log('✅ Successfully connected to MongoDB')
    );

    connection.on('error', (err) =>
      Logger.error('❌ MongoDB connection error:', err)
    );

    connection.on('disconnected', () =>
      Logger.warn('⚠️ MongoDB disconnected!')
    );

    connection.on('reconnected', () => Logger.log('🔄 Reconnected to MongoDB'));

    return connection;
  },
};
