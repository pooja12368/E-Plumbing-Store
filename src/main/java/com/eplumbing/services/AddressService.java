package com.eplumbing.services;

import com.eplumbing.entities.Address;

public interface AddressService {
	Address saveAddress(Address address);
	Address findAddress(int id);
}
