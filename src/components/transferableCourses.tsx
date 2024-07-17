import { BCTransferAgreementProps } from '../interfaces/BCTransferAgreement';

export default function TransferableCourses(props: BCTransferAgreementProps) {
  return (
    <div className="course-card">
      <button>{props.Data}</button>
    </div>
  );
}
