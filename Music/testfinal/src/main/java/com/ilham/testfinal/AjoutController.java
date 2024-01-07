package com.ilham.testfinal;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.FileChooser;
import javafx.stage.FileChooser.ExtensionFilter;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AjoutController {


    @FXML
    private TextField txtprice;
    @FXML
    private TextField txtnom;

    @FXML
    private TextField txtcouleur;

    @FXML
    private javafx.scene.control.Button txtimgSrc;



    @FXML
    private ImageView imageview;

    private ObservableList<Item> data;

    @FXML
    void initialize() {
        data = FXCollections.observableArrayList();
        getAll();
    }

    public void getAll() {
        data.clear();
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement("SELECT * FROM `catalogue`");
             ResultSet results = ps.executeQuery()) {

            while (results.next()) {
                String nom = results.getString("nom");
                String couleur = results.getString("couleur");
                int prix = results.getInt("prix");
                String imgSrc = results.getString("imgSrc");
                data.add(new Item(nom, couleur, prix, imgSrc));
            }

        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération des données : " + e.getMessage());
            e.printStackTrace();
        }
    }

    @FXML
    void ajouter(ActionEvent event) {
        String nom = txtnom.getText();
        String couleur = txtcouleur.getText();
        String prixStr = txtprice.getText();
        String imgSrc = txtimgSrc.getText();
        System.out.println(imgSrc);

        if (nom.isEmpty() || couleur.isEmpty() || prixStr.isEmpty() || imgSrc.isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("Champs manquants");
            alert.setHeaderText(null);
            alert.setContentText("Veuillez remplir tous les champs !");
            alert.showAndWait();
            return;
        }

        try {
            int prix = Integer.parseInt(prixStr);
            Item p = new Item(nom, couleur, prix, imgSrc);
            System.out.println(imgSrc);
            insert(p);
            getAll();
        } catch (NumberFormatException e) {
            System.err.println("Veuillez entrer un prix valide !");
        }
    }

    @FXML
    void importbtn(ActionEvent event) {
        FileChooser openFile = new FileChooser();
        System.out.println("1");
        openFile.getExtensionFilters().add(new ExtensionFilter("Open Image File", "*png", "*jpg"));
        System.out.println("2");
        File file = openFile.showOpenDialog(imageview.getScene().getWindow());
        System.out.println("3");
        if (file != null) {
            Data.path = file.getAbsolutePath();
            System.out.println("4");
            Image img = new Image(file.toURI().toString(), 181, 173, false, true);
            System.out.println("5");
            imageview.setImage(img);
            System.out.println("6");
            txtimgSrc.setText(file.getAbsolutePath());
            System.out.println("7");
        }
    }

    public void insert(Item p) {
        try (Connection connection = DatabaseConnection.getConnection()) {
            String sql = "INSERT INTO `catalogue` (`nom`, `couleur`, `prix`, `imgSrc`) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setString(1, p.nomf);
            ps.setString(2, p.color);
            ps.setInt(3, p.price);
            ps.setString(4, p.imgStrc);
            System.out.println(p.imgStrc);
            ps.execute();
        } catch (Exception e) {
            System.err.println("Erreur lors de l'insertion : " + e.getMessage());
            e.printStackTrace();
        }
    }
}

