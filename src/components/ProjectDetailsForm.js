import React, { useState } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { formatLKR, parseLKR } from '../utils/formatters';
import { projectService } from '../utils/api';

const validationSchema = Yup.object({
  projectNo: Yup.string().required('Project No is required'),
  projectDescription: Yup.string().required('Project Description is required'),
  district: Yup.string().required('District is required'),
  dsDivision: Yup.string().required('DS Division is required'),
  fundSource: Yup.string().required('Fund Source is required'),
  voteDetails: Yup.string().required('Vote Details is required'),
  totalCostEstimate: Yup.number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsed = Number(parseLKR(originalValue));
        return isNaN(parsed) ? undefined : parsed;
      }
      return value;
    })
    .typeError('Must be a valid number')
    .min(0, 'Must be greater than or equal to 0')
    .required('Total Cost Estimate is required'),
  beneficiaries: Yup.number()
    .integer('Must be a whole number')
    .min(0, 'Must be greater than or equal to 0')
    .required('Number of Beneficiaries is required')
    .transform((value) => (isNaN(value) ? undefined : value)),
  output: Yup.string().required('Output is required'),
  outcome: Yup.string().required('Outcome is required'),
  feasibilityStudies: Yup.string().required('Feasibility Studies is required'),
  relevantPc: Yup.string().required('Relevant PC is required'),
});

function ProjectDetailsForm() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const formik = useFormik({
    initialValues: {
      projectNo: '',
      projectDescription: '',
      district: '',
      dsDivision: '',
      fundSource: '',
      voteDetails: '',
      totalCostEstimate: '',
      beneficiaries: '',
      output: '',
      outcome: '',
      feasibilityStudies: '',
      relevantPc: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formattedValues = {
          project_no: values.projectNo,
          project_description: values.projectDescription,
          district: values.district,
          ds_division: values.dsDivision,
          fund_source: values.fundSource,
          vote_details: values.voteDetails,
          total_cost_estimate: parseLKR(values.totalCostEstimate),
          beneficiaries: Number(values.beneficiaries),
          output: values.output,
          outcome: values.outcome,
          feasibility_studies: values.feasibilityStudies,
          relevant_pc: values.relevantPc,
        };
        
        await projectService.create(formattedValues);
        setSnackbar({
          open: true,
          message: 'Project details saved successfully!',
          severity: 'success',
        });
        formik.resetForm();
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || 'Failed to save project details',
          severity: 'error',
        });
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
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            color: 'primary.main',
            fontWeight: 600,
            mb: 3
          }}
        >
          Project Details
        </Typography>
        
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'secondary.main',
                  fontWeight: 500,
                  mb: 2
                }}
              >
                Basic Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="projectNo"
                name="projectNo"
                label="Project No"
                value={formik.values.projectNo}
                onChange={formik.handleChange}
                error={formik.touched.projectNo && Boolean(formik.errors.projectNo)}
                helperText={formik.touched.projectNo && formik.errors.projectNo}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="projectDescription"
                name="projectDescription"
                label="Project Description"
                multiline
                rows={4}
                value={formik.values.projectDescription}
                onChange={formik.handleChange}
                error={formik.touched.projectDescription && Boolean(formik.errors.projectDescription)}
                helperText={formik.touched.projectDescription && formik.errors.projectDescription}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

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
                Location Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="district"
                name="district"
                label="District"
                value={formik.values.district}
                onChange={formik.handleChange}
                error={formik.touched.district && Boolean(formik.errors.district)}
                helperText={formik.touched.district && formik.errors.district}
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
                id="dsDivision"
                name="dsDivision"
                label="DS Division"
                value={formik.values.dsDivision}
                onChange={formik.handleChange}
                error={formik.touched.dsDivision && Boolean(formik.errors.dsDivision)}
                helperText={formik.touched.dsDivision && formik.errors.dsDivision}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

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
                Financial Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="fundSource"
                name="fundSource"
                label="Fund Source"
                value={formik.values.fundSource}
                onChange={formik.handleChange}
                error={formik.touched.fundSource && Boolean(formik.errors.fundSource)}
                helperText={formik.touched.fundSource && formik.errors.fundSource}
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
                id="voteDetails"
                name="voteDetails"
                label="Vote Details"
                value={formik.values.voteDetails}
                onChange={formik.handleChange}
                error={formik.touched.voteDetails && Boolean(formik.errors.voteDetails)}
                helperText={formik.touched.voteDetails && formik.errors.voteDetails}
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
                id="totalCostEstimate"
                name="totalCostEstimate"
                label="Total Cost Estimate"
                value={formik.values.totalCostEstimate ? formatLKR(formik.values.totalCostEstimate) : ''}
                onChange={(e) => {
                  const parsed = parseLKR(e.target.value);
                  formik.setFieldValue('totalCostEstimate', parsed);
                }}
                error={formik.touched.totalCostEstimate && Boolean(formik.errors.totalCostEstimate)}
                helperText={formik.touched.totalCostEstimate && formik.errors.totalCostEstimate}
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
                id="beneficiaries"
                name="beneficiaries"
                label="Number of Beneficiaries"
                type="number"
                value={formik.values.beneficiaries}
                onChange={formik.handleChange}
                error={formik.touched.beneficiaries && Boolean(formik.errors.beneficiaries)}
                helperText={formik.touched.beneficiaries && formik.errors.beneficiaries}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

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
                Project Outcomes
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="output"
                name="output"
                label="Output"
                multiline
                rows={3}
                value={formik.values.output}
                onChange={formik.handleChange}
                error={formik.touched.output && Boolean(formik.errors.output)}
                helperText={formik.touched.output && formik.errors.output}
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
                id="outcome"
                name="outcome"
                label="Outcome"
                multiline
                rows={3}
                value={formik.values.outcome}
                onChange={formik.handleChange}
                error={formik.touched.outcome && Boolean(formik.errors.outcome)}
                helperText={formik.touched.outcome && formik.errors.outcome}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="feasibilityStudies"
                name="feasibilityStudies"
                label="Feasibility Studies"
                multiline
                rows={4}
                value={formik.values.feasibilityStudies}
                onChange={formik.handleChange}
                error={formik.touched.feasibilityStudies && Boolean(formik.errors.feasibilityStudies)}
                helperText={formik.touched.feasibilityStudies && formik.errors.feasibilityStudies}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="relevantPc"
                name="relevantPc"
                label="Relevant PC"
                value={formik.values.relevantPc}
                onChange={formik.handleChange}
                error={formik.touched.relevantPc && Boolean(formik.errors.relevantPc)}
                helperText={formik.touched.relevantPc && formik.errors.relevantPc}
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
                Save Project Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

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

export default ProjectDetailsForm;