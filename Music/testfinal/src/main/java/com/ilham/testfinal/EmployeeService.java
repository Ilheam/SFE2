package com.ilham.testfinal;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class EmployeeService {

    // Method to load all employees from the database
    public ObservableList<Employee> getAllEmployees() {
        ObservableList<Employee> employees = FXCollections.observableArrayList();

        String query = "SELECT id, name, position FROM employees";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Employee employee = new Employee(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("position")
                );
                employees.add(employee);
            }

        } catch (SQLException ex) {
            ex.printStackTrace();
            // Handle exceptions properly
        }
        return employees;
    }

    // Method to add a new employee to the database
    public void addEmployee(Employee employee) {
        String query = "INSERT INTO employees (id, name, position) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, employee.getId());
            ps.setString(2, employee.getName());
            ps.setString(3, employee.getPosition());

            ps.executeUpdate();

        } catch (SQLException ex) {
            ex.printStackTrace();
            // Handle exceptions properly
        }
    }

    // Method to delete an employee from the database
    public void deleteEmployee(Employee employee) {
        String query = "DELETE FROM employees WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, employee.getId());
            ps.executeUpdate();

        } catch (SQLException ex) {
            ex.printStackTrace();
            // Handle exceptions properly
        }
    }

    // Method to update an employee's details in the database
    public void updateEmployee(Employee employee) {
        String query = "UPDATE employees SET name = ?, position = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setString(1, employee.getName());
            ps.setString(2, employee.getPosition());
            ps.setInt(3, employee.getId());

            ps.executeUpdate();

        } catch (SQLException ex) {
            ex.printStackTrace();
            // Handle exceptions properly
        }
    }
}

