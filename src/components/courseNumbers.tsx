import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { BCTransferAgreementProps } from '../interfaces/BCTransferAgreement';
import { CourseNumber } from '../interfaces/CourseNumber';

export default function CourseNumbers(props: BCTransferAgreementProps) {
  return (
    <Autocomplete
      disablePortal
      sx={{ width: 300 }}
      key={props.Key}
      disabled={!props.Value?.subjectCode}
      options={props.Data}
      getOptionLabel={(option: CourseNumber) => option.Number}
      renderInput={(params: string[]) => (
        <TextField {...params} label="Course Number" />
      )}
      onChange={props.onChange}
    />
  );
}
