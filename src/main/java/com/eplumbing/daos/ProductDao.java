package com.eplumbing.daos;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eplumbing.entities.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	List<Product> findByCategoryId(int catid,Sort sort);
	List<Product> findByPnameContaining(String name);
}
