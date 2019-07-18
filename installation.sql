create database monitoring;
use monitoring;
create table application (
	ApplicationID integer,
	ApplicationName varchar(255),
	Problem integer,
	Auswirkung varchar(255),
	Loesung varchar(255),
	VorraussichtlicherTermin integer
);