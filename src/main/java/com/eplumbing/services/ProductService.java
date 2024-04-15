package com.eplumbing.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.eplumbing.entities.Product;

public interface ProductService {
	void addProduct(Product p,MultipartFile pic);
	void updateProduct(Product p,MultipartFile pic);
	void deleteProduct(int prodid);
	List<Product> allProducts();
	List<Product> categoryProducts(int pcat);
	Product findProductById(int prodid);
	Page<Product> allProductsPaginated(int page,int pagesize);
	List<Product> searchProducts(String name);
}
