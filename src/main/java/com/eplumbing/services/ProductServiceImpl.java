package com.eplumbing.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.eplumbing.daos.ProductDao;
import com.eplumbing.entities.Product;
import com.eplumbing.utils.StorageService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired private ProductDao dao;
	@Autowired private StorageService storageService;
	
	@Override
	public void addProduct(Product p,MultipartFile pic) {
		// TODO Auto-generated method stub
		String photo=storageService.store(pic);
		p.setPhoto(photo);
		dao.save(p);
	}

	@Override
	public void updateProduct(Product p,MultipartFile pic) {
		System.out.println(p);
		if(pic==null) {
			Product pp=dao.getById(p.getProdid());
			p.setPhoto(pp.getPhoto());
		}else {
			String photo=storageService.store(pic);
			p.setPhoto(photo);
		}
		dao.save(p);
	}

	@Override
	public void deleteProduct(int prodid) {
		// TODO Auto-generated method stub
		Product p=dao.getById(prodid);
		dao.delete(p);
	}

	@Override
	public List<Product> allProducts() {
		// TODO Auto-generated method stub
		return dao.findAll(Sort.by(Sort.Direction.DESC,"prodid"));
	}

	@Override
	public Product findProductById(int prodid) {
		// TODO Auto-generated method stub
		return dao.getById(prodid);
	}

	@Override
	public List<Product> categoryProducts(int pcat) {
		// TODO Auto-generated method stub
		return dao.findByCategoryId(pcat,Sort.by(Sort.Direction.DESC,"prodid"));
	}
	
	@Override
	public List<Product> searchProducts(String name){
		return dao.findByPnameContaining(name);
	}
	
	@Override
	public Page<Product> allProductsPaginated(int page,int pagesize) {
		Page<Product> prods=dao.findAll(PageRequest.of(page, pagesize,Sort.by(Direction.DESC, "prodid")));
		System.err.println(prods.getSize());
		return prods;
	}
}
