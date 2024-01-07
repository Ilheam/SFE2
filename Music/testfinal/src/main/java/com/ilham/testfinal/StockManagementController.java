package com.ilham.testfinal;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.HBox;

import java.net.URL;
import java.util.ResourceBundle;

public class StockManagementController implements Initializable {

    @FXML
    private TableView<StockItem> stockTableView;
    @FXML
    private TableColumn<StockItem, String> idColumn;
    @FXML
    private TableColumn<StockItem, String> nameColumn;
    @FXML
    private TableColumn<StockItem, Integer> totalQuantityColumn;
    @FXML
    private TableColumn<StockItem, StockItem.StockStatus> statusColumn;
    @FXML
    private TableColumn<StockItem, Void> actionColumn;

    private ObservableList<StockItem> stockData = FXCollections.observableArrayList();
    private StockService stockService;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        idColumn.setCellValueFactory(new PropertyValueFactory<>("id"));
        nameColumn.setCellValueFactory(new PropertyValueFactory<>("name"));
        totalQuantityColumn.setCellValueFactory(new PropertyValueFactory<>("totalQuantity"));
        statusColumn.setCellValueFactory(new PropertyValueFactory<>("status"));

        statusColumn.setCellFactory(column -> new TableCell<StockItem, StockItem.StockStatus>() {
            @Override
            protected void updateItem(StockItem.StockStatus status, boolean empty) {
                super.updateItem(status, empty);
                if (empty || status == null) {
                    setText(null);
                    setGraphic(null);
                } else {
                    setText(status.toString());
                }
            }
        });

        actionColumn.setCellFactory(column -> new TableCell<StockItem, Void>() {
            private final Button updateButton = new Button("Update");
            private final Button deleteButton = new Button("Delete");
            private final HBox pane = new HBox(updateButton, deleteButton);

            {
                pane.setSpacing(10);
                updateButton.setOnAction(event -> {
                    StockItem item = getTableView().getItems().get(getIndex());
                    // Logic to update the item
                });
                deleteButton.setOnAction(event -> {
                    StockItem item = getTableView().getItems().get(getIndex());
                    // Logic to delete the item
                });
            }

            @Override
            protected void updateItem(Void item, boolean empty) {
                super.updateItem(item, empty);
                setGraphic(empty ? null : pane);
            }
        });

        stockService = new StockService();
        loadStockData();
    }

    private void loadStockData() {
        // Call the service method to get all stock items from the database.
        ObservableList<StockItem> items = stockService.getAllStockItems();

        // Set the items to the TableView.
        stockTableView.setItems(items);
    }

    private void updateItem(StockItem item) {
        boolean success = stockService.updateStockItem(item);
        if (success) {
            loadStockData();
        } else {
            showAlert("Update failed", "Could not update the item.");
        }
    }

    private void deleteItem(StockItem item) {
        boolean success = stockService.deleteStockItem(item);
        if (success) {
            loadStockData();
        } else {
            showAlert("Deletion failed", "Could not delete the item.");
        }
    }

    private void showAlert(String title, String content) {
        Alert alert = new Alert(AlertType.INFORMATION);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(content);
        alert.showAndWait();
    }
}






