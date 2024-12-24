import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
} from "@mui/material";
import {
    CheckCircle,
    Close,
    ArrowForward,
    Done,
    Clear,
} from "@mui/icons-material";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import PPDAdminSideBar from "../PPDAdminSideBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const ApprovePPDTvpss = () => {
    const { props } = usePage();
    const tvpssData = props?.tvpssData || {};

    const {
        schoolName = "N/A",
        officer = "N/A",
        info = {},
        currentVersion = 0,
        nextVersion = 0,
        schoolCode = "",
    } = tvpssData;

    const normalizeValue = (value) => (value || "").trim().toUpperCase();

    const descriptiveFields = [
        { label: "Logo TVPSS", value: info.isTvpssLogo },
        { label: "Corner/ Mini/ TV Studio", value: info.studio },
        { label: "Upload di YouTube", value: info.youtube },
        { label: "Rakaman dalam Sekolah", value: info.inSchoolRecording },
        {
            label: "Rakaman dalam dan luar Sekolah",
            value: info.outSchoolRecording,
        },
        { label: "Berkolaborat dengan agensi luar", value: info.collaboration },
        {
            label: "Penggunaan Teknologi 'Green Screen'",
            value: info.greenScreen,
        },
    ];

    const [checkboxStates, setCheckboxStates] = useState(
        descriptiveFields.reduce(
            (acc, field) => ({
                ...acc,
                [field.label]: normalizeValue(field.value) === "ADA",
            }),
            {}
        )
    );

    const handleCheckboxChange = (label) => {
        setCheckboxStates((prevState) => ({
            ...prevState,
            [label]: !prevState[label],
        }));
    };

    const handleApprove = () => {
        console.log("Approving schoolCode:", tvpssData.schoolCode);
        Inertia.post(`/tvpssInfoPPD/${schoolCode}/approve`, {}, {
            onSuccess: () => {
                alert("TVPSS has been approved!");
            },
            onError: (error) => {
                console.error("Approval error:", error);
                alert("Failed to approve TVPSS.");
            },
        });
    };

    const handleReject = () => {
        console.log("Rejecting schoolCode:", tvpssData.schoolCode);
        Inertia.post(`/tvpssInfoPPD/${schoolCode}/reject`, {}, {
            onSuccess: () => {
                alert("TVPSS has been rejected!");
            },
            onError: (error) => {
                console.error("Rejection error:", error);
                alert("Failed to reject TVPSS.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "#455185",
                        fontSize: "1.5rem",
                        marginBottom: "0.5rem",
                    }}
                >
                    Info Status TVPSS
                </Typography>
            }
        >
            <Head title="TVPSS | Kemaskini TVPSS Sekolah" />
            <Box display="flex">
                {/* Sidebar */}
                <Box
                    width="20%"
                    bgcolor="#455185"
                    color="white"
                    minHeight="100vh"
                    p={2}
                >
                    <PPDAdminSideBar />
                </Box>

                {/* Main Content */}
                <Box width="80%" p={4} sx={{ backgroundColor: "#F7F9FC" }}>
                    {/* Breadcrumb */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            mb: 2,
                            color: "#666",
                            fontSize: "0.875rem",
                        }}
                    >
                        <Typography>Informasi TVPSS Sekolah</Typography>
                        <Typography>›</Typography>
                        <Typography>Info Status TVPSS</Typography>
                        <Typography>›</Typography>
                        <Typography>{schoolName}</Typography>
                    </Box>

                    <Typography
                        variant="h5"
                        sx={{ mb: 3, fontWeight: "bold", color: "#455185" }}
                    >
                        Maklumat Sekolah
                    </Typography>

                    <Box
                        display="flex"
                        gap={4}
                        sx={{
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Left Section */}
                        <Card
                            sx={{
                                flex: 1,
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        bgcolor: "#455185",
                                        p: 2,
                                        borderRadius: "4px",
                                        mb: 3,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {schoolName}
                                    </Typography>
                                </Box>

                                {/* Info Sekolah */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: "bold", mb: 1 }}
                                >
                                    A. Info Sekolah
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    Pegawai TVPSS Sekolah:{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            bgcolor: "#E8EAF6",
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            display: "inline-block",
                                        }}
                                    >
                                        {officer}
                                    </Box>
                                </Typography>

                                {/* Info TVPSS */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: "bold", mb: 2 }}
                                >
                                    B. Info TVPSS Sekolah
                                </Typography>
                                <Box mt={2}>
                                    {descriptiveFields.map((field, index) => (
                                        <Box
                                            key={index}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            mb={1.5}
                                            sx={{
                                                "&:not(:last-child)": {
                                                    borderBottom:
                                                        "1px solid #eee",
                                                    pb: 1,
                                                },
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    flex: 1,
                                                    color: "#444",
                                                }}
                                            >
                                                {field.label} :
                                            </Typography>
                                            <Chip
                                                label={normalizeValue(
                                                    field.value
                                                )}
                                                sx={{
                                                    bgcolor: "#E8EAF6",
                                                    color: "#455185",
                                                    fontSize: "0.75rem",
                                                    height: "24px",
                                                    fontWeight: "normal",
                                                }}
                                                size="small"
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Right Section */}
                        <Card
                            sx={{
                                flex: 1,
                                backgroundColor: "#F8F9FE",
                                textAlign: "center",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#455185",
                                        mb: 1,
                                    }}
                                >
                                    PENUHI KEPERLUAN
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#666",
                                        mb: 3,
                                        textDecoration: "underline",
                                    }}
                                >
                                    Naik Taraf Status Versi
                                </Typography>

                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap={2}
                                    mb={4}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: "#455185",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {currentVersion}
                                    </Typography>
                                    <ArrowForward sx={{ color: "#455185" }} />
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: "#FF0000",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {nextVersion}
                                    </Typography>
                                </Box>

                                <Box>
                                    {descriptiveFields.map((field, index) => (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                    checked={
                                                        checkboxStates[
                                                            field.label
                                                        ]
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            field.label
                                                        )
                                                    }
                                                    sx={{
                                                        color: "#455185",
                                                        "&.Mui-checked": {
                                                            color: "#455185",
                                                        },
                                                    }}
                                                />
                                            }
                                            label={field.label}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "left",
                                                //justifyContent: "space-between",
                                                color: "#455185",
                                                mb: 1,
                                                ml: 0,
                                                width: "100%",
                                                ".MuiFormControlLabel-label": {
                                                    fontSize: "0.875rem",
                                                    fontWeight: "normal",
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    gap={2}
                                    mt={3}
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<Done />}
                                        fullWidth
                                        onClick={handleApprove} 
                                        sx={{
                                            bgcolor: "#4CAF50",
                                            "&:hover": {
                                                bgcolor: "#45A049",
                                            },
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Diterima
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Clear />}
                                        fullWidth
                                        onClick={handleReject}
                                        sx={{
                                            bgcolor: "#F44336",
                                            "&:hover": {
                                                bgcolor: "#E53935",
                                            },
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Ditolak
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};

export default ApprovePPDTvpss;
