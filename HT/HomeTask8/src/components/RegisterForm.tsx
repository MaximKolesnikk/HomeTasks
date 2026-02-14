import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography, FormHelperText } from '@mui/material';

interface RegisterFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

const RegisterForm: React.FC = () => {
  const initialValues: RegisterFormValues = { username: '', password: '' };

  const handleSubmit = async (values: RegisterFormValues) => {
   
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 3, backgroundColor: '#fff', borderRadius: 1, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              margin="normal"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;