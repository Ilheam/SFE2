/* package com.example.spms;

import com.example.spms.Tables.viweTableModeCustomer;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.AnchorPane;
import javafx.event.ActionEvent;

import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ResourceBundle;

public class ManageCustomerController implements Initializable {

    // FXML components for different UI sections
    @FXML
    private AnchorPane addCustomerModule;
    @FXML
    private AnchorPane deleteCustomerModule;
    @FXML
    private AnchorPane updateCustomerModule;
    @FXML
    private AnchorPane viewCustomerDetailsModule;
    @FXML
    private AnchorPane imageancher;
    @FXML
    private AnchorPane deleteSupplierModule;
    @FXML
    private AnchorPane supplierInvoiceModule;
    @FXML
    private AnchorPane addSupplierModule;
    @FXML
    private AnchorPane updateSupplierDetailsModule;
    @FXML
    private AnchorPane viewSupplierDetailsModule;
    @FXML
    private AnchorPane customerInvoiceModule;
    private String CustomerName;
    private String CustomerID;
    private String CustomerEmail;
    private String CustomerShopeName;
    private String CoustomerContactNumber;
    private String Customertype;
    private String CoustomerDOB;

    @FXML
    private TableColumn<viweTableModeCustomer,String> CustomerContactColumn;
    @FXML
    private TableColumn<viweTableModeCustomer,String> CustomerMailColumn;
    @FXML
    private TableColumn<viweTableModeCustomer,String> CustomerNameColumn;
    @FXML
    private TableColumn<viweTableModeCustomer,String> CustomerTypeColumn;
    @FXML
    private TableColumn<viweTableModeCustomer,String> CustomerdobColumn;
    @FXML
    private TableColumn<viweTableModeCustomer,String> ShopNameColumn;
    @FXML
    private TableColumn<viweTableModeCustomer,String> customerIDColumn;
    @FXML
    private TableView<viweTableModeCustomer> viweCustomerTable;
    ObservableList<viweTableModeCustomer> listview= FXCollections.observableArrayList();


    public void viweCustomerTable(ActionEvent event) throws SQLException, IOException {


        customerIDColumn.setCellValueFactory(new PropertyValueFactory<>("CustomerID"));
        CustomerNameColumn.setCellValueFactory(new PropertyValueFactory<>("customerName"));
        CustomerMailColumn.setCellValueFactory(new PropertyValueFactory<>("customerEmail"));
        CustomerContactColumn.setCellValueFactory(new PropertyValueFactory<>("coustomerContactNumber"));
        ShopNameColumn.setCellValueFactory(new PropertyValueFactory<>("customerShopeName"));
        CustomerTypeColumn.setCellValueFactory(new PropertyValueFactory<>("customertype"));
        CustomerdobColumn.setCellValueFactory(new PropertyValueFactory<>("coustomerDOB"));



        Connection conn= DatabaseConnection.getConnection();
        String view="select * from customer";

        try{
            Statement sm=conn.createStatement();
            ResultSet r=sm.executeQuery(view);

            while(r.next()){
                listview.add(new viweTableModeCustomer(
                        r.getString("customer_id"),
                        r.getString("name"),
                        r.getString("email"),
                        r.getString("shopname"),
                        r.getString("contact_number"),
                        r.getString("type"),
                        r.getString("date_of_birthday")));
            }
            viweCustomerTable.setItems(listview);
        }catch (SQLException e){
            System.out.println(e.getMessage());
        }finally {
            conn.close();
        }
    }
    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        // Initialize your controller here. For example:
        // If you need to perform any initialization when your view loads, do it here
    }

    @FXML
    public void setAddCustomerAnchorPane(ActionEvent event) {
        addCustomerModule.setVisible(true);
        imageancher.setVisible(false);
        deleteCustomerModule.setVisible(false);
        deleteSupplierModule.setVisible(false);
        supplierInvoiceModule.setVisible(false);
        updateCustomerModule.setVisible(false);
        viewCustomerDetailsModule.setVisible(false);
        addSupplierModule.setVisible(false);
        updateSupplierDetailsModule.setVisible(false);
        viewSupplierDetailsModule.setVisible(false);
        customerInvoiceModule.setVisible(false);
    }

    @FXML
    public void setDeleteCustomerAnchorPane(ActionEvent event) throws IOException{
        addCustomerModule.setVisible(false);
        imageancher.setVisible(false);
        deleteCustomerModule.setVisible(true);
        deleteSupplierModule.setVisible(false);
        supplierInvoiceModule.setVisible(false);
        updateCustomerModule.setVisible(false);
        viewCustomerDetailsModule.setVisible(false);
        addSupplierModule.setVisible(false);
        updateSupplierDetailsModule.setVisible(false);
        viewSupplierDetailsModule.setVisible(false);
        customerInvoiceModule.setVisible(false);
        // getCustomerID_forComboBox(event); // Implement this method if needed
    }

    @FXML
    public void setUpdateCustomerAnchorPane(ActionEvent event) {
        addCustomerModule.setVisible(false);
        imageancher.setVisible(false);
        deleteCustomerModule.setVisible(false);
        deleteSupplierModule.setVisible(false);
        supplierInvoiceModule.setVisible(false);
        updateCustomerModule.setVisible(true);
        viewCustomerDetailsModule.setVisible(false);
        addSupplierModule.setVisible(false);
        updateSupplierDetailsModule.setVisible(false);
        viewSupplierDetailsModule.setVisible(false);
        customerInvoiceModule.setVisible(false);
    }

    @FXML
    public void setviewCustomerAnchorPane(ActionEvent event) throws IOException, SQLException {
        addCustomerModule.setVisible(false);
        imageancher.setVisible(false);
        deleteCustomerModule.setVisible(false);
        deleteSupplierModule.setVisible(false);
        supplierInvoiceModule.setVisible(false);
        updateCustomerModule.setVisible(false);
        viewCustomerDetailsModule.setVisible(true);
        addSupplierModule.setVisible(false);
        updateSupplierDetailsModule.setVisible(false);
        viewSupplierDetailsModule.setVisible(false);
        customerInvoiceModule.setVisible(false);
        listview.clear();

        viweCustomerTable(event);

        addSupplierModule.setVisible(false);
        updateSupplierDetailsModule.setVisible(false);
        viewSupplierDetailsModule.setVisible(false);
    }

    // Add additional methods to manage the visibility of other UI sections if necessary

    // Add methods to handle customer actions (add, update, delete) here

    // Other helper methods as necessary
}*/
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

public class ManageCustomerController implements Initializable {

    @FXML
    private TableView<Customer> customerTableView;

    @FXML
    private TableColumn<Customer, String> customerIdColumn;
    @FXML
    private TableColumn<Customer, String> customerNameColumn;
    // ... Other columns for customer details

    @FXML
    private TextField customerNameTextField;
    @FXML
    private TextField customerIdTextField;
    // ... Other text fields for customer details

    @FXML
    private Button addCustomerButton;
    @FXML
    private Button deleteCustomerButton;
    @FXML
    private Button updateCustomerButton;

    private CustomerService customerService;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        customerService = new CustomerService();
        initializeTable();
        loadCustomerData();
    }

    private void initializeTable() {
        customerIdColumn.setCellValueFactory(new PropertyValueFactory<>("id"));
        customerNameColumn.setCellValueFactory(new PropertyValueFactory<>("name"));
        // ... Initialize other columns
    }

    private void loadCustomerData() {
        customerTableView.setItems(customerService.getAllCustomers());
    }

    @FXML
    private void handleAddCustomer(ActionEvent event) {
        Customer newCustomer = new Customer();
        newCustomer.setId(customerIdTextField.getText());
        newCustomer.setName(customerNameTextField.getText());
        // ... Set other properties from text fields

        customerService.addCustomer(newCustomer);
        loadCustomerData();
        clearCustomerForm();
    }

    @FXML
    private void handleDeleteCustomer(ActionEvent event) {
        Customer selectedCustomer = customerTableView.getSelectionModel().getSelectedItem();
        if (selectedCustomer != null) {
            customerService.deleteCustomer(selectedCustomer);
            loadCustomerData();
        }
    }

    @FXML
    private void handleUpdateCustomer(ActionEvent event) {
        Customer selectedCustomer = customerTableView.getSelectionModel().getSelectedItem();
        if (selectedCustomer != null) {
            selectedCustomer.setName(customerNameTextField.getText());
            // ... Set other properties from text fields

            customerService.updateCustomer(selectedCustomer);
            loadCustomerData();
        }
    }

    private void clearCustomerForm() {
        customerIdTextField.clear();
        customerNameTextField.clear();
        // ... Clear other text fields
    }

    // ... Additional methods for other actions as needed

}

