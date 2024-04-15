package com.eplumbing.models;

public class LoginResponse {

	private int id;
	private String userid;
	private String uname;
	private String role;
	
	public LoginResponse(int id, String userid, String uname, String role) {
		this.id = id;
		this.userid = userid;
		this.uname = uname;
		this.role = role;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
}
