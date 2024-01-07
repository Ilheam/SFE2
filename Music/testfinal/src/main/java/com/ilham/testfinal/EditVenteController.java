package com.ilham.testfinal;



import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;
import javafx.stage.FileChooser;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;

public class EditVenteController {

    @FXML
    private TextField edit_patientID;

    @FXML
    private ComboBox<String> edit_gender;

    @FXML
    private TextField edit_contactNumber;

    @FXML
    private ImageView image;
    @FXML
    private TextField edit_poids;

    @FXML
    private TextField edit_totalAPaye;
    @FXML
    private Button edit_updateBtn;

    private String imagePath; // Pour stocker le chemin de l'image sélectionnée

    @FXML
    public void initialize() {
        // Initialisation de la ComboBox pour les états
        ObservableList<String> etatOptions = FXCollections.observableArrayList(
                "En attente",
                "Terminé",
                "Annulé"
        );
        edit_gender.setItems(etatOptions);
    }

    @FXML
    public void chooseImage() {
        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Choisir une image");
        fileChooser.getExtensionFilters().addAll(
                new FileChooser.ExtensionFilter("Images", "*.png", "*.jpg", "*.jpeg")
        );
        File selectedFile = fileChooser.showOpenDialog(null);
        if (selectedFile != null) {
            imagePath = selectedFile.getAbsolutePath();
            // Vous pouvez ajouter du code ici pour charger l'image dans l'ImageView si nécessaire
        }
    }
    private void showAlert(Alert.AlertType alertType, String title, String message) {
        Alert alert = new Alert(alertType);
        alert.setTitle(title);
        alert.setHeaderText(null);  // Pas de titre d'en-tête
        alert.setContentText(message);
        alert.showAndWait();  // Attend que l'utilisateur ferme l'alerte
    }

    @FXML
    public void updateBtnAction() {
        String etat = edit_gender.getValue();
        String nomClient = edit_contactNumber.getText();
        String poids = edit_poids.getText();
        String totalAPaye = edit_totalAPaye.getText();

        try (Connection connection = DatabaseConnection.getConnection()) {
            String query = "INSERT INTO patients (etat, nom_client, poids, total_a_paye, imgsrc) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            preparedStatement.setString(1, etat);
            preparedStatement.setString(2, nomClient);
            preparedStatement.setString(3, poids);
            preparedStatement.setString(4, totalAPaye);

            if (imagePath != null && !imagePath.isEmpty()) {
                preparedStatement.setString(5, imagePath);
            } else {
                preparedStatement.setNull(5, java.sql.Types.VARCHAR);
            }

            int rowsAffected = preparedStatement.executeUpdate(); // Récupérer le nombre de lignes affectées
            if (rowsAffected > 0) {
                // Afficher une alerte si l'ajout a été réussi
                showAlert(Alert.AlertType.INFORMATION, "Succès", "L'ajout a été effectué avec succès !");
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Afficher une alerte en cas d'erreur
            showAlert(Alert.AlertType.ERROR, "Erreur", "Une erreur s'est produite lors de l'ajout.");
        }
    }
}
