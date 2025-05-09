import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Grid, TextField, Divider,
  MenuItem, InputAdornment, Button, Snackbar, Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Save, Payment } from '@mui/icons-material';
import { formatLKR, parseLKR } from '../utils/formatters';
import { advancePaymentService, projectService } from '../utils/api';

const validationSchema = Yup.object({
  projectId: Yup.string().required('Project is required'),
  dateOfPayment: Yup.date().required('Date of Payment is required'),
  amountPaid: Yup.number()
    .typeError('Amount Paid must be a valid number')
    .min(0, 'Must be greater than or equal to 0')
    .required('Amount Paid is required'),
  advanceBondBank: Yup.string().required('Advance Bond Bank is required'),
  advanceBondAmount: Yup.number()
    .typeError('Advance Bond Amount must be a valid number')
    .min(0, 'Must be greater than or equal to 0')
    .required('Advance Bond Amount is required'),
  advanceBondExpiry: Yup.date().required('Advance Bond Expiry Date is required'),
});

function AdvancePaymentForm() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Fetch Projects on Load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to fetch projects',
          severity: 'error',
        });
      } finally {
        setIsLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      projectId: '',
      dateOfPayment: null,
      amountPaid: '',
      advanceBondBank: '',
      advanceBondAmount: '',
      advanceBondExpiry: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formattedValues = {
          project_id: values.projectId,
          date_of_payment: values.dateOfPayment?.format('YYYY-MM-DD'),
          amount_paid: parseLKR(values.amountPaid),
          advance_bond_bank: values.advanceBondBank,
          advance_bond_amount: parseLKR(values.advanceBondAmount),
          advance_bond_expiry: values.advanceBondExpiry?.format('YYYY-MM-DD'),
        };

        await advancePaymentService.create(formattedValues);
        setSnackbar({
          open: true,
          message: 'Advance payment details saved successfully!',
          severity: 'success',
        });
        formik.resetForm();
      } catch (error) {
        let errorMessage = 'Failed to save advance payment details';
        if (error.message.includes('foreign key constraint')) {
          errorMessage = 'Invalid project selected';
        } else if (error.message.includes('Duplicate entry')) {
          errorMessage = 'An advance payment already exists for this project';
        }
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', pt: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(to right bottom, #ffffff, #f8fafc)',
          borderRadius: 2
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Payment sx={{ fontSize: 28, color: 'primary.main', mr: 2 }} />
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600 }}>
            Advance Payment Details
          </Typography>
        </Box>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>

            {/* Section Header */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: 'secondary.main', fontWeight: 500, mb: 2 }}>
                Payment Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            {/* Date of Payment */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date of Payment"
                value={formik.values.dateOfPayment}
                onChange={(value) => formik.setFieldValue('dateOfPayment', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.dateOfPayment && Boolean(formik.errors.dateOfPayment),
                    helperText: formik.touched.dateOfPayment && formik.errors.dateOfPayment,
                    sx: { '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' } },
                  }
                }}
              />
            </Grid>

            {/* Amount Paid */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="amountPaid"
                name="amountPaid"
                label="Amount Paid"
                value={formatLKR(formik.values.amountPaid || '')}
                onChange={(e) => {
                  const parsed = parseLKR(e.target.value);
                  formik.setFieldValue('amountPaid', parsed);
                }}
                error={formik.touched.amountPaid && Boolean(formik.errors.amountPaid)}
                helperText={formik.touched.amountPaid && formik.errors.amountPaid}
                InputProps={{ startAdornment: <InputAdornment position="start">Rs</InputAdornment> }}
                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' } }}
              />
            </Grid>

            {/* Advance Bond Header */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: 'secondary.main', fontWeight: 500, mt: 2, mb: 2 }}>
                Advance Bond Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            {/* Bond Bank */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="advanceBondBank"
                name="advanceBondBank"
                label="Advance Bond Bank/Institute"
                value={formik.values.advanceBondBank}
                onChange={formik.handleChange}
                error={formik.touched.advanceBondBank && Boolean(formik.errors.advanceBondBank)}
                helperText={formik.touched.advanceBondBank && formik.errors.advanceBondBank}
                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' } }}
              />
            </Grid>

            {/* Bond Amount */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="advanceBondAmount"
                name="advanceBondAmount"
                label="Advance Bond Amount"
                value={formatLKR(formik.values.advanceBondAmount || '')}
                onChange={(e) => {
                  const parsed = parseLKR(e.target.value);
                  formik.setFieldValue('advanceBondAmount', parsed);
                }}
                error={formik.touched.advanceBondAmount && Boolean(formik.errors.advanceBondAmount)}
                helperText={formik.touched.advanceBondAmount && formik.errors.advanceBondAmount}
                InputProps={{ startAdornment: <InputAdornment position="start">Rs</InputAdornment> }}
                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' } }}
              />
            </Grid>

            {/* Bond Expiry Date */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Advance Bond Expiry Date"
                value={formik.values.advanceBondExpiry}
                onChange={(value) => formik.setFieldValue('advanceBondExpiry', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.advanceBondExpiry && Boolean(formik.errors.advanceBondExpiry),
                    helperText: formik.touched.advanceBondExpiry && formik.errors.advanceBondExpiry,
                    sx: { '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' } },
                  }
                }}
              />
            </Grid>

            {/* Project Selection */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                id="projectId"
                name="projectId"
                label="Project"
                value={formik.values.projectId}
                onChange={formik.handleChange}
                error={formik.touched.projectId && Boolean(formik.errors.projectId)}
                helperText={formik.touched.projectId && formik.errors.projectId}
                disabled={isLoadingProjects}
                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' } }}
              >
                {projects.map((project) => (
                  <MenuItem key={project.project_id} value={project.project_id}>
                    {project.project_no} - {project.project_description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Save />}
                disabled={isSubmitting || isLoadingProjects}
                sx={{
                  mt: 4, px: 4, py: 1.5, borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                  '&:hover': { boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)' },
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save Advance Payment Details'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdvancePaymentForm;
