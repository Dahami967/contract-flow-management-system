import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Save, History } from '@mui/icons-material';
import { formatLKR, parseLKR } from '../utils/formatters';

const validationSchema = Yup.object({
  contractExtensionDate: Yup.date().nullable(),
  contractExtensionDetails: Yup.string().nullable(),
  advanceBondExtensionDate: Yup.date().nullable(),
  advanceBondExtensionDetails: Yup.string().nullable(),
  performanceBondExtensionDate: Yup.date().nullable(),
  performanceBondExtensionDetails: Yup.string().nullable(),
  variationDate: Yup.date().nullable(),
  vvariationAmount: Yup.number()
  .transform((value, originalValue) => {
    const parsed = parseFloat(parseLKR(originalValue));
    return isNaN(parsed) ? undefined : parsed;
  })
  .typeError('Must be a valid number')
  .min(0, 'Must be greater than or equal to 0')
  .nullable(),

  variationPercentage: Yup.number()
    .transform((value) => (value === '' ? null : Number(value)))
    .min(0, 'Must be greater than or equal to 0')
    .max(100, 'Cannot exceed 100%')
    .nullable(),
  notes: Yup.string().nullable(),
});

function AdjustmentsForm() {
  const formik = useFormik({
    initialValues: {
      contractExtensionDate: null,
      contractExtensionDetails: '',
      advanceBondExtensionDate: null,
      advanceBondExtensionDetails: '',
      performanceBondExtensionDate: null,
      performanceBondExtensionDetails: '',
      variationDate: null,
      variationAmount: '',
      variationPercentage: '',
      notes: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        variationAmount: parseLKR(values.variationAmount),
      };
      console.log('Form values:', formattedValues);
    },
  });

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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <History 
            sx={{ 
              fontSize: 28, 
              color: 'primary.main',
              mr: 2
            }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 600
            }}
          >
            Contract Adjustments
          </Typography>
        </Box>
        
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Contract Extension Section */}
            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'secondary.main',
                  fontWeight: 500,
                  mb: 2
                }}
              >
                Contract Extension
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Contract Extension Date"
                value={formik.values.contractExtensionDate}
                onChange={(value) => formik.setFieldValue('contractExtensionDate', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.contractExtensionDate && Boolean(formik.errors.contractExtensionDate),
                    helperText: formik.touched.contractExtensionDate && formik.errors.contractExtensionDate,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#ffffff'
                      }
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="contractExtensionDetails"
                name="contractExtensionDetails"
                label="Extension Details"
                multiline
                rows={2}
                value={formik.values.contractExtensionDetails}
                onChange={formik.handleChange}
                error={formik.touched.contractExtensionDetails && Boolean(formik.errors.contractExtensionDetails)}
                helperText={formik.touched.contractExtensionDetails && formik.errors.contractExtensionDetails}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            {/* Bond Extensions Section */}
            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'secondary.main',
                  fontWeight: 500,
                  mb: 2,
                  mt: 2
                }}
              >
                Bond Extensions
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Advance Bond Extension Date"
                value={formik.values.advanceBondExtensionDate}
                onChange={(value) => formik.setFieldValue('advanceBondExtensionDate', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.advanceBondExtensionDate && Boolean(formik.errors.advanceBondExtensionDate),
                    helperText: formik.touched.advanceBondExtensionDate && formik.errors.advanceBondExtensionDate,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#ffffff'
                      }
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="advanceBondExtensionDetails"
                name="advanceBondExtensionDetails"
                label="Advance Bond Extension Details"
                multiline
                rows={2}
                value={formik.values.advanceBondExtensionDetails}
                onChange={formik.handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Performance Bond Extension Date"
                value={formik.values.performanceBondExtensionDate}
                onChange={(value) => formik.setFieldValue('performanceBondExtensionDate', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.performanceBondExtensionDate && Boolean(formik.errors.performanceBondExtensionDate),
                    helperText: formik.touched.performanceBondExtensionDate && formik.errors.performanceBondExtensionDate,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#ffffff'
                      }
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="performanceBondExtensionDetails"
                name="performanceBondExtensionDetails"
                label="Performance Bond Extension Details"
                multiline
                rows={2}
                value={formik.values.performanceBondExtensionDetails}
                onChange={formik.handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            {/* Variations Section */}
            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'secondary.main',
                  fontWeight: 500,
                  mb: 2,
                  mt: 2
                }}
              >
                Approved Variations
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Variation Date"
                value={formik.values.variationDate}
                onChange={(value) => formik.setFieldValue('variationDate', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.variationDate && Boolean(formik.errors.variationDate),
                    helperText: formik.touched.variationDate && formik.errors.variationDate,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#ffffff'
                      }
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="variationAmount"
                name="variationAmount"
                label="Variation Amount"
                value={formik.values.variationAmount ? formatLKR(formik.values.variationAmount) : ''}
                onChange={(e) => {
                  const parsed = parseLKR(e.target.value);
                  formik.setFieldValue('variationAmount', parsed);
                }}
                error={formik.touched.variationAmount && Boolean(formik.errors.variationAmount)}
                helperText={formik.touched.variationAmount && formik.errors.variationAmount}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="variationPercentage"
                name="variationPercentage"
                label="Variation Percentage"
                type="number"
                value={formik.values.variationPercentage}
                onChange={formik.handleChange}
                error={formik.touched.variationPercentage && Boolean(formik.errors.variationPercentage)}
                helperText={formik.touched.variationPercentage && formik.errors.variationPercentage}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            {/* Notes Section */}
            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'secondary.main',
                  fontWeight: 500,
                  mb: 2,
                  mt: 2
                }}
              >
                Additional Notes
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="notes"
                name="notes"
                label="Notes"
                multiline
                rows={4}
                value={formik.values.notes}
                onChange={formik.handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Save />}
                sx={{ 
                  mt: 4,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)',
                  }
                }}
              >
                Save Adjustments
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AdjustmentsForm;