import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Assessment,
  Receipt,
  AttachMoney,
  TimerOutlined,
  DownloadOutlined,
  PictureAsPdf,
  TableChart,
  InsertDriveFile,
} from '@mui/icons-material';

function Reports() {
  const projectSummary = {
    totalProjects: 5,
    ongoingProjects: 3,
    completedProjects: 2,
    totalValue: 1500000,
  };

  const recentPayments = [
    { date: '2025-04-20', billNo: 'BILL-001', amount: 50000, status: 'Paid' },
    { date: '2025-04-15', billNo: 'BILL-002', amount: 75000, status: 'Pending' },
    { date: '2025-04-10', billNo: 'BILL-003', amount: 60000, status: 'Paid' },
  ];

  const generateReport = (reportType) => {
    console.log(`Generating ${reportType} report...`);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', pt: 1 }}>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2563eb11 0%, #2563eb05 100%)',
              border: '1px solid rgba(37, 99, 235, 0.1)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Assessment sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                Total Projects
              </Typography>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                {projectSummary.totalProjects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f59e0b11 0%, #f59e0b05 100%)',
              border: '1px solid rgba(245, 158, 11, 0.1)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <TimerOutlined sx={{ fontSize: 40, mb: 2, color: 'warning.main' }} />
              <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                Ongoing Projects
              </Typography>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
                {projectSummary.ongoingProjects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #10b98111 0%, #10b98105 100%)',
              border: '1px solid rgba(16, 185, 129, 0.1)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Receipt sx={{ fontSize: 40, mb: 2, color: 'success.main' }} />
              <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                Completed Projects
              </Typography>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                {projectSummary.completedProjects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #3b82f611 0%, #3b82f605 100%)',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <AttachMoney sx={{ fontSize: 40, mb: 2, color: 'info.main' }} />
              <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
                ${(projectSummary.totalValue / 1000000).toFixed(2)}M
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Payments Table */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(to right bottom, #ffffff, #f8fafc)',
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: 'secondary.main',
            fontWeight: 600,
            mb: 3
          }}
        >
          Recent Payments
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'secondary.main' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'secondary.main' }}>Bill No</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: 'secondary.main' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'secondary.main' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow 
                  key={payment.billNo}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.billNo}</TableCell>
                  <TableCell align="right">${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: payment.status === 'Paid' ? 'success.main' : 'warning.main',
                        backgroundColor: payment.status === 'Paid' ? 'success.light' : 'warning.light',
                        py: 0.5,
                        px: 1.5,
                        borderRadius: 1,
                        display: 'inline-block',
                        fontWeight: 500,
                      }}
                    >
                      {payment.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Report Generation Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 2,
          background: 'linear-gradient(to right bottom, #ffffff, #f8fafc)',
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: 'secondary.main',
            fontWeight: 600,
            mb: 3
          }}
        >
          Generate Reports
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => generateReport('summary')}
              fullWidth
              sx={{ 
                p: 2,
                borderRadius: 2,
                textAlign: 'left',
                borderWidth: '1px',
                '&:hover': {
                  borderWidth: '1px',
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                }
              }}
            >
              <Box>
                <PictureAsPdf sx={{ mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  Project Summary
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => generateReport('financial')}
              fullWidth
              sx={{ 
                p: 2,
                borderRadius: 2,
                textAlign: 'left',
                borderWidth: '1px',
                '&:hover': {
                  borderWidth: '1px',
                  backgroundColor: 'secondary.light',
                  color: 'secondary.main',
                }
              }}
            >
              <Box>
                <TableChart sx={{ mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  Financial Report
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              color="info"
              onClick={() => generateReport('progress')}
              fullWidth
              sx={{ 
                p: 2,
                borderRadius: 2,
                textAlign: 'left',
                borderWidth: '1px',
                '&:hover': {
                  borderWidth: '1px',
                  backgroundColor: 'info.light',
                  color: 'info.main',
                }
              }}
            >
              <Box>
                <Assessment sx={{ mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  Progress Report
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => generateReport('completion')}
              fullWidth
              sx={{ 
                p: 2,
                borderRadius: 2,
                textAlign: 'left',
                borderWidth: '1px',
                '&:hover': {
                  borderWidth: '1px',
                  backgroundColor: 'success.light',
                  color: 'success.main',
                }
              }}
            >
              <Box>
                <InsertDriveFile sx={{ mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  Completion Report
                </Typography>
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Reports;