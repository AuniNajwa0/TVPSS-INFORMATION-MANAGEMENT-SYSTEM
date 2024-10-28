package com.tvpss.model;

public class SchoolVersion {
    private String versionLevel;
    private VersionType versionType;
    private School school;
    private SchoolAdmin validatedBy;

    // Getters and Setters
    public String getVersionLevel() {
        return versionLevel;
    }

    public void setVersionLevel(String versionLevel) {
        this.versionLevel = versionLevel;
    }

    public VersionType getVersionType() {
        return versionType;
    }

    public void setVersionType(VersionType versionType) {
        this.versionType = versionType;
    }

    public School getSchool() {
        return school;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public SchoolAdmin getValidatedBy() {
        return validatedBy;
    }

    public void setValidatedBy(SchoolAdmin validatedBy) {
        this.validatedBy = validatedBy;
    }
}
