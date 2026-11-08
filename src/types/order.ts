import { MutualFund } from './mutualFund';

export interface SipOrderData {
  fund: MutualFund;
  monthlyAmount: number;
  sipDay: number; // day of month (e.g. 5th, 10th)
  bankAccount: {
    bankName: string;
    accountNumberMasked: string;
    mandateStatus: 'APPROVED' | 'PENDING';
  };
  step: number; // 1 to 4
  status: 'DRAFT' | 'SUCCESS' | 'CANCELLED';
  orderId?: string;
  firstDebitDate?: string;
  expectedAllotmentDate?: string;
}

export interface FirstTimeNudge {
  step: number;
  stepTitle: string;
  headline: string;
  calmExplanation: string;
  whyItMatters: string;
  safetyCheck: string;
  iconName: string;
}

