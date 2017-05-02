package com.backend.repository;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.backend.model.OfficeLocation;;

@RestResource
public interface OfficeLocationRepository 
	extends PagingAndSortingRepository<OfficeLocation, Long>
	{

	}
