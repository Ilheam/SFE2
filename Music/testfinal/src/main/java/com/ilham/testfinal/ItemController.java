package com.ilham.testfinal;


import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;

import java.io.File;
import java.io.InputStream;

public class ItemController {
    @FXML
    private Label nameLabel;

    @FXML
    private Label priceLabel;

    @FXML
    private ImageView img;

    @FXML
    private void click(MouseEvent mouseEvent) {
        myListener.onClickListener(produit);
    }

    private Produit produit;
    private MyListener myListener;

    public void setData(Produit produit, MyListener myListener) {
        this.produit = produit;
        this.myListener = myListener;

        nameLabel.setText(produit.getName());
        priceLabel.setText(HelloApplication.CURRENCY + produit.getPrice());

        // Essayer de charger l'image à partir d'un chemin absolu
        try {
            Image image = new Image(new File(produit.getImgSrc()).toURI().toString());
            img.setImage(image);
        } catch (Exception e) {
            System.err.println("Erreur lors du chargement de l'image : " + e.getMessage());
            e.printStackTrace();
            // Si le chargement à partir du chemin absolu échoue, essayez le chemin relatif (comme précédemment).
            InputStream inputStream = getClass().getResourceAsStream(produit.getImgSrc());
            if (inputStream != null) {
                Image image = new Image(inputStream);
                img.setImage(image);
            } else {
                System.err.println("Erreur : Impossible de charger l'image depuis le chemin : " + produit.getImgSrc());
            }
        }
    }


}