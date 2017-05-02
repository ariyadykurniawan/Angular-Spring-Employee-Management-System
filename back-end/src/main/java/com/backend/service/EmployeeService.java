package com.backend.service;

import java.util.List;

import com.backend.model.Employee;

public interface EmployeeService {
	
	Employee findById(Long id);
	 
	List<Employee> findLastName(String firstName);
 
    void saveEmployee(Employee employee);
 
    void updateEmployee(Employee employee);
 
    void deleteEmployeeById(Long id);
 
    void deleteAllEmployee();
 
    List<Employee> findAllEmployees();
 
    boolean isEmployeeExist(Employee employee);

}
