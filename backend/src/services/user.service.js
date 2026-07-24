import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository.js';
import { ActivityRepository } from '../repositories/activity.repository.js';

export const UserService = {
  getUsers: async (queryParams) => {
    return UserRepository.findAll(queryParams);
  },

  getUserById: async (id) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('User not found.');
    return user;
  },

  createUser: async (userData, currentUser, ipAddress) => {
    const existing = await UserRepository.findByEmailWithPassword(userData.email);
    if (existing) throw new Error('User with this email already exists.');

    const hashedPassword = await bcrypt.hash(userData.password || 'User123!', 10);
    const user = await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'USER_CREATED',
      category: 'user',
      details: `Created new user ${user.email} (${user.role})`,
      ipAddress,
    });

    return user;
  },

  updateUser: async (id, updateData, currentUser, ipAddress) => {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updated = await UserRepository.update(id, updateData);
    if (!updated) throw new Error('User not found.');

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'USER_UPDATED',
      category: 'user',
      details: `Updated user record for ${updated.email}`,
      ipAddress,
    });

    return updated;
  },

  deleteUser: async (id, currentUser, ipAddress) => {
    const userToDelete = await UserRepository.findById(id);
    if (!userToDelete) throw new Error('User not found.');

    if (id === currentUser.id) {
      throw new Error('Self-deletion of active session user is not permitted.');
    }

    const success = await UserRepository.delete(id);

    await ActivityRepository.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: 'USER_DELETED',
      category: 'user',
      details: `Deleted user record ${userToDelete.email}`,
      ipAddress,
    });

    return success;
  }
};
