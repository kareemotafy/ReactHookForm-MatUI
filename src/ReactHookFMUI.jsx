import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Checkbox,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';

const validationSchema = Yup.object().shape({
  textField: Yup.string().required('Fullname is required')
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3)
  }
}));

const ReactTextField = (props) => {
  const { control, name, defaultValue, error } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <TextField {...props} error={error?.[name] ? true : false} {...field} />
      )}
    />
  );
};

const ReactSelectField = (props) => {
  const {
    control,
    name,
    isArray = false,
    options,
    defaultValue,
    label,
    error
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <FormControl error={error?.[name] ? true : false}>
          <InputLabel>{label}</InputLabel>
          <Select {...props} error={error?.[name] ? true : false} {...field}>
            {(!isArray &&
              options?.map(({ label, value }) => {
                return (
                  <MenuItem key={label} value={value}>
                    {label}
                  </MenuItem>
                );
              })) ||
              options?.map((element) => {
                return (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText>{error?.[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

const ReactCheckboxField = (props) => {
  const { control, name, defaultValue, label, style, error } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <FormControl error={error?.[name] ? true : false}>
          <FormControlLabel
            control={<Checkbox style={style} {...field} />}
            label={label}
          />
          <FormHelperText>{error?.[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

const TestForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data) => console.log(data);

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReactTextField name="textField" error={errors} control={control} />
          <ReactSelectField
            name="Selectfield"
            control={control}
            error={errors}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }
            ]}
          />
          <ReactCheckboxField
            error={errors}
            name="Checkboxfield"
            label="hero"
            control={control}
          />
          <Button type="submit">SUBMIT!</Button>
        </form>
      </Grid>
    </Grid>
  );
};
export { ReactCheckboxField, ReactSelectField, ReactTextField, TestForm };
