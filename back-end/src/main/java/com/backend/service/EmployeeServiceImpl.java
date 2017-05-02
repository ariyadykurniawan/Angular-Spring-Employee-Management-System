package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.model.Employee;
import com.backend.repository.EmployeeRepository;

@Service("employeeService")
@Transactional
public class EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
    private EmployeeRepository employeeRepository;
	
	
	@Override
	public Employee findById(Long id) {
		// TODO Auto-generated method stub
		return employeeRepository.findOne(id);
	}

	@Override
	public List<Employee> findLastName(String firstName) {
		// TODO Auto-generated method stub
		return employeeRepository.findByLastNameIgnoreCase(firstName);
	}

	@Override
	public void saveEmployee(Employee employee) {
		// TODO Auto-generated method stub
		employeeRepository.save(employee);
	}

	@Override
	public void updateEmployee(Employee employee) {
		// TODO Auto-generated method stub
		saveEmployee(employee);
	}

	@Override
	public void deleteEmployeeById(Long id) {
		// TODO Auto-generated method stub
		employeeRepository.delete(id);
	}

	@Override
	public void deleteAllEmployee() {
		// TODO Auto-generated method stub
		employeeRepository.deleteAll();
	}

	@Override
	public List<Employee> findAllEmployees() {
		// TODO Auto-generated method stub
		return (List<Employee>) employeeRepository.findAll();
	}

	@Override
	public boolean isEmployeeExist(Employee employee) {
		// TODO Auto-generated method stub
		return findLastName(employee.getLastName()) != null;
	}

}
