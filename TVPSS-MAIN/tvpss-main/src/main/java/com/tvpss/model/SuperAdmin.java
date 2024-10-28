package com.tvpss.model;

import java.util.List;

public class SuperAdmin {
    private String salID;
    private List<StateAdmin> manages;

    // Getters and Setters
    public String getSalID() {
        return salID;
    }

    public void setSalID(String salID) {
        this.salID = salID;
    }

    public List<StateAdmin> getManages() {
        return manages;
    }

    public void setManages(List<StateAdmin> manages) {
        this.manages = manages;
    }
}
