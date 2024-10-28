package com.tvpss.model;

import java.util.List;

public class PPDAdmin {
    private String apID;
    private List<SchoolAdmin> manages;

    // Getters and Setters
    public String getApID() {
        return apID;
    }

    public void setApID(String apID) {
        this.apID = apID;
    }

    public List<SchoolAdmin> getManages() {
        return manages;
    }

    public void setManages(List<SchoolAdmin> manages) {
        this.manages = manages;
    }
}
