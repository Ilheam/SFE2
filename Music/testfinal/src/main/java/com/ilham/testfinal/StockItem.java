package com.ilham.testfinal;

import java.time.LocalDate;

public class StockItem {
    private String id;
    private String name;
    private String barcodePath;
    private LocalDate dateAdded;
    private int totalQuantity;
    private StockStatus status;

    // Enum for stock status
    public enum StockStatus {
        AVAILABLE, NOT_AVAILABLE // You can add more statuses as needed
    }

    // Constructor
    public StockItem(String id, String name, String barcodePath, LocalDate dateAdded, int totalQuantity, StockStatus status) {
        this.id = id;
        this.name = name;
        this.barcodePath = barcodePath;
        this.dateAdded = dateAdded;
        this.totalQuantity = totalQuantity;
        this.status = status;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBarcodePath() {
        return barcodePath;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public StockStatus getStatus() {
        return status;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBarcodePath(String barcodePath) {
        this.barcodePath = barcodePath;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public void setStatus(StockStatus status) {
        this.status = status;
    }

    // ToString method for debugging
    @Override
    public String toString() {
        return "StockItem{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", barcodePath='" + barcodePath + '\'' +
                ", dateAdded=" + dateAdded +
                ", totalQuantity=" + totalQuantity +
                ", status=" + status +
                '}';
    }
}
