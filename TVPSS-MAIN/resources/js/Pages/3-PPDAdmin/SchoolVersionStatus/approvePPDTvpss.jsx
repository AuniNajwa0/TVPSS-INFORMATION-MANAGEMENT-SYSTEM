import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Chip,
} from "@mui/material";
import { CheckCircle, Close, ArrowForward, Done, Clear } from "@mui/icons-material";
import { Head, usePage } from "@inertiajs/react";
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
    } = tvpssData;

    const normalizeValue = (value) => (value || "").trim().toUpperCase();

    return (
        <AuthenticatedLayout
            header={
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#455185" }}
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
                        <Card sx={{ flex: 1 }}>
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
                                        }}
                                    >
                                        {schoolName}
                                    </Typography>
                                </Box>

                                {/* Info Sekolah */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    A. Info Sekolah
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    Pegawai TVPSS Sekolah:{" "}
                                    <strong>{officer}</strong>
                                </Typography>

                                {/* Info TVPSS */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    B. Info TVPSS Sekolah
                                </Typography>
                                <Box mt={2}>
                                    {Object.entries(info).map(
                                        ([key, value], index) => (
                                            <Box
                                                key={index}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                mb={1}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        flex: 1,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        )
                                                        .replace(/^\w/, (c) =>
                                                            c.toUpperCase()
                                                        )}
                                                    :
                                                </Typography>
                                                <Chip
                                                    label={value}
                                                    sx={{
                                                        bgcolor:
                                                            normalizeValue(
                                                                value
                                                            ) === "ADA"
                                                                ? "#E8F5E9"
                                                                : "#FFEBEE",
                                                        color:
                                                            normalizeValue(
                                                                value
                                                            ) === "ADA"
                                                                ? "#388E3C"
                                                                : "#D32F2F",
                                                        fontWeight: "bold",
                                                    }}
                                                    icon={
                                                        normalizeValue(
                                                            value
                                                        ) === "ADA" ? (
                                                            <CheckCircle
                                                                sx={{
                                                                    color: "#388E3C",
                                                                }}
                                                            />
                                                        ) : (
                                                            <Close
                                                                sx={{
                                                                    color: "#D32F2F",
                                                                }}
                                                            />
                                                        )
                                                    }
                                                />
                                            </Box>
                                        )
                                    )}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Right Section */}
                        <Card
                            sx={{
                                flex: 1,
                                backgroundColor: "#F8F9FE",
                                textAlign: "center",
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
                                    color="textSecondary"
                                    mb={3}
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

                                <Card
                                    sx={{
                                        p: 3,
                                        bgcolor: "white",
                                        boxShadow:
                                            "0px 2px 4px rgba(0,0,0,0.1)",
                                        borderRadius: "8px",
                                    }}
                                >
                                    {Object.entries(info).map(
                                        ([key, value], index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    mb: 1,
                                                }}
                                            >
                                                <CheckCircle
                                                    sx={{
                                                        color:
                                                            normalizeValue(
                                                                value
                                                            ) === "ADA"
                                                                ? "#388E3C"
                                                                : "#D32F2F",
                                                        mr: 1,
                                                        fontSize: 20,
                                                    }}
                                                />
                                                <Typography variant="body2">
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        )
                                                        .replace(/^\w/, (c) =>
                                                            c.toUpperCase()
                                                        )}
                                                </Typography>
                                            </Box>
                                        )
                                    )}
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
                                </Card>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};

export default ApprovePPDTvpss;
