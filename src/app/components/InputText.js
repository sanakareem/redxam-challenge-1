import TextField from '@mui/material/TextField';

const InputText = ({
  label,
  type = 'text',
  helperText = null,
  labelClassName = 'opacity-70',
  multiline = false,
  rows = 2,
  onChange
}) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type}
      helperText={helperText}
      multiline={multiline}
      rows={multiline ? rows : false}
      className="w-full text-poppins"
      FormHelperTextProps={{
        className: 'px-[38px] mx-0 text-white text-[10px] opacity-60'
      }}
      inputProps={{ className: 'font-inter text-sm font-medium' }}
      InputLabelProps={{
        className: `font-inter text-sm font-medium ${labelClassName}`
      }}
      onChange={onChange}
      sx={{
        '& label': {
          color: '#FFFFFF',
          paddingX: '22px'
        },
        '& legend': {
          marginX: '13px'
        },
        '& label.Mui-focused': {
          color: 'white',
          opacity: 1
        },
        '& .MuiOutlinedInput-input': {
          paddingX: 0,
          paddingY: 0
        },
        '& .MuiOutlinedInput-root': {
          paddingX: '32px',
          paddingY: '16px',
          minHeight: '52px',
          borderRadius: '28px',
          color: 'white',
          '& fieldset': {
            borderColor: '#222222'
          },
          '&:hover fieldset': {
            borderColor: '#393939'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#393939'
          }
        }
      }}
    />
  );
};

export default InputText;
