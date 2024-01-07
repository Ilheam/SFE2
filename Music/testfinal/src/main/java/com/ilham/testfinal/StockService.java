package com.ilham.testfinal;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.sql.*;

public class StockService {

    public ObservableList<StockItem> getAllStockItems() {
        ObservableList<StockItem> stockItems = FXCollections.observableArrayList();
        String query = "SELECT * FROM item_stock";
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                StockItem item = new StockItem(
                        rs.getString("id"),
                        rs.getString("name"),
                        rs.getString("barcode_path"),
                        rs.getDate("date_added").toLocalDate(),
                        rs.getInt("total_quantity"),
                        StockItem.StockStatus.valueOf(rs.getString("status").toUpperCase())
                );
                stockItems.add(item);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception
        }
        return stockItems;
    }

    public boolean updateStockItem(StockItem item) {
        String query = "UPDATE item_stock SET name=?, barcode_path=?, total_quantity=?, status=? WHERE id=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setString(1, item.getName());
            ps.setString(2, item.getBarcodePath());
            ps.setInt(3, item.getTotalQuantity());
            ps.setString(4, item.getStatus().name());
            ps.setString(5, item.getId());

            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception
        }
        return false;
    }

    public boolean deleteStockItem(StockItem item) {
        String query = "DELETE FROM item_stock WHERE id=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setString(1, item.getId());
            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception
        }
        return false;
    }

    // ... Additional methods as needed ...
}
