import axios from 'axios';
import { MAIN_API_URL } from './apiService';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identification: number;
  status: string;
  role?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}


export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${MAIN_API_URL}/auth/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async deleteUser(userId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`${MAIN_API_URL}/auth/users/${userId}`);
      return response.status === 200;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async getRoles(): Promise<Role[]> {
    try {
      const response = await axios.get(`${MAIN_API_URL}/roles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },


  async updateUserStatus(userId: number, status: 'active' | 'suspended'): Promise<boolean> {
    try {
      const response = await axios.patch(`${MAIN_API_URL}/auth/users/${userId}/status?status=${status}`);
      return response.status === 200;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }
};