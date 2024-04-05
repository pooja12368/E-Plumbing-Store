package com.eplumbing.services;

import java.util.List;

import com.eplumbing.entities.Order;
import com.eplumbing.entities.OrderDetails;

public interface OrderdetailService {

	void saveOrderDetails(OrderDetails od);
	OrderDetails findById(int id);
	List<OrderDetails> findByOrder(Order order);
}
