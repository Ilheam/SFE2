package com.ilham.testfinal;


import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

public class MarketController implements Initializable {
    @FXML
    private VBox chosenFruitCard;

    @FXML
    private Label fruitNameLable;

    @FXML
    private Label fruitPriceLabel;

    @FXML
    private ImageView fruitImg;

    @FXML
    private ScrollPane scroll;

    @FXML
    private GridPane grid;

    private List<Produit> produits = new ArrayList<>();
    private Image image;
    private MyListener myListener;

    private List<Produit> getData(String nom, String imgSrc, int prix, String couleur) {
        List<Produit> produits = new ArrayList<>();
        Produit produit;
        produit = new Produit();
        produit.setName(nom);
        produit.setPrice(prix);
        produit.setImgSrc(imgSrc) ;
        produit.setColor(couleur);
        produits.add(produit);


        return produits;
    }

    private void setChosenProduit(Produit produit) {
        fruitNameLable.setText(produit.getName());
        fruitPriceLabel.setText(produit.getPrice() + " DH");

        try {
            // Essayez de charger l'image à partir d'un chemin absolu
            Image image = new Image(new File(produit.getImgSrc()).toURI().toString());
            fruitImg.setImage(image);

            // Récupérez la couleur du fruit
            String fruitColor = produit.getColor();

            // Appliquez la couleur au style de votre élément
            chosenFruitCard.setStyle("-fx-background-color: " + fruitColor + ";\n" +
                    "-fx-background-radius: 30;");


        } catch (Exception e) {
            System.err.println("Erreur lors du chargement de l'image à partir du chemin absolu : " + e.getMessage());

            // Si le chargement à partir du chemin absolu échoue, essayez le chemin relatif.
            InputStream inputStream = getClass().getResourceAsStream(produit.getImgSrc());

            if (inputStream != null) {
                Image image = new Image(inputStream);
                fruitImg.setImage(image);

                // Récupérez la couleur du fruit
                String fruitColor = produit.getColor();

                // Appliquez la couleur au style de votre élément
                chosenFruitCard.setStyle("-fx-background-color: #" + fruitColor + ";\n" +
                        "-fx-background-radius: 30;");
            } else {
                System.err.println("Erreur : Impossible de charger l'image depuis le chemin relatif : " + produit.getImgSrc());
            }
        }
    }




    @Override
    public void initialize(URL location, ResourceBundle resources) {

        ObservableList<Produit> data;
        data = FXCollections.observableArrayList();

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement("SELECT * FROM `catalogue`");
             ResultSet results = ps.executeQuery()) {

            while (results.next()) {
                String nom = results.getString("nom");
                String couleur = results.getString("couleur");
                int prix = results.getInt("prix");
                String imgSrc = results.getString("imgSrc");
                data.add(new Produit(nom , imgSrc , prix, couleur));

                produits.addAll(getData(nom , imgSrc , prix, couleur));
                if (produits.size() > 0) {
                    setChosenProduit(produits.get(0));
                    myListener = new MyListener() {
                        @Override
                        public void onClickListener(Produit produit) {
                            setChosenProduit(produit);
                        }
                    };
                }
                int column = 0;
                int row = 1;
                try {
                    for (int i = 0; i < produits.size(); i++) {
                        FXMLLoader fxmlLoader = new FXMLLoader();
                        fxmlLoader.setLocation(getClass().getResource("item.fxml"));
                        AnchorPane anchorPane = fxmlLoader.load();

                        ItemController itemController = fxmlLoader.getController();
                        itemController.setData(produits.get(i),myListener);

                        if (column == 3) {
                            column = 0;
                            row++;
                        }

                        grid.add(anchorPane, column++, row); //(child,column,row)
                        //set grid width
                        grid.setMinWidth(Region.USE_COMPUTED_SIZE);
                        grid.setPrefWidth(Region.USE_COMPUTED_SIZE);
                        grid.setMaxWidth(Region.USE_PREF_SIZE);

                        //set grid height
                        grid.setMinHeight(Region.USE_COMPUTED_SIZE);
                        grid.setPrefHeight(Region.USE_COMPUTED_SIZE);
                        grid.setMaxHeight(Region.USE_PREF_SIZE);

                        GridPane.setMargin(anchorPane, new Insets(10));
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }

        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération des données : " + e.getMessage());
            e.printStackTrace();
        }


    }
    @FXML
    private void handleAddCatalogueButton(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("ajout.fxml"));
        Parent root = loader.load();

        Scene scene = new Scene(root);

        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();

        stage.setScene(scene);
        stage.show();
    }


}