import express from 'express';
import userRoutes from './userRoutes.js'; // Import the userRoutes
import walletRoutes from './walletRoutes'; // Import the walletRoutes
import transactionRoutes from './transactionRoutes'; // Import the transactionRoutes
import authCheck from '../middleware/authcheck.js';

const app = express(); // Create an express app

const router = express.Router(); // Create an express router

router.use('/user', userRoutes); // Use the userRoutes for the /user path

// app.use('/user',userRoutes) // Use the userRoutes for the /user path

// app.use(authCheck) // Use the authCheck middleware
router.use('/wallet', authCheck ,walletRoutes) // Use the walletRoutes for the /wallet path
router.use('/transaction', authCheck,transactionRoutes) // Use the transactionRoutes for the /transaction path

export default router; // Export the app