package com.ilham.testfinal;

public class Customer {
    private String id;
    private String name;
    private String email;
    private String shopName;
    private String contactNumber;
    private String type;
    private String dob; // Date of Birth or any other relevant info

    public Customer() {
    }

    public Customer(String id, String name, String email, String shopName, String contactNumber, String type, String dob) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.shopName = shopName;
        this.contactNumber = contactNumber;
        this.type = type;
        this.dob = dob;
    }

    // Getters and setters for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getters and setters for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getters and setters for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getters and setters for shopName
    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    // Getters and setters for contactNumber
    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    // Getters and setters for type
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // Getters and setters for dob
    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    // Implement toString() if needed for debugging
    @Override
    public String toString() {
        return "Customer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", shopName='" + shopName + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", type='" + type + '\'' +
                ", dob='" + dob + '\'' +
                '}';
    }

    // Additional methods or validation logic as necessary
}
