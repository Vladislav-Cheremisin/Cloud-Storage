import { Router } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post(
        '/registration',
        check('email', 'Incorrect email address!').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 16 characters!').isLength({
            min: 3,
            max: 16,
        }),
        async (req, res) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400)
                        .json({ message: 'Incorrect request', errors});
                }

                const email: string = req.body.email;
                const password: string = req.body.password;
                const existedUser = await User.findOne({ email });

                if (existedUser) {
                    return res.status(400)
                        .json({message: 'User with entered email already exists!'});
                }

                const passwordHash = await bcrypt.hash(password, 3);
                
                const user = new User({
                    email,
                    password: passwordHash,
                });

                await user.save();
                
                return res.status(201)
                    .json({ message: 'User was created successfully!'});
            } catch (err) {
                res.status(500)
                    .json({ message: 'Internal Server Error.' });
            }
        }
    )

export default authRouter;