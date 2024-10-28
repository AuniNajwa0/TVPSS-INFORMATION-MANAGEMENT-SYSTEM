package com.tvpss.model;

import java.util.List;

public class Certificate {
    private String name;
    private String icNumber;
    private String generatedBy;
    private List<SchoolVersion> schoolVersions;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcNumber() {
        return icNumber;
    }

    public void setIcNumber(String icNumber) {
        this.icNumber = icNumber;
    }

    public String getGeneratedBy() {
        return generatedBy;
    }

    public void setGeneratedBy(String generatedBy) {
        this.generatedBy = generatedBy;
    }

    public List<SchoolVersion> getSchoolVersions() {
        return schoolVersions;
    }

    public void setSchoolVersions(List<SchoolVersion> schoolVersions) {
        this.schoolVersions = schoolVersions;
    }
}
