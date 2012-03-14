--
-- PostgreSQL database dump
--

-- Dumped from database version 9.1.3
-- Dumped by pg_dump version 9.1.3
-- Started on 2012-03-14 00:14:23 BRT

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 163 (class 3079 OID 11682)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1903 (class 0 OID 0)
-- Dependencies: 163
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 162 (class 1259 OID 29953)
-- Dependencies: 1892 1893 6
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(20),
    passwd character varying,
    salt character varying,
    enabled boolean DEFAULT true NOT NULL,
    change_passwd boolean DEFAULT true
);


--
-- TOC entry 161 (class 1259 OID 29951)
-- Dependencies: 162 6
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 1904 (class 0 OID 0)
-- Dependencies: 161
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 1905 (class 0 OID 0)
-- Dependencies: 161
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- TOC entry 1891 (class 2604 OID 29956)
-- Dependencies: 162 161 162
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 1898 (class 0 OID 29953)
-- Dependencies: 162
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO users (id, name, email, username, passwd, salt, enabled, change_passwd) VALUES (1, 'Administrador', 'admin@barraetc.com.br', 'administrador', 'aab53579df4e65ecf4f67daf34dea758', 'aaf3508e562d3183c7666564013be4ce', true, false);


--
-- TOC entry 1895 (class 2606 OID 29965)
-- Dependencies: 162 162
-- Name: uk_username; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT uk_username UNIQUE (username);


--
-- TOC entry 1897 (class 2606 OID 29963)
-- Dependencies: 162 162
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2012-03-14 00:14:23 BRT

--
-- PostgreSQL database dump complete
--

