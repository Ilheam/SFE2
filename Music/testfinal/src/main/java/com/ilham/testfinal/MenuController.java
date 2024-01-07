package com.ilham.testfinal;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Text;
import javafx.stage.Stage;

import java.io.IOException;

public class MenuController {
    @FXML
    private Stage stage;

    @FXML
    private Scene MainDashBoardSean;
    @FXML
    private Button dsh1; // Bouton Dashboard
    @FXML
    private Button Cat2; // Bouton Catalogue
    @FXML
    private Button ar3;  // Bouton Articles
    @FXML
    private Button vt4;  // Bouton Ventes
    @FXML
    private Button cl5;  // Bouton Clients
    @FXML
    private Button stck6; // Bouton Gestion de stock
    @FXML
    private Button stck61; // Bouton Utilisateurs
    @FXML
    private Text deco; // Texte Déconnexion
    @FXML
    private StackPane contentArea;

    // Méthode pour gérer le clic sur le bouton Dashboard
    @FXML
    private void handleDashboardButtonClick() {
        // Logique pour Dashboard
    }

    // Méthode pour gérer le clic sur le bouton Catalogue
    @FXML
    private void handleCatalogueButtonClick(ActionEvent event) throws IOException {
        Parent root= FXMLLoader.load(getClass().getResource("market.fxml"));
        stage=(Stage)((Node)event.getSource()).getScene().getWindow();
        MainDashBoardSean=new Scene(root);
        stage.setScene(MainDashBoardSean);
    }

    // Méthode pour gérer le clic sur le bouton Articles
    @FXML
    private void handleArticlesButtonClick() {
        // Logique pour Articles
    }

    // Méthode pour gérer le clic sur le bouton Ventes
    @FXML
    private void handleVentesButtonClick() {
        // Logique pour Ventes
    }

    // Méthode pour gérer le clic sur le bouton Clients
    @FXML
    private void handleClientsButtonClick() {
        // Logique pour Clients
    }

    // Méthode pour gérer le clic sur le bouton Gestion de stock
    @FXML
    private void handleStockManagementButtonClick() {
        // Logique pour Gestion de stock
    }

    // Méthode pour gérer le clic sur le bouton Utilisateurs
    @FXML
    private void handleUsersButtonClick() {
        // Logique pour Utilisateurs
    }

    // Méthode pour gérer la déconnexion
    @FXML
    private void handleLogout() {
        // Logique pour Déconnexion
    }
}

