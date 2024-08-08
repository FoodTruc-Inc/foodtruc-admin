import { processUrlVariables, QUERIES } from '@/utils';
import { apiClient } from './init';

interface Signup {
  username: string;
  email: string;
  password: string;
  access_token?: string;
}

interface Login {
  username: string;
  password: string;
}

interface UpdateUser {
  firstName: string;
  lastName: string;
  alternativeEmail: string;
  phone: string;
}

interface UpdateUserProfile {
  businessName: string;
  address: string;
  alternativeEmail: string;
  phone: string;
  imageUrl: File;
}

export interface User {
  access_token: string;
  accountNumber: string | number;
  address: string;
  addressCountry: string;
  addressLga: string;
  addressResidencyStatus: string;
  addressState: string;
  addressVerified: boolean;
  addressVerifiedDate: Date | string;
  alternativeEmail: string;
  approved: boolean;
  avatar: string;
  bankStatement: any;
  bvn: string | number;
  bvnVerified: boolean;
  createdDate: Date;
  dateOfBirth: Date | string;
  email: string;
  employment: string;
  employmentName: string;
  employmentVerified: boolean;
  employmentVerifiedDate: string;
  employmentYears: string | number;
  firstName: string;
  gender: string;
  id: string;
  idExpiryDate: any;
  idNumber: number;
  idType: any;
  idUrl: string;
  idVerified: boolean;
  income: any;
  lastActivity: any;
  lastActivityDate: any;
  lastLogin: any;
  lastName: string;
  maritalStatus: string;
  phone: string | number;
  role: 'owner' | string;
  status: 'approved' | string;
  type: 'user' | string;
  updatedDate: Date;
  username: string;
  workAddress: string;
  nin: string;
  employmentStartDate: string;
  business: {
    imageUrl: string;
    address: string;
    name: string;
    email: string;
  };
}

const postToLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.setItem('token', key);
};

export const logIn = async (body: Login) => {
  const { data } = await apiClient.post(QUERIES.LOGIN, body);

  if (data.token) {
    postToLocalStorage(data.token ?? '');
  }

  return data;
};

export const getUser = async () => {
  const { data } = await apiClient.get(QUERIES.ME);
  return data || {};
};
