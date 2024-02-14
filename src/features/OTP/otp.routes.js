import express from 'express';
import OTPController from './otp.controller.js';

const otpRouter = express.Router();
const otpController = new OTPController();

otpRouter.post('/send', otpController.sendOTP);
otpRouter.post('/verify', otpController.verifyOTP);
otpRouter.post('/reset_password', otpController.resetPassword);

export default otpRouter;
