import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { UserRepository } from '../repositories/user.repository.js';
import { ActivityRepository } from '../repositories/activity.repository.js';

export const AuthService = {
  register: async ({ name, email, password, role = 'user', department = 'Engineering' }, ipAddress = '127.0.0.1') => {
    const existing = await UserRepository.findByEmailWithPassword(email);
    if (existing) {
      throw new Error('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    await ActivityRepository.log({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'USER_REGISTERED',
      category: 'auth',
      details: `New account created: ${user.email}`,
      ipAddress,
    });

    return { user, token };
  },

  login: async ({ email, password }, ipAddress = '127.0.0.1') => {
    const userWithPw = await UserRepository.findByEmailWithPassword(email);
    if (!userWithPw) {
      throw new Error('Invalid email or password credentials.');
    }

    const isMatch = await bcrypt.compare(password, userWithPw.password);
    if (!isMatch) {
      throw new Error('Invalid email or password credentials.');
    }

    if (userWithPw.status !== 'active') {
      throw new Error(`Account access restricted. Status: '${userWithPw.status}'.`);
    }

    await UserRepository.updateLastLogin(userWithPw.id);

    const { password: _, ...user } = userWithPw;
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    await ActivityRepository.log({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'USER_LOGIN',
      category: 'auth',
      details: `Successful login for ${user.email}`,
      ipAddress,
    });

    return { user, token };
  },

  getProfile: async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('Profile not found.');
    }
    return user;
  },

  updateProfile: async (userId, updateData, ipAddress = '127.0.0.1') => {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await UserRepository.update(userId, updateData);

    await ActivityRepository.log({
      userId: updatedUser.id,
      userName: updatedUser.name,
      userRole: updatedUser.role,
      action: 'PROFILE_UPDATED',
      category: 'user',
      details: `Updated personal profile details`,
      ipAddress,
    });

    return updatedUser;
  }
};
