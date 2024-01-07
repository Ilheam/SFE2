package com.ilham.testfinal;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;

import java.net.URL;
import java.util.ResourceBundle;

public class ManageEmployeeController implements Initializable {

    @FXML
    private TableView<Employee> employeesTableView;

    @FXML
    private TableColumn<Employee, Integer> idColumn;

    @FXML
    private TableColumn<Employee, String> nameColumn;

    @FXML
    private TableColumn<Employee, String> positionColumn;

    // More columns as needed...

    @FXML
    private TextField idTextField;

    @FXML
    private TextField nameTextField;

    @FXML
    private TextField positionTextField;

    // More text fields as needed...

    @FXML
    private Button addButton;

    @FXML
    private Button deleteButton;

    @FXML
    private Button updateButton;

    // Assuming there's an Employee class that represents the employee data
    // and an EmployeeService class that handles database operations
    private EmployeeService employeeService = new EmployeeService();

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        // Initialize table columns
        idColumn.setCellValueFactory(new PropertyValueFactory<>("id"));
        nameColumn.setCellValueFactory(new PropertyValueFactory<>("name"));
        positionColumn.setCellValueFactory(new PropertyValueFactory<>("position"));
        // Initialize more columns...

        // Load employee data into the table
        loadEmployeeData();
    }

    private void loadEmployeeData() {
        // Get the employee data and set it to the TableView
        employeesTableView.setItems(employeeService.getAllEmployees());
    }

    @FXML
    private void handleAddAction(ActionEvent event) {
        // Code for adding a new employee
        Employee employee = new Employee(
                Integer.parseInt(idTextField.getText()),
                nameTextField.getText(),
                positionTextField.getText()
        );
        employeeService.addEmployee(employee);
        loadEmployeeData();
    }

    @FXML
    private void handleDeleteAction(ActionEvent event) {
        // Code for deleting an employee
        Employee selectedEmployee = employeesTableView.getSelectionModel().getSelectedItem();
        employeeService.deleteEmployee(selectedEmployee);
        loadEmployeeData();
    }

    @FXML
    private void handleUpdateAction(ActionEvent event) {
        // Code for updating an employee
        Employee employee = employeesTableView.getSelectionModel().getSelectedItem();
        employee.setName(nameTextField.getText());
        employee.setPosition(positionTextField.getText());
        // Update more fields as needed...
        employeeService.updateEmployee(employee);
        loadEmployeeData();
    }

    // ... Additional methods for other actions

}

