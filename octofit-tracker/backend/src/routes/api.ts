import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const apiRouter = express.Router();

apiRouter.get('/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

apiRouter.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

apiRouter.get('/teams', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

apiRouter.post('/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

apiRouter.get('/activities', async (_req, res) => {
  const activities = await Activity.find().populate('userId').lean();
  res.json(activities);
});

apiRouter.post('/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

apiRouter.get('/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('userId').sort({ points: -1 }).lean();
  res.json(leaderboard);
});

apiRouter.post('/leaderboard', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

apiRouter.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

apiRouter.post('/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default apiRouter;
