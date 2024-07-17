export interface BCTransferAgreementValue {
  institutionId: number;
  subjectCode: string;
  courseNumber: string;
  transferTo: string[];
}

export interface BCTransferAgreementProps {
  value?: BCTransferAgreementValue;
  data: string[];
  key: boolean;
  onChange?: (value: BCTransferAgreementValue) => void;
}
