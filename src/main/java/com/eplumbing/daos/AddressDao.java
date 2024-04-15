package com.eplumbing.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eplumbing.entities.Address;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer> {

}
