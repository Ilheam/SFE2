package com.ilham.testfinal;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

public class CustomerService {

    private final ObservableList<Customer> customers = FXCollections.observableArrayList();

    public CustomerService() {
        // Pre-populate with some dummy data
        customers.add(new Customer("C001", "John Doe", "john@example.com", "John's Shop", "1234567890", "Regular", "1990-01-01"));
        customers.add(new Customer("C002", "Jane Smith", "jane@example.com", "Jane's Market", "0987654321", "VIP", "1995-05-05"));
    }

    public ObservableList<Customer> getAllCustomers() {
        // In a real application, you would fetch this list from a database
        return customers;
    }

    public void addCustomer(Customer customer) {
        // In a real application, you would insert the customer into a database
        customers.add(customer);
    }

    public void updateCustomer(Customer customer) {
        // In a real application, you would update the customer in the database
        // Here we just simulate by replacing the customer in the list
        for (int i = 0; i < customers.size(); i++) {
            if (customers.get(i).getId().equals(customer.getId())) {
                customers.set(i, customer);
                break;
            }
        }
    }

    public void deleteCustomer(Customer customer) {
        // In a real application, you would delete the customer from the database
        customers.remove(customer);
    }

    // You can add more methods here for additional CRUD operations and business logic
}
