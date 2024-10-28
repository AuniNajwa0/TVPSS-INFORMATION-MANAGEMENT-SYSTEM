package com.tvpss.model;

import java.util.List;

public class SchoolAdmin {
    private String asID;
    private List<School> manages;
    private List<Equipment> managesEquipment;

    // Getters and Setters
    public String getAsID() {
        return asID;
    }

    public void setAsID(String asID) {
        this.asID = asID;
    }

    public List<School> getManages() {
        return manages;
    }

    public void setManages(List<School> manages) {
        this.manages = manages;
    }

    public List<Equipment> getManagesEquipment() {
        return managesEquipment;
    }

    public void setManagesEquipment(List<Equipment> managesEquipment) {
        this.managesEquipment = managesEquipment;
    }
}
