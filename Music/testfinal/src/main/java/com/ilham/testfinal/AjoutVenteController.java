package com.ilham.testfinal;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AjoutVenteController {

    @FXML
    private TableView<VenteItem> recordpage_tableView;

    @FXML
    private TableColumn<VenteItem, Integer> VenteID;

    @FXML
    private TableColumn<VenteItem, ImageView> Vente_image;
    @FXML
    private TableColumn<VenteItem, String> client_vente;

    @FXML
    private TableColumn<VenteItem, String> etat_vente;

    @FXML
    private TableColumn<VenteItem, String> date_vente;

    @FXML
    private TableColumn<VenteItem, Double> poids;

    @FXML
    private TableColumn<VenteItem, Double> total;

    ObservableList<VenteItem> data;

    @FXML
    public void initialize() {

        data = FXCollections.observableArrayList();

        Vente_image.setCellValueFactory(cellData -> {
            ImageView imageView = new ImageView();
            imageView.setFitWidth(100);
            imageView.setFitHeight(100);

            String imagePath = cellData.getValue().getImageProperty(); // Assuming getImageProperty() returns the file path as a String
            if (imagePath != null && !imagePath.isEmpty()) {
                File file = new File(imagePath);
                if (file.exists()) {
                    javafx.scene.image.Image image = new javafx.scene.image.Image(file.toURI().toString());
                    imageView.setImage(image);
                }
            }

            return new javafx.beans.property.SimpleObjectProperty<>(imageView);
        });

        date_vente.setCellValueFactory(new PropertyValueFactory<>("date_de_vente"));
        etat_vente.setCellValueFactory(new PropertyValueFactory<>("etat"));
        client_vente.setCellValueFactory(new PropertyValueFactory<>("nom_client"));
        VenteID.setCellValueFactory(new PropertyValueFactory<>("id"));
        poids.setCellValueFactory(new PropertyValueFactory<>("poids"));
        total.setCellValueFactory(new PropertyValueFactory<>("total_a_paye"));
        recordpage_tableView.setItems(data);
        GetAllItems();
    }

    private void GetAllItems() {
        data.clear();

        try {
            Connection connection = DatabaseConnection.getConnection();

            String sql = "SELECT * FROM ventes"; // Update the table name as per your database schema
            try (PreparedStatement ps = connection.prepareStatement(sql)) {
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    String etat = rs.getString("etat");
                    int idd = rs.getInt("id");
                    String client = rs.getString("nom_client");
                    String dateVente = rs.getString("date_de_vente");
                    double poidsValue = rs.getDouble("poids");
                    double totalAPaye = rs.getDouble("total_a_paye");
                    String imgSrc = rs.getString("imgsrc");

                    data.add(new VenteItem(idd, client, etat, dateVente, poidsValue, totalAPaye, imgSrc));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @FXML
    private void handleAjoutVente(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/application/editVenteForm.fxml")); // Update the FXML file name
        Parent root = loader.load();

        Scene scene = new Scene(root);

        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();

        stage.setScene(scene);
        stage.show();
    }
}
