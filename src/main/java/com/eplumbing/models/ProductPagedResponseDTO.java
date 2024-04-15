package com.eplumbing.models;

import java.util.List;

import com.eplumbing.entities.Product;

public class ProductPagedResponseDTO {
	private List<Product> plist;
	private int current;
	private long total;
	private int pagesize;
	public List<Product> getPlist() {
		return plist;
	}
	public void setPlist(List<Product> plist) {
		this.plist = plist;
	}
	public int getCurrent() {
		return current;
	}
	public void setCurrent(int current) {
		this.current = current;
	}
	public long getTotal() {
		return total;
	}
	public void setTotal(long total) {
		this.total = total;
	}
	public int getPagesize() {
		return pagesize;
	}
	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}
	@Override
	public String toString() {
		return "ProductPagedResponseDTO [plist=" + plist + ", current=" + current + ", total=" + total + ", pagesize="
				+ pagesize + "]";
	}
	
	
}
