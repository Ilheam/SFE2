package com.ilham.testfinal;

import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.scene.image.Image;

public class Vente {
    private int id;
    private String nom_client;
    private String etat;
    private String date_de_vente;
    private double poids;
    private double total_a_paye;
    private ObjectProperty<Image> imgsrc;

    public Vente(int id, String nom_client, String etat, String date_de_vente, double poids, double total_a_paye, Image imgsrc) {
        this.id = id;
        this.nom_client = nom_client;
        this.etat = etat;
        this.date_de_vente = date_de_vente;
        this.poids = poids;
        this.total_a_paye = total_a_paye;
        this.imgsrc = new SimpleObjectProperty<>(imgsrc);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom_client() {
        return nom_client;
    }

    public void setNom_client(String nom_client) {
        this.nom_client = nom_client;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public String getDate_de_vente() {
        return date_de_vente;
    }

    public void setDate_de_vente(String date_de_vente) {
        this.date_de_vente = date_de_vente;
    }

    public double getPoids() {
        return poids;
    }

    public void setPoids(double poids) {
        this.poids = poids;
    }

    public double getTotal_a_paye() {
        return total_a_paye;
    }

    public void setTotal_a_paye(double total_a_paye) {
        this.total_a_paye = total_a_paye;
    }

    public ObjectProperty<Image> imgsrcProperty() {
        return imgsrc;
    }

    public Image getImgsrc() {
        return imgsrc.get();
    }

    public void setImgsrc(Image imgsrc) {
        this.imgsrc.set(imgsrc);
    }
}
