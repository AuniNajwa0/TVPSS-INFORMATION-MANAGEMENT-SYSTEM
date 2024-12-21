import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, Chip, Divider } from '@mui/material';
import { CheckCircle, ArrowForward } from '@mui/icons-material';
import PPDAdminSideBar from './PPDAdminSideBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ApprovePPDTvpss = () => {
    const tvpssData = {
        schoolName: "SMK Mutiara Rini (JEA1059)",
        officer: "PN. ISMARIATULADLINA BINTI ISMAIL",
        info: {
            tvpssLogo: "ADA",
            studio: "ADA",
            youtube: "ADA",
            inSchoolRecording: "ADA",
            outSchoolRecording: "ADA",
            collaboration: "ADA",
            greenScreen: "ADA",
        },
        currentVersion: 3,
        nextVersion: 4,
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#455185' }}>
                    Maklumat Sekolah
                </Typography>
            }
        >
            <Box display="flex">
                <Box width="20%" bgcolor="#455185" color="white" minHeight="100vh" p={2}>
                    <PPDAdminSideBar />
                </Box>

                <Box width="80%" p={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#455185' }}>
                                {tvpssData.schoolName}
                            </Typography>

                            <Grid container spacing={2}>
                                {/* School Info Section */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        A. Info Sekolah
                                    </Typography>
                                    <Typography variant="body1">
                                        Pegawai TVPSS Sekolah: <strong>{tvpssData.officer}</strong>
                                    </Typography>
                                </Grid>

                                {/* TVPSS Info Section */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        B. Info TVPSS Sekolah
                                    </Typography>
                                    <Box mt={2}>
                                        {Object.entries(tvpssData.info).map(([key, value], index) => (
                                            <Box key={index} display="flex" alignItems="center" mb={1}>
                                                <Typography variant="body2" sx={{ flex: 1, fontWeight: 'bold' }}>
                                                    {key
                                                        .replace(/([A-Z])/g, " $1")
                                                        .replace(/^\w/, (c) => c.toUpperCase())} :
                                                </Typography>
                                                <Chip
                                                    label={value}
                                                    color={value === "ADA" ? "success" : "default"}
                                                    icon={value === "ADA" ? <CheckCircle /> : null}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            {/* Upgrade Status Section */}
                            <Box textAlign="center">
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#455185' }}>
                                    Penuhi Keperluan
                                </Typography>
                                <Typography variant="h4" sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                    {tvpssData.currentVersion}
                                    <ArrowForward sx={{ color: 'red' }} />
                                    {tvpssData.nextVersion}
                                </Typography>

                                <Card sx={{ mx: 'auto', p: 3, maxWidth: 500, backgroundColor: '#F7F9FC' }}>
                                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                                        Keperluan untuk Naik Taraf:
                                    </Typography>
                                    <Box display="flex" flexDirection="column" alignItems="start">
                                        {Object.entries(tvpssData.info).map(([key, value], index) => (
                                            <Box key={index} display="flex" alignItems="center" mb={1}>
                                                <CheckCircle
                                                    sx={{
                                                        color: value === "ADA" ? "green" : "gray",
                                                        mr: 1,
                                                    }}
                                                />
                                                <Typography variant="body2">
                                                    {key
                                                        .replace(/([A-Z])/g, " $1")
                                                        .replace(/^\w/, (c) => c.toUpperCase())}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ mt: 3 }}
                                    >
                                        Kemaskini Status TVPSS
                                    </Button>
                                </Card>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};

export default ApprovePPDTvpss;
