package com.tvpss.model;

import java.util.List;

public class StateAdmin {
    private String adID;
    private List<PPDAdmin> manages;

    // Getters and Setters
    public String getAdID() {
        return adID;
    }

    public void setAdID(String adID) {
        this.adID = adID;
    }

    public List<PPDAdmin> getManages() {
        return manages;
    }

    public void setManages(List<PPDAdmin> manages) {
        this.manages = manages;
    }
}
