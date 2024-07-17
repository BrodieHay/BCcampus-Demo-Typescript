import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { BCTransferAgreementProps } from '../interfaces/BCTransferAgreement';
import { Institution } from '../interfaces/institution';

export default function Institutions(props: BCTransferAgreementProps) {
  return (
    <Autocomplete
      disablePortal
      key={props.Key}
      sx={{ width: 300 }}
      options={props.Data}
      getOptionLabel={(option: Institution) =>
        option.Code + ' - ' + option.Title
      }
      renderInput={(params: string[]) => (
        <TextField {...params} label="Institution" />
      )}
      onChange={props.onChange}
    />
  );
}
