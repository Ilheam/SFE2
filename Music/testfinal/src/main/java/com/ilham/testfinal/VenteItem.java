package com.ilham.testfinal;

public class VenteItem {
    private int id;
    private String clientName; // Renommé pour éviter la confusion avec la colonne "nom_client" de la base de données
    private String saleStatus; // Renommé pour éviter la confusion avec la colonne "etat" de la base de données
    private String saleDate;   // Renommé pour éviter la confusion avec la colonne "date_de_vente" de la base de données
    private double productWeight; // Renommé pour éviter la confusion avec la colonne "poids" de la base de données
    private double totalPrice; // Renommé pour éviter la confusion avec la colonne "total_a_paye" de la base de données
    private String imageProperty;

    public VenteItem(int id, String clientName, String saleStatus, String saleDate, double productWeight, double totalPrice, String img) {
        this.id = id;
        this.clientName = clientName;
        this.saleStatus = saleStatus;
        this.saleDate = saleDate;
        this.productWeight = productWeight;
        this.totalPrice = totalPrice;
        this.imageProperty = img;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(String saleStatus) {
        this.saleStatus = saleStatus;
    }

    public String getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(String saleDate) {
        this.saleDate = saleDate;
    }

    public double getProductWeight() {
        return productWeight;
    }

    public void setProductWeight(double productWeight) {
        this.productWeight = productWeight;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getImageProperty() {
        return imageProperty;
    }

    public void setImageProperty(String imageProperty) {
        this.imageProperty = imageProperty;
    }



}

