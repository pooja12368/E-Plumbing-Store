package com.eplumbing.services;

import java.util.List;

import com.eplumbing.entities.Customer;
import com.eplumbing.entities.Order;

public interface OrderService {

	Order saveOrder(Order order);
	List<Order> getAllOrders();
	List<Order> getCustomerOrders(Customer customer);
	Order findById(int id);
}
