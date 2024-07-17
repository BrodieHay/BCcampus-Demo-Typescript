import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { BCTransferAgreementProps } from '../interfaces/BCTransferAgreement';
import { Subject } from '../interfaces/Subject';

export default function Subjects(props: BCTransferAgreementProps) {
  return (
    <Autocomplete
      disablePortal
      sx={{ width: 300 }}
      key={props.Key}
      disabled={!props.Value?.institutionId}
      options={props.Data}
      getOptionLabel={(option: Subject) =>
        option?.Code + ' - ' + (option.Title != null ? option.Title : '')
      }
      renderInput={(params: string[]) => (
        <TextField {...params} label="Subject" />
      )}
      onChange={props.onChange}
    />
  );
}
