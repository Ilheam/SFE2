package com.ilham.testfinal;

public class Employee {

    private Integer id;
    private String name;
    private String position;

    // Constructor
    public Employee(Integer id, String name, String position) {
        this.id = id;
        this.name = name;
        this.position = position;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    // toString method for debugging purposes
    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", position='" + position + '\'' +
                '}';
    }

    // Additional methods and logic as needed for the Employee class
}
