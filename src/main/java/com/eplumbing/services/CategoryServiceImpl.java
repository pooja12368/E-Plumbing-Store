package com.eplumbing.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eplumbing.daos.CategoryDao;
import com.eplumbing.entities.Category;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired private CategoryDao repo;
	
	public void save(Category cat) {
		repo.save(cat);
	}
	
	public List<Category> listAll(){
		return repo.findAll();
	}
	
	public Category findById(int id) {
		return repo.findById(id).orElse(null);
	}
	
	public void deleteCategory(int id) {
		Category cat=findById(id);
		cat.setIsactive(false);
		repo.save(cat);
	}

	@Override
	public void updateStatus(int id, boolean status) {
		Category cat=findById(id);
		cat.setIsactive(status);
		repo.save(cat);		
	}
}
