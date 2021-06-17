export interface NewInquiryPayload {
  name: string;
  email: string;
  message: string;
  newsletter?: 'on';
}

export interface Inquiry extends Omit<NewInquiryPayload, 'newsletter'> {
  date: string;
  name: string;
  email: string;
  message: string;
  newsletter: boolean;
}
