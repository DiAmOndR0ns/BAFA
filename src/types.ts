export type OfficerRole = 'President' | 'Vice_President' | 'Secretary' | 'Treasurer' | 'Auditor' | 'PIO';

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: OfficerRole | 'Member';
  isApproved: boolean;
  avatarUrl?: string; // base64 string for uploaded profile picture
  farmLocation?: string; // for Member role
  farmSize?: number; // in hectares, for Member role
  primaryCrops?: string[]; // for Member role
  contactNumber?: string;
  joinedDate?: string;
  status?: 'Active' | 'Inactive'; // for Member status
  resetRequested?: boolean; // True if they applied to reset their password
}

export interface Member {
  id: string;
  name: string;
  farmLocation: string; // e.g. Sitio Alegria Centro, Sitio Fatima, Sitio Tuburan, Sitio Ylaya
  farmSize: number; // in hectares
  primaryCrops: string[]; // e.g. Corn, Coconut, Banana, Cacao, Vegetables
  contactNumber: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
  avatarUrl?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string;
  attendanceCount: number;
  agenda: string;
  minutes: string;
  officerInCharge: string;
  attendanceRecord?: Record<string, 'Present' | 'Absent' | 'Excused'>;
}

export interface Resolution {
  id: string;
  resolutionNumber: string; // e.g. Res. No. 2026-01
  title: string;
  description: string;
  dateAgreed: string;
  movedBy: string;
  secondedBy: string;
  voteInFavor: number;
  voteAgainst: number;
  voteAbstain: number;
  status: 'Pending Approval' | 'Approved' | 'Archived';
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense';
  category: string; // e.g. Membership Dues, Donation, Govt Grant, Fertilizer, Seeds, Snacks, Equipment
  amount: number;
  date: string;
  description: string;
  recordedBy: string; // Treasurer
  auditedStatus: 'Unaudited' | 'Audited' | 'Flagged';
  auditedBy?: string; // Auditor
  auditedDate?: string;
  auditNotes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'General' | 'Meeting' | 'Assistance' | 'Weather' | 'Price Advisory';
  content: string;
  datePosted: string;
  priority: 'Low' | 'Medium' | 'High';
  postedBy: string; // PIO
}

export interface SyncQueueItem {
  id: string;
  timestamp: string;
  action: 'create' | 'update' | 'delete';
  entityType: 'member' | 'meeting' | 'resolution' | 'transaction' | 'announcement' | 'hog_expense' | 'hog_sale' | 'hog_chore';
  payload: any;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  role: OfficerRole;
  action: string;
  details: string;
  syncStatus: 'synced' | 'pending';
  hash: string;
  previousHash: string;
}

// HOG RAISING & GENERAL INCOME GENERATING PROJECT (IGP) TYPES
export interface IgpExpense {
  id: string;
  produce?: string; // e.g., "Hog Raising", "Poultry Raising"
  category: 'Piglets' | 'Feeds' | 'Vitamins/Medicines' | 'Other' | string;
  description: string;
  amount: number;
  date: string;
  recordedBy: string;
}

export interface IgpSale {
  id: string;
  produce?: string; // e.g., "Hog Raising", "Poultry Raising"
  date: string;
  hogsCount: number; // For backward compatibility
  produceCount?: number; // General quantity
  revenue: number;
  recordedBy: string;
  notes?: string;
}

export interface IgpGroup {
  id: string;
  name: string; // e.g. "Batch 1 (Lunes / Monday)"
  members: string[]; // List of member names
  scheduleDays: string[]; // e.g. ["Monday", "Thursday"]
}

export interface IgpChoreLog {
  id: string;
  produce?: string; // e.g., "Hog Raising", "Poultry Raising"
  date: string;
  time: string;
  batchName: string;
  checkedBy: string; // member name
  activities: string[]; // e.g. ["Feeding", "Cleaning", "Vitamins"]
  notes?: string;
}

export interface HogRaisingState {
  capitalGrant: number; // Initially PHP 1,000,000
  produces?: string[]; // Dynamic list of produce projects, e.g. ["Hog Raising", "Poultry Raising"]
  expenses: IgpExpense[];
  sales: IgpSale[];
  groups: IgpGroup[];
  choreLogs: IgpChoreLog[];
  closedYears?: number[];
}

