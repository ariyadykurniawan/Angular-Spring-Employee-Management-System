package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.Employee;
import com.backend.model.OfficeLocation;
import com.backend.repository.EmployeeRepository;


@RestController
public class RestApiController {
	
	@Autowired
    private EmployeeRepository employeeRepository;

	
	@GetMapping("/employees")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Employee> allEmployees() {
		return employeeRepository.findAll();
	}
	
	@GetMapping("/employees/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Employee oneEmployee(@PathVariable("id") long id) {
		return employeeRepository.findOne(id);
	}
	
//	@GetMapping("/employees/gender/{gender}")
//	@ResponseStatus(HttpStatus.OK)
//	public Iterable<Employee> genderEmployee(@PathVariable("gender") String gender){
//		return employeeRepository.findByGender(gender);
//	}
//	
//	
//	@GetMapping("/employees/location/{office_location}")
//	@ResponseStatus(HttpStatus.OK)
//	public Iterable<Employee> locationEmployee(@PathVariable("office_location") String office_location){
//		return employeeRepository.findByOfficeLocation(office_location);
//	}
	
	@PostMapping("/employees")
	@ResponseStatus(HttpStatus.CREATED)
	public Employee saveEmployee(@RequestBody Employee employee){
		return employeeRepository.save(employee);
	}
	
	@PutMapping("/employees/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Employee updateEmployee(@PathVariable("id") long id, @RequestBody Employee employee ){
		employee.setEmpId(id);
		return employeeRepository.save(employee);
	}
    
	@DeleteMapping("/employees/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Long deleteEmployee(@PathVariable("id") long id) {
		return employeeRepository.deleteByEmpId(id);
	}
    
}
