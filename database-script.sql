DROP TABLE IF EXISTS "suppliers";
CREATE TABLE "suppliers" (
	"s_id" SERIAL,
	"s_name" VARCHAR(200) NOT NULL,
	"contact_number" VARCHAR(50) NULL DEFAULT NULL,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("s_id")
);


DROP TABLE IF EXISTS "customers";
CREATE TABLE "customers" (
	"cu_id" SERIAL,	
	"cu_name" VARCHAR(200) NOT NULL,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("cu_id")
);


DROP TABLE IF EXISTS "commodity";
CREATE TABLE "commodity" (
	"c_id" SERIAL,
	"c_name" VARCHAR(200) NOT NULL,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("c_id")
);


DROP TABLE IF EXISTS "sub_commodity";
CREATE TABLE "sub_commodity" (
	"sc_id" SERIAL,
	"sc_name" VARCHAR(200) NOT NULL,
	"com_id" INTEGER NOT NULL DEFAULT 0,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("sc_id")
);


DROP TABLE IF EXISTS "inward_stocks";
CREATE TABLE "inward_stocks" (
	"ins_id" SERIAL,
	"s_id" INTEGER NOT NULL,
	"c_id" INTEGER NOT NULL,
	"sc_id" INTEGER NOT NULL,
	"process_type" VARCHAR(200) NOT NULL,
	"quantity_type" VARCHAR(200) NOT NULL,
	"package_size" VARCHAR(200) NOT NULL,
	"package_unit" VARCHAR(200) NOT NULL,
	"no_of_bags" INTEGER NOT NULL,
	"stock_location" VARCHAR(200) NULL,
	"price" DECIMAL(22,12) NOT NULL,
	"incm_date" TIMESTAMP NOT NULL,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("ins_id")
);

DROP TABLE IF EXISTS "current_stocks";
CREATE TABLE "current_stocks" (
	"cs_id" SERIAL,
	"s_id" INTEGER NOT NULL,
	"c_id" INTEGER NOT NULL,
	"process_type" VARCHAR(200) NOT NULL,
	"quantity_type" VARCHAR(200) NOT NULL,
	"package_size" VARCHAR(200) NOT NULL,
	"package_unit" VARCHAR(200) NOT NULL,
	"no_of_bags" INTEGER NOT NULL,
	"price" DECIMAL(22,12) NOT NULL,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("cs_id")
);

DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"user_id" SERIAL,
	"user_name" VARCHAR(200) NOT NULL,
	"password" VARCHAR(500) NOT NULL,
	"email" VARCHAR(200) NOT NULL,
	"role" VARCHAR(200) NOT NULL,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP  DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP  DEFAULT current_timestamp,

	PRIMARY KEY ("user_id")
);



INSERT INTO "unjhastockmanagement"."suppliers" ("s_name") VALUES ('KADAM2');

SELECT * from suppliers AS s WHERE s.s_id  IN ('2');


SELECT "suppliers"."s_id" AS "suppliers_s_id", "suppliers"."s_name" AS "suppliers_s_name", "suppliers"."is_active" AS "Suppliers_is_active", "Suppliers"."created_dt_time" AS "Suppliers_created_dt_time", "Suppliers"."updated_dt_time" AS "Suppliers_updated_dt_time" FROM "unjhastockmanagement"."suppliers" "Suppliers" WHERE "Suppliers"."s_id" IN ("2");