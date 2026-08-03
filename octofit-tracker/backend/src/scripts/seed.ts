import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        name: 'Ava Stone',
        email: 'ava@example.com',
        avatar: 'https://example.com/ava.png',
        goals: ['run 5k', 'increase mobility'],
      },
      {
        name: 'Leo Brooks',
        email: 'leo@example.com',
        avatar: 'https://example.com/leo.png',
        goals: ['strength training', 'track sleep'],
      },
    ]);

    const teams = await Team.create([
      {
        name: 'Mergington Falcons',
        coach: 'Jessica Cat',
        members: [users[0]._id, users[1]._id],
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 280,
        notes: 'Morning 5K practice',
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 45,
        calories: 340,
        notes: 'Upper body circuit',
      },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, points: 1250, rank: 1 },
      { userId: users[1]._id, points: 980, rank: 2 },
    ]);

    await Workout.create([
      {
        title: 'Mobility Flow',
        category: 'Recovery',
        difficulty: 'Beginner',
        durationMinutes: 20,
        equipment: ['mat'],
      },
      {
        title: 'HIIT Sprint Circuit',
        category: 'Cardio',
        difficulty: 'Advanced',
        durationMinutes: 30,
        equipment: ['cones', 'timer'],
      },
    ]);

    console.log('Database seeding complete');
    console.log(`Created ${teams.length} team and ${users.length} users for octofit_db.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
