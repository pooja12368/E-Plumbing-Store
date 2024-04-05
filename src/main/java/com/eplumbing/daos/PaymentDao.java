package com.eplumbing.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eplumbing.entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Integer> {

}
