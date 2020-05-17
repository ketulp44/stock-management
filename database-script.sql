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
	"contact_number" VARCHAR(50) NULL DEFAULT NULL,
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
	"package_size" INTEGER NOT NULL,
	"package_unit" VARCHAR(200) NOT NULL,
	"no_of_bags" INTEGER NOT NULL,
	"stock_location" VARCHAR(200) NULL,
	"price" DECIMAL(22,12) NOT NULL,
	"incm_date_time" TIMESTAMP NOT NULL,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("ins_id")
);

DROP TABLE IF EXISTS "current_stocks";
CREATE TABLE "current_stocks" (
	"cs_id" SERIAL,
	"c_id" INTEGER NOT NULL,
	"sc_id" INTEGER NOT NULL,
	"process_type" VARCHAR(200) NOT NULL,
	"quality_type" VARCHAR(200) NULL DEFAULT NULL,
	"quantity_in_kg" DECIMAL(22,2) NOT NULL,
	"price" DECIMAL(22,2) NOT NULL,
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
	"is_enabled" SMALLINT NOT NULL DEFAULT 1,
	"is_active" SMALLINT NOT NULL DEFAULT 1,
	"created_dt_time" TIMESTAMP  DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP  DEFAULT current_timestamp,

	PRIMARY KEY ("user_id")
);

DROP TABLE IF EXISTS "processed_current_stock_details";
CREATE TABLE "processed_current_stock_details" (
	"pcsd_id" SERIAL,
	"inward_stock_id" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"incoming_date_time" TIMESTAMP NOT NULL,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("pcsd_id")
);

DROP TABLE IF EXISTS "unprocessed_current_stock_details";
CREATE TABLE "unprocessed_current_stock_details" (
	"unpcsd_id" SERIAL,
	"inward_stock_id" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"incoming_date_time" TIMESTAMP NOT NULL,
	"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
	"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY ("unpcsd_id")
);


DELIMITER //
DROP PROCEDURE IF EXISTS stock_consolidation;
CREATE OR REPLACE PROCEDURE stock_consolidation()
LANGUAGE plpgsql
AS $$
BEGIN

TRUNCATE current_stocks;

-- current stock entry unprocessed
INSERT INTO current_stocks
 (
  sc_id,
  c_id,
  process_type,
  quantity_in_kg,
  price,
  is_active,
  created_dt_time,
  updated_dt_time
)
SELECT
ins.sc_id,
ins.c_id,
ins.process_type,
SUM(ucsd.quantity) AS quantity_in_kg,
0 AS price,
1 AS is_active,
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
FROM
unprocessed_current_stock_details ucsd
INNER JOIN inward_stocks ins ON ucsd.inward_stock_id = ins.ins_id
GROUP BY
ins.sc_id,
ins.c_id,
ins.process_type;


-- process current stock entry
INSERT INTO current_stocks
 (
  sc_id,
  c_id,
  process_type,
  quantity_in_kg,
  quality_type,
  price,
  is_active,
  created_dt_time,
  updated_dt_time
)
SELECT
ins.sc_id,
ins.c_id,
ins.process_type,
SUM(ucsd.quantity) AS quantity_in_kg,
ins.quantity_type,
0 AS price,
1 AS is_active,
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
FROM
processed_current_stock_details ucsd
INNER JOIN inward_stocks ins ON ucsd.inward_stock_id = ins.ins_id
GROUP BY
ins.sc_id,
ins.c_id,
ins.process_type,
ins.quantity_type;

--SELECT * FROM current_stocks;
END;
$$;


/**
SELECT 'DROP FUNCTION ' || oid::regprocedure
FROM   pg_proc
WHERE  proname = 'submit_currenstock'  -- name without schema-qualification
AND    pg_function_is_visible(oid);
*/
DROP TABLE IF EXISTS unjhastockmanagement."stock_in_processing_details";
create table unjhastockmanagement."stock_in_processing_details"
(
"id" SERIAL,
"inward_stock_id" integer not null,
"s_id" integer not null,
"c_id" integer not null,
"sc_id" integer not null,
"quantity" integer ,
"unprocessed_current_stock_id" integer not null,
"is_active" smallint default 0,
"incoming_date" timestamp default current_timestamp,
"created_date" timestamp default current_timestamp,
"updated_date" timestamp default current_timestamp
);


create table unjhastockmanagement."outward_stocks"
(
"id" SERIAL,
"c_id" integer not null,
"cu_id" integer not null,
"sc_id" integer not null,
"quality_type" VARCHAR(200) NULL DEFAULT NULL,
"package_size" INTEGER NOT NULL,
"package_unit" VARCHAR(200) NOT NULL,
"no_of_bags" INTEGER NOT NULL,
"stock_location" VARCHAR(200) NULL,
"price" DECIMAL(22,12) NOT NULL,
"incm_date_time" TIMESTAMP NOT NULL,
"is_active" SMALLINT NOT NULL DEFAULT 1,
"created_dt_time" TIMESTAMP DEFAULT current_timestamp,
"updated_dt_time" TIMESTAMP DEFAULT current_timestamp,
);

alter table unjhastockmanagement.processed_current_stock_details
add column c_id int ,
add column sc_id int ;

alter table unjhastockmanagement.processed_current_stock_details alter column inward_stock_id drop not null;