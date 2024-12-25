import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Chip,
} from "@mui/material";
import {
    Done,
    Clear,
} from "@mui/icons-material";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import StateAdminSideBar from "../StateAdminSideBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const ApproveStateTvpss = () => {
    const { tvpssData = {} } = usePage().props;

    const {
        schoolName = "N/A",
        officer = "N/A",
        info = {},
        schoolCode = "",
    } = tvpssData;

    const normalizeValue = (value) => (value || "").trim().toUpperCase();

    const descriptiveFields = [
        { label: "Logo TVPSS", value: info.isTvpssLogo },
        { label: "Corner/ Mini/ TV Studio", value: info.studio },
        { label: "Upload di YouTube", value: info.youtube },
        { label: "Rakaman dalam Sekolah", value: info.inSchoolRecording },
        { label: "Rakaman dalam dan luar Sekolah", value: info.outSchoolRecording },
        { label: "Berkolaborat dengan agensi luar", value: info.collaboration },
        { label: "Penggunaan Teknologi 'Green Screen'", value: info.greenScreen },
    ];

    const handleApprove = () => {
        if (!schoolCode) {
            alert("School Code is missing. Unable to proceed.");
            return;
        }
        Inertia.post(`/tvpssInfoState/${schoolCode}/approve`, {}, {
            onSuccess: () => {
                alert("TVPSS Version successfully approved!");
            },
            onError: (error) => {
                console.error("Approval error:", error);
                alert("Failed to approve TVPSS Version.");
            },
        });
    };    

    const handleReject = () => {
        if (!schoolCode) {
            alert("School Code is missing. Unable to proceed.");
            return;
        }
        Inertia.post(`/tvpssInfoState/${schoolCode}/reject`, {}, {
            onSuccess: () => {
                alert("TVPSS Version has been rejected!");
            },
            onError: (error) => {
                console.error("Rejection error:", error);
                alert("Failed to reject TVPSS Version.");
            },
        });
    };    

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#455185", fontSize: "1.5rem", mb: 0.5 }}>
                    Info Status TVPSS
                </Typography>
            }
        >
            <Head title="TVPSS | Kemaskini TVPSS Sekolah" />
            <Box display="flex">
                <Box width="20%" bgcolor="#455185" color="white" minHeight="100vh" p={2}>
                    <StateAdminSideBar />
                </Box>

                <Box width="80%" p={4} sx={{ backgroundColor: "#F7F9FC" }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 2, color: "#666", fontSize: "0.875rem" }}>
                        <Typography>Pengurusan TVPSS</Typography>
                        <Typography>›</Typography>
                        <Typography>Butiran Sekolah</Typography>
                        <Typography>›</Typography>
                        <Typography>{schoolName}</Typography>
                    </Box>

                    <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#455185" }}>
                        Maklumat Sekolah
                    </Typography>

                    <Card sx={{ mb: 4, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                        <CardContent>
                            <Box sx={{ bgcolor: "#455185", p: 2, borderRadius: "4px", mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", fontSize: "1rem" }}>
                                    {schoolName} (JEA1059)
                                </Typography>
                            </Box>

                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                A. Info Sekolah
                            </Typography>
                            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body1">Pegawai TVPSS Sekolah:</Typography>
                                <Box component="span" sx={{ bgcolor: "#E8EAF6", px: 1, py: 0.5, borderRadius: 1 }}>
                                    {officer}
                                </Box>
                            </Box>

                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                                B. Info TVPSS Sekolah
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {descriptiveFields.map((field, index) => (
                                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: index !== descriptiveFields.length - 1 ? '1px solid #eee' : 'none', pb: 1 }}>
                                        <Typography sx={{ color: '#666' }}>{field.label} :</Typography>
                                        <Chip
                                            label={normalizeValue(field.value)}
                                            sx={{
                                                bgcolor: "#E8EAF6",
                                                color: "#455185",
                                                height: "24px"
                                            }}
                                            size="small"
                                        />
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Done />}
                                    onClick={handleApprove}
                                    sx={{
                                        bgcolor: "#4CAF50",
                                        "&:hover": { bgcolor: "#45A049" },
                                        fontWeight: "bold",
                                        width: "150px"
                                    }}
                                >
                                    Diterima
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<Clear />}
                                    onClick={handleReject}
                                    sx={{
                                        bgcolor: "#F44336",
                                        "&:hover": { bgcolor: "#E53935" },
                                        fontWeight: "bold",
                                        width: "150px"
                                    }}
                                >
                                    Ditolak
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};

export default ApproveStateTvpss;