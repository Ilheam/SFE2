package com.ilham.testfinal;

public class Item {
    String nomf;
    String color;

    int price;
    String imgStrc;



    public Item(String nomf, String color, int price, String imgStrc) {
        super();
        this.nomf = nomf;
        this.color = color;
        this.price = price;
        this.imgStrc = imgStrc;
    }


    public String getNomf() {
        return nomf;
    }
    public void setNomf(String nomf) {
        this.nomf = nomf;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public String getImgStrc() {
        return imgStrc;
    }
    public void setImgStrc(String imgStrc) {
        this.imgStrc = imgStrc;
    }
}

