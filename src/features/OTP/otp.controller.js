import { UserModel } from "../users/user.schema.js";
import BlacklistTokenModel from "../logout/logout.schema.js";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error-handler/applicationError.js";

class OTPController {
  sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        // Generate OTP
        const secretObject = speakeasy.generateSecret({ length: 6 });
        const otp = speakeasy.totp({
          secret: secretObject.base32,
          encoding: "base32",
        });

        // Store OTP for later verification
        req.session.otp = {
          otp,
          secretObject,
        };

        // Send OTP to user via email
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sukeshhegde09ss@gmail.com",
            pass: "gt pass from googlee account",
          },
        });

        const mailOptions = {
          from: "sukeshhegde09ss@gmail.com",
          to: user.email,
          subject: "Password Reset OTP",
          text: `Your OTP for password reset is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        res
          .status(200)
          .json({ success: true, message: "OTP sent successfully" });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  };

  verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (user && req.session.otp) {
        const serverSecret = req.session.otp.secretObject;
        console.log("Server Secret:", serverSecret.base32);
        console.log("Received OTP:", otp);

        const verificationResult = speakeasy.totp.verify({
          secret: serverSecret.base32,
          encoding: "base32",
          token: otp,
          window: 6,
        });
        console.log("Verification Result:", verificationResult);

        // if (speakeasy.totp.verify({
        //   secret: serverSecret,
        //   encoding: 'base32',
        //   token: otp,
        // }))
        if (verificationResult) {
          // OTP is valid, allow password reset
          delete req.session.otp; // Remove stored OTP after successful verification
          res
            .status(200)
            .json({ success: true, message: "OTP verified successfully" });
        } else {
          res.status(401).json({ success: false, message: "Invalid OTP" });
        }
      } else {
        res
          .status(401)
          .json({
            success: false,
            message: "Invalid session or OTP secret missing",
          });
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  };

  resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (user) {
        // Update user's password in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        await user.updateOne({ password: hashedPass });

        // Clear user's existing sessions (logout from all devices)
        const userTokens = await BlacklistTokenModel.find({ userId: user._id });
        for (const token of userTokens) {
          await token.remove();
        }

        res
          .status(200)
          .json({ success: true, message: "Password reset successfully" });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  };
}

export default OTPController;
