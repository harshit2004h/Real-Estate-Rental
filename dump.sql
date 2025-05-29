--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: Amenity; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Amenity" AS ENUM (
    'WasherDryer',
    'AirConditioning',
    'Dishwasher',
    'HighSpeedInternet',
    'HardwoodFloors',
    'WalkInClosets',
    'Microwave',
    'Refrigerator',
    'Pool',
    'Gym',
    'Parking',
    'PetsAllowed',
    'WiFi'
);


ALTER TYPE public."Amenity" OWNER TO postgres;

--
-- Name: ApplicationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ApplicationStatus" AS ENUM (
    'Pending',
    'Denied',
    'Approved'
);


ALTER TYPE public."ApplicationStatus" OWNER TO postgres;

--
-- Name: Highlight; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Highlight" AS ENUM (
    'HighSpeedInternetAccess',
    'WasherDryer',
    'AirConditioning',
    'Heating',
    'SmokeFree',
    'CableReady',
    'SatelliteTV',
    'DoubleVanities',
    'TubShower',
    'Intercom',
    'SprinklerSystem',
    'RecentlyRenovated',
    'CloseToTransit',
    'GreatView',
    'QuietNeighborhood'
);


ALTER TYPE public."Highlight" OWNER TO postgres;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'Pending',
    'Paid',
    'PartiallyPaid',
    'Overdue'
);


ALTER TYPE public."PaymentStatus" OWNER TO postgres;

--
-- Name: PropertyType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PropertyType" AS ENUM (
    'Rooms',
    'Tinyhouse',
    'Apartment',
    'Villa',
    'Townhouse',
    'Cottage'
);


ALTER TYPE public."PropertyType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Application" (
    id integer NOT NULL,
    "applicationDate" timestamp(3) without time zone NOT NULL,
    status public."ApplicationStatus" NOT NULL,
    "propertyId" integer NOT NULL,
    "tenantCognitoId" text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text NOT NULL,
    message text,
    "leaseId" integer
);


ALTER TABLE public."Application" OWNER TO postgres;

--
-- Name: Application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Application_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Application_id_seq" OWNER TO postgres;

--
-- Name: Application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Application_id_seq" OWNED BY public."Application".id;


--
-- Name: Lease; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lease" (
    id integer NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    rent double precision NOT NULL,
    deposit double precision NOT NULL,
    "propertyId" integer NOT NULL,
    "tenantCognitoId" text NOT NULL
);


ALTER TABLE public."Lease" OWNER TO postgres;

--
-- Name: Lease_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Lease_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Lease_id_seq" OWNER TO postgres;

--
-- Name: Lease_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Lease_id_seq" OWNED BY public."Lease".id;


--
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    id integer NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    country text NOT NULL,
    "postalCode" text NOT NULL,
    coordinates public.geography(Point,4326) NOT NULL
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- Name: Location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Location_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Location_id_seq" OWNER TO postgres;

--
-- Name: Location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Location_id_seq" OWNED BY public."Location".id;


--
-- Name: Manager; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Manager" (
    id integer NOT NULL,
    "cognitoId" text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text NOT NULL
);


ALTER TABLE public."Manager" OWNER TO postgres;

--
-- Name: Manager_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Manager_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Manager_id_seq" OWNER TO postgres;

--
-- Name: Manager_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Manager_id_seq" OWNED BY public."Manager".id;


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    "amountDue" double precision NOT NULL,
    "amountPaid" double precision NOT NULL,
    "dueDate" timestamp(3) without time zone NOT NULL,
    "paymentDate" timestamp(3) without time zone NOT NULL,
    "paymentStatus" public."PaymentStatus" NOT NULL,
    "leaseId" integer NOT NULL
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Payment_id_seq" OWNER TO postgres;

--
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- Name: Property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Property" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "pricePerMonth" double precision NOT NULL,
    "securityDeposit" double precision NOT NULL,
    "applicationFee" double precision NOT NULL,
    "photoUrls" text[],
    amenities public."Amenity"[],
    highlights public."Highlight"[],
    "isPetsAllowed" boolean DEFAULT false NOT NULL,
    "isParkingIncluded" boolean DEFAULT false NOT NULL,
    beds integer NOT NULL,
    baths double precision NOT NULL,
    "squareFeet" integer NOT NULL,
    "propertyType" public."PropertyType" NOT NULL,
    "postedDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "averageRating" double precision DEFAULT 0,
    "numberOfReviews" integer DEFAULT 0,
    "locationId" integer NOT NULL,
    "managerCognitoId" text NOT NULL
);


ALTER TABLE public."Property" OWNER TO postgres;

--
-- Name: Property_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Property_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Property_id_seq" OWNER TO postgres;

--
-- Name: Property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Property_id_seq" OWNED BY public."Property".id;


--
-- Name: Tenant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tenant" (
    id integer NOT NULL,
    "cognitoId" text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text NOT NULL
);


ALTER TABLE public."Tenant" OWNER TO postgres;

--
-- Name: Tenant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tenant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tenant_id_seq" OWNER TO postgres;

--
-- Name: Tenant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tenant_id_seq" OWNED BY public."Tenant".id;


--
-- Name: _TenantFavorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_TenantFavorites" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_TenantFavorites" OWNER TO postgres;

--
-- Name: _TenantProperties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_TenantProperties" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_TenantProperties" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Application id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Application" ALTER COLUMN id SET DEFAULT nextval('public."Application_id_seq"'::regclass);


--
-- Name: Lease id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lease" ALTER COLUMN id SET DEFAULT nextval('public."Lease_id_seq"'::regclass);


--
-- Name: Location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location" ALTER COLUMN id SET DEFAULT nextval('public."Location_id_seq"'::regclass);


--
-- Name: Manager id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager" ALTER COLUMN id SET DEFAULT nextval('public."Manager_id_seq"'::regclass);


--
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- Name: Property id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property" ALTER COLUMN id SET DEFAULT nextval('public."Property_id_seq"'::regclass);


--
-- Name: Tenant id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenant" ALTER COLUMN id SET DEFAULT nextval('public."Tenant_id_seq"'::regclass);


--
-- Data for Name: Application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Application" (id, "applicationDate", status, "propertyId", "tenantCognitoId", name, email, "phoneNumber", message, "leaseId") FROM stdin;
1	2023-05-20 00:00:00	Approved	1	us-east-2:98765432-90ab-cdef-1234-567890abcdef	Alice Brown	alice.brown@example.com	+1 (555) 111-2222	I am interested in this property.	1
2	2023-05-25 00:00:00	Pending	2	us-east-2:87654321-90ab-cdef-1234-567890abcdef	Bob Green	bob.green@example.com	+1 (555) 333-4444	Looking forward to viewing this apartment.	\N
3	2023-06-01 00:00:00	Denied	3	817b3540-a061-707b-742a-a28391181149	Carol White	carol.white@example.com	+1 (555) 555-6666	Excited about the possibility of renting this house.	\N
4	2023-06-10 00:00:00	Approved	4	us-east-2:65432109-90ab-cdef-1234-567890abcdef	David Lee	david.lee@example.com	+1 (555) 777-8888	This property looks perfect for my needs.	4
5	2023-06-15 00:00:00	Pending	5	us-east-2:54321098-90ab-cdef-1234-567890abcdef	Emma Taylor	emma.taylor@example.com	+1 (555) 999-0000	I'm very interested in this apartment.	\N
6	2023-06-20 00:00:00	Approved	6	us-east-2:43210987-90ab-cdef-1234-567890abcdef	Frank Wilson	frank.wilson@example.com	+1 (555) 222-3333	This property seems to fit all my requirements.	6
7	2023-06-25 00:00:00	Pending	3	us-east-2:32109876-90ab-cdef-1234-567890abcdef	Grace Miller	grace.miller@example.com	+1 (555) 444-5555	I'm interested in this loft and would like to schedule a viewing.	\N
8	2023-07-01 00:00:00	Approved	5	us-east-2:21098765-90ab-cdef-1234-567890abcdef	Henry Wilson	henry.wilson@example.com	+1 (555) 444-5555	I'm very interested in this luxury penthouse.	8
9	2023-07-05 00:00:00	Pending	7	us-east-2:10987654-90ab-cdef-1234-567890abcdef	Isabella Garcia	isabella.garcia@example.com	+1 (555) 666-7777	The historic brownstone looks perfect for my family.	\N
10	2023-07-10 00:00:00	Denied	2	us-east-2:09876543-90ab-cdef-1234-567890abcdef	Jack Thompson	jack.thompson@example.com	+1 (555) 888-9999	I'd love to rent this beach house for the summer.	\N
11	2023-07-15 00:00:00	Pending	8	us-east-2:a9876543-90ab-cdef-1234-567890abcdef	Karen Martinez	karen.martinez@example.com	+1 (555) 123-4567	I'm interested in this micro-apartment for its central location.	\N
12	2023-07-20 00:00:00	Approved	9	us-east-2:b9876543-90ab-cdef-1234-567890abcdef	Liam Johnson	liam.johnson@example.com	+1 (555) 987-6543	The mountain view cabin looks perfect for a weekend getaway.	12
13	2023-07-25 00:00:00	Pending	10	us-east-2:c9876543-90ab-cdef-1234-567890abcdef	Mia Rodriguez	mia.rodriguez@example.com	+1 (555) 246-8135	I'm curious about the eco-friendly features of this tiny house.	\N
14	2023-07-30 00:00:00	Approved	1	us-east-2:d9876543-90ab-cdef-1234-567890abcdef	Noah Kim	noah.kim@example.com	+1 (555) 369-2580	The downtown apartment seems ideal for my work location.	14
15	2023-08-05 00:00:00	Pending	4	us-east-2:e9876543-90ab-cdef-1234-567890abcdef	Olivia Chen	olivia.chen@example.com	+1 (555) 159-7531	I'm looking for a spacious family home like this one.	\N
17	2025-05-23 09:13:29.957	Approved	17	c4785428-1091-7056-4760-948d99d9129c	kachraseth	kachraseth820@gmail.com	9451022928	DEDO PLEASEEEE	18
16	2025-05-23 09:12:11.012	Denied	16	c4785428-1091-7056-4760-948d99d9129c	kachraseth	kachraseth820@gmail.com	9451022928	PLEASE	16
18	2025-05-23 09:45:06.408	Approved	20	c4785428-1091-7056-4760-948d99d9129c	kachraseth	kachraseth820@gmail.com	9451022928	Delhi mein rehna hai dedo please	20
19	2025-05-28 12:23:15.623	Pending	19	c4785428-1091-7056-4760-948d99d9129c	Kachra Seth	kachraseth820@gmail.com	9451022928	I want it I am chinese... CHILLI CHICKEN	21
\.


--
-- Data for Name: Lease; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lease" (id, "startDate", "endDate", rent, deposit, "propertyId", "tenantCognitoId") FROM stdin;
1	2023-07-01 00:00:00	2024-06-30 00:00:00	1500	1500	1	us-east-2:98765432-90ab-cdef-1234-567890abcdef
2	2023-08-01 00:00:00	2024-07-31 00:00:00	1800	1800	2	us-east-2:87654321-90ab-cdef-1234-567890abcdef
3	2023-09-01 00:00:00	2024-08-31 00:00:00	2200	2200	3	817b3540-a061-707b-742a-a28391181149
4	2023-07-15 00:00:00	2024-07-14 00:00:00	1700	1700	4	us-east-2:65432109-90ab-cdef-1234-567890abcdef
5	2023-08-15 00:00:00	2024-08-14 00:00:00	2000	2000	5	us-east-2:54321098-90ab-cdef-1234-567890abcdef
6	2023-09-15 00:00:00	2024-09-14 00:00:00	2400	2400	6	us-east-2:43210987-90ab-cdef-1234-567890abcdef
7	2023-10-01 00:00:00	2024-09-30 00:00:00	2200	2200	3	us-east-2:32109876-90ab-cdef-1234-567890abcdef
8	2023-08-01 00:00:00	2024-07-31 00:00:00	5000	5000	5	us-east-2:21098765-90ab-cdef-1234-567890abcdef
9	2023-11-01 00:00:00	2024-10-31 00:00:00	3000	3000	7	us-east-2:10987654-90ab-cdef-1234-567890abcdef
10	2023-08-15 00:00:00	2024-02-14 00:00:00	2000	2000	2	us-east-2:09876543-90ab-cdef-1234-567890abcdef
11	2023-09-01 00:00:00	2024-08-31 00:00:00	1000	1000	8	us-east-2:a9876543-90ab-cdef-1234-567890abcdef
12	2023-10-01 00:00:00	2023-12-31 00:00:00	1800	1800	9	us-east-2:b9876543-90ab-cdef-1234-567890abcdef
13	2023-09-15 00:00:00	2024-03-14 00:00:00	900	900	10	us-east-2:c9876543-90ab-cdef-1234-567890abcdef
14	2023-09-01 00:00:00	2024-08-31 00:00:00	1500	1500	1	us-east-2:d9876543-90ab-cdef-1234-567890abcdef
15	2023-10-01 00:00:00	2024-09-30 00:00:00	2500	2500	4	us-east-2:e9876543-90ab-cdef-1234-567890abcdef
16	2025-05-23 09:12:11.327	2026-05-23 09:12:11.327	1000	500	16	c4785428-1091-7056-4760-948d99d9129c
17	2025-05-23 09:13:29.978	2026-05-23 09:13:29.978	5000	500	17	c4785428-1091-7056-4760-948d99d9129c
18	2025-05-23 09:14:09.326	2026-05-23 09:14:09.326	5000	500	17	c4785428-1091-7056-4760-948d99d9129c
19	2025-05-23 09:45:06.533	2026-05-23 09:45:06.533	4000	500	20	c4785428-1091-7056-4760-948d99d9129c
20	2025-05-23 10:43:38.842	2026-05-23 10:43:38.842	4000	500	20	c4785428-1091-7056-4760-948d99d9129c
21	2025-05-28 12:23:16.054	2026-05-28 12:23:16.054	1000	500	19	c4785428-1091-7056-4760-948d99d9129c
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, address, city, state, country, "postalCode", coordinates) FROM stdin;
1	123 Colorado Blvd	Pasadena	CA	United States	91105	0101000020E6100000EB6F09C03F895DC070EB6E9EEA124140
2	456 Ocean Ave	Santa Monica	CA	United States	90401	0101000020E61000007C4276DEC69F5DC0D4BA0D6ABF014140
3	789 Hollywood Way	Burbank	CA	United States	91505	0101000020E61000001F9E25C808955DC0B16B7BBB25174140
4	101 Pine Ave	Long Beach	CA	United States	90802	0101000020E61000000B45BA9F538C5DC0359886E123E24040
5	555 Manhattan Ave	New York	NY	United States	10001	0101000020E6100000282D5C56618052C0588E90813C5B4440
6	888 Malibu Road	Malibu	CA	United States	90265	0101000020E6100000740AF2B391B15DC09B1F7F6951034140
7	777 Brand Blvd	Glendale	CA	United States	91203	0101000020E6100000E481C8224D905DC08DB5BFB33D124140
8	555 Torrance Blvd	Torrance	CA	United States	90503	0101000020E6100000C898BB9690965DC079B29B19FDEA4040
9	1234 Ocean Dr	Miami	FL	United States	33139	0101000020E6100000888043A8520854C0BD73284355C83940
10	789 Rodeo Dr	Beverly Hills	CA	United States	90210	0101000020E610000079B0C56E9F995DC06F2A52616C094140
16	123 Gomti Nagar	Lucknow	Uttar Pradesh	India	226010	0101000020E6100000A715F07CD03B544011C7BAB88DD63A40
17	221B George Street	Sydney	NSW	Australia	2000	0101000020E6100000D39FFD4891E662401D397760A5F040C0
18	100 Nanjing West Road	Shanghai	Shanghai	China	200041	0101000020E6100000C2058F25E25C5E4069CB14CEC93A3F40
19	300 Huaihai Middle Road	Shanghai	Shanghai	China	200021	0101000020E6100000A296E656085E5E400807D6CCB5393F40
20	45 MG Road	New Delhi	Delhi	India	110001	0101000020E61000008AD9DCE22B495340A0BF756AD37D3C40
21	123 Maplewood Lane	Austin	Texas	United States	78704	0101000020E61000004DA3C9C5986F58C0A10216AF68453E40
\.


--
-- Data for Name: Manager; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Manager" (id, "cognitoId", name, email, "phoneNumber") FROM stdin;
1	010be580-60a1-70ae-780e-18a6fd94ad32	John Smith	john.smith@example.com	+1 (555) 123-4567
2	us-east-2:23456789-90ab-cdef-1234-567890abcdef	Sarah Johnson	sarah.johnson@example.com	+1 (555) 987-6543
3	us-east-2:34567890-90ab-cdef-1234-567890abcdef	Michael Brown	michael.brown@example.com	+1 (555) 456-7890
4	us-east-2:45678901-90ab-cdef-1234-567890abcdef	Emily Davis	emily.davis@example.com	+1 (555) 234-5678
5	us-east-2:56789012-90ab-cdef-1234-567890abcdef	Robert Wilson	robert.wilson@example.com	+1 (555) 876-5432
6	us-east-2:67890123-90ab-cdef-1234-567890abcdef	Lisa Thompson	lisa.thompson@example.com	+1 (555) 345-6789
7	us-east-2:78901234-90ab-cdef-1234-567890abcdef	Daniel Martinez	daniel.martinez@example.com	+1 (555) 789-0123
8	us-east-2:89012345-90ab-cdef-1234-567890abcdef	Olivia Garcia	olivia.garcia@example.com	+1 (555) 678-9012
9	us-east-2:90123456-90ab-cdef-1234-567890abcdef	Ethan Rodriguez	ethan.rodriguez@example.com	+1 (555) 567-8901
10	us-east-2:01234567-90ab-cdef-1234-567890abcdef	Sophia Kim	sophia.kim@example.com	+1 (555) 456-7890
11	f40834a8-9061-70f4-572c-7cabf2c1a955	johndoe	testdesk.work@gmail.com	+11 1234567890
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, "amountDue", "amountPaid", "dueDate", "paymentDate", "paymentStatus", "leaseId") FROM stdin;
1	1500	1500	2023-07-01 00:00:00	2023-06-28 00:00:00	Paid	1
2	1800	0	2023-08-01 00:00:00	2023-07-28 00:00:00	Pending	2
3	2200	2200	2023-09-01 00:00:00	2023-08-30 00:00:00	Paid	3
4	1700	1700	2023-07-15 00:00:00	2023-07-14 00:00:00	Paid	4
5	2000	0	2023-08-15 00:00:00	2023-08-14 00:00:00	Pending	5
6	2400	2400	2023-09-15 00:00:00	2023-09-14 00:00:00	Paid	6
7	2200	1100	2023-10-01 00:00:00	2023-09-25 00:00:00	PartiallyPaid	7
8	5000	5000	2023-08-01 00:00:00	2023-07-30 00:00:00	Paid	8
9	3000	1500	2023-11-01 00:00:00	2023-10-25 00:00:00	PartiallyPaid	9
10	2000	2000	2023-08-15 00:00:00	2023-08-10 00:00:00	Paid	10
11	1000	0	2023-09-01 00:00:00	2023-08-30 00:00:00	Pending	11
12	1800	1800	2023-10-01 00:00:00	2023-09-28 00:00:00	Paid	12
13	900	450	2023-09-15 00:00:00	2023-09-10 00:00:00	PartiallyPaid	13
14	1500	1500	2023-09-01 00:00:00	2023-08-30 00:00:00	Paid	14
15	2500	0	2023-10-01 00:00:00	2023-09-28 00:00:00	Paid	15
\.


--
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Property" (id, name, description, "pricePerMonth", "securityDeposit", "applicationFee", "photoUrls", amenities, highlights, "isPetsAllowed", "isParkingIncluded", beds, baths, "squareFeet", "propertyType", "postedDate", "averageRating", "numberOfReviews", "locationId", "managerCognitoId") FROM stdin;
1	Sunny Downtown Apartment	A beautiful apartment in the heart of downtown with plenty of natural light.	1500	1500	50	{https://example.com/apartment1_1.jpg,https://example.com/apartment1_2.jpg}	{AirConditioning,WasherDryer,Parking}	{HighSpeedInternetAccess,CloseToTransit}	t	f	2	1	800	Apartment	2023-05-15 00:00:00	4.5	10	1	010be580-60a1-70ae-780e-18a6fd94ad32
2	Cozy Beach House	A charming beach house with stunning ocean views.	2000	2000	75	{https://example.com/beachhouse1.jpg,https://example.com/beachhouse2.jpg}	{AirConditioning,WasherDryer,Parking,Pool}	{GreatView,CloseToTransit}	t	t	3	2	1200	Villa	2023-06-01 00:00:00	4.8	5	2	us-east-2:23456789-90ab-cdef-1234-567890abcdef
3	Modern City Loft	Sleek and stylish loft in the heart of the city.	2200	2200	60	{https://example.com/cityloft1.jpg,https://example.com/cityloft2.jpg}	{AirConditioning,WasherDryer,Gym}	{HighSpeedInternetAccess,CloseToTransit}	t	f	1	1	900	Apartment	2023-07-01 00:00:00	4.7	8	3	us-east-2:34567890-90ab-cdef-1234-567890abcdef
4	Spacious Family Home	Large family home with a beautiful backyard and modern amenities.	2500	2500	80	{https://example.com/familyhome1.jpg,https://example.com/familyhome2.jpg}	{AirConditioning,WasherDryer,Parking,Dishwasher}	{QuietNeighborhood}	t	f	4	3	2000	Villa	2023-06-15 00:00:00	4.9	12	4	us-east-2:45678901-90ab-cdef-1234-567890abcdef
5	Luxury Penthouse	Stunning penthouse with panoramic city views and high-end finishes.	5000	5000	100	{https://example.com/penthouse1.jpg,https://example.com/penthouse2.jpg}	{AirConditioning,WasherDryer,Gym,Pool}	{GreatView}	t	f	3	3	2500	Apartment	2023-07-01 00:00:00	5	15	5	us-east-2:56789012-90ab-cdef-1234-567890abcdef
6	Cozy Studio Apartment	Efficient studio apartment perfect for students or young professionals.	1200	1200	40	{https://example.com/studio1.jpg,https://example.com/studio2.jpg}	{AirConditioning,HighSpeedInternet}	{CloseToTransit}	t	f	0	1	400	Apartment	2023-08-01 00:00:00	4.2	6	6	us-east-2:67890123-90ab-cdef-1234-567890abcdef
7	Historic Brownstone	Charming brownstone with original features and modern updates.	3000	3000	70	{https://example.com/brownstone1.jpg,https://example.com/brownstone2.jpg}	{AirConditioning,WasherDryer,HighSpeedInternet}	{RecentlyRenovated}	t	f	3	2	1800	Townhouse	2023-09-01 00:00:00	4.6	9	7	us-east-2:78901234-90ab-cdef-1234-567890abcdef
8	Urban Micro-Apartment	Compact and efficient living space in the heart of the city.	1000	1000	30	{https://example.com/micro1.jpg,https://example.com/micro2.jpg}	{AirConditioning,HighSpeedInternet}	{CloseToTransit}	t	f	0	1	300	Apartment	2023-08-01 00:00:00	4.3	7	8	us-east-2:89012345-90ab-cdef-1234-567890abcdef
9	Mountain View Cabin	Rustic cabin with breathtaking mountain views and modern amenities.	1800	1800	60	{https://example.com/cabin1.jpg,https://example.com/cabin2.jpg}	{WasherDryer,AirConditioning}	{GreatView,QuietNeighborhood}	t	f	2	1	1000	Cottage	2023-08-15 00:00:00	4.9	11	9	us-east-2:90123456-90ab-cdef-1234-567890abcdef
10	Eco-Friendly Tiny House	Sustainable living in a compact, well-designed tiny house.	900	900	35	{https://example.com/tinyhouse1.jpg,https://example.com/tinyhouse2.jpg}	{WasherDryer,AirConditioning,HighSpeedInternet}	{SmokeFree}	t	f	1	1	250	Tinyhouse	2023-08-10 00:00:00	4.7	8	10	us-east-2:01234567-90ab-cdef-1234-567890abcdef
16	new property	This is new property	1000	500	100	\N	{AirConditioning}	{RecentlyRenovated}	t	t	1	1	1000	Apartment	2025-05-23 06:27:10.157	0	0	16	f40834a8-9061-70f4-572c-7cabf2c1a955
17	New property Australia	This is very big property in Australia	5000	500	100	\N	{HighSpeedInternet}	{GreatView}	t	t	5	5	5000	Villa	2025-05-23 08:07:59.019	0	0	17	f40834a8-9061-70f4-572c-7cabf2c1a955
18	Big Villa China	This is a big Villa in China.	1000	500	100	\N	{Gym}	{RecentlyRenovated}	t	t	2	2	2000	Villa	2025-05-23 09:25:52.818	0	0	18	f40834a8-9061-70f4-572c-7cabf2c1a955
19	Big Villa China 2	This is new 3	1000	500	100	\N	{AirConditioning}	{HighSpeedInternetAccess}	t	t	1	1	1000	Villa	2025-05-23 09:31:32.123	0	0	19	f40834a8-9061-70f4-572c-7cabf2c1a955
20	MG Residency Apartments	Modern 3BHK apartments located on MG Road, New Delhi, featuring spacious living areas, contemporary interiors, 24/7 security, and easy access to public transport, shopping centers, and schools. Ideal for families looking for comfort and convenience in the heart of the city.	4000	500	100	\N	{Microwave}	{DoubleVanities}	t	t	3	2	1500	Apartment	2025-05-23 09:42:33.098	0	0	20	f40834a8-9061-70f4-572c-7cabf2c1a955
21	Maplewood Retreat	A cozy and modern 2-bedroom rental nestled in the heart of Austin, perfect for professionals or small families. Located in a quiet neighborhood with easy access to downtown, parks, and local eateries.	1000	500	100	{https://res.cloudinary.com/harshitscloud/image/upload/v1748507181/properties/uhf4tmzux33sf2kizfi1.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1748507182/properties/gz31a2ov3uhdw74igqrv.jpg}	{AirConditioning}	{Heating}	t	t	2	2	1000	Tinyhouse	2025-05-29 08:26:26.334	0	0	21	f40834a8-9061-70f4-572c-7cabf2c1a955
\.


--
-- Data for Name: Tenant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tenant" (id, "cognitoId", name, email, "phoneNumber") FROM stdin;
1	817b3540-a061-707b-742a-a28391181149	Carol White	carol.white@example.com	+1 (555) 555-6666
2	us-east-2:87654321-90ab-cdef-1234-567890abcdef	Bob Green	bob.green@example.com	+1 (555) 333-4444
3	us-east-2:98765432-90ab-cdef-1234-567890abcdef	Alice Brown	alice.brown@example.com	+1 (555) 111-2222
4	us-east-2:65432109-90ab-cdef-1234-567890abcdef	David Lee	david.lee@example.com	+1 (555) 777-8888
5	us-east-2:54321098-90ab-cdef-1234-567890abcdef	Emma Taylor	emma.taylor@example.com	+1 (555) 999-0000
6	us-east-2:43210987-90ab-cdef-1234-567890abcdef	Frank Wilson	frank.wilson@example.com	+1 (555) 222-3333
7	us-east-2:32109876-90ab-cdef-1234-567890abcdef	Grace Miller	grace.miller@example.com	+1 (555) 444-5555
8	us-east-2:21098765-90ab-cdef-1234-567890abcdef	Henry Wilson	henry.wilson@example.com	+1 (555) 444-5555
9	us-east-2:10987654-90ab-cdef-1234-567890abcdef	Isabella Garcia	isabella.garcia@example.com	+1 (555) 666-7777
10	us-east-2:09876543-90ab-cdef-1234-567890abcdef	Jack Thompson	jack.thompson@example.com	+1 (555) 888-9999
11	us-east-2:a9876543-90ab-cdef-1234-567890abcdef	Karen Martinez	karen.martinez@example.com	+1 (555) 123-4567
12	us-east-2:b9876543-90ab-cdef-1234-567890abcdef	Liam Johnson	liam.johnson@example.com	+1 (555) 987-6543
13	us-east-2:c9876543-90ab-cdef-1234-567890abcdef	Mia Rodriguez	mia.rodriguez@example.com	+1 (555) 246-8135
14	us-east-2:d9876543-90ab-cdef-1234-567890abcdef	Noah Kim	noah.kim@example.com	+1 (555) 369-2580
15	us-east-2:e9876543-90ab-cdef-1234-567890abcdef	Olivia Chen	olivia.chen@example.com	+1 (555) 159-7531
16	c4288408-0021-70ce-2c30-a38af09a7bbe	rakesh	rakeshchandra0406@gmail.com	
17	c4785428-1091-7056-4760-948d99d9129c	kachraseth	kachraseth820@gmail.com	9451022928
\.


--
-- Data for Name: _TenantFavorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_TenantFavorites" ("A", "B") FROM stdin;
2	2
4	4
5	4
1	5
5	5
6	5
3	7
7	7
7	9
9	9
2	10
10	10
1	11
4	11
7	11
3	12
6	12
9	12
1	14
10	14
4	15
7	15
9	15
3	17
17	17
1	17
\.


--
-- Data for Name: _TenantProperties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_TenantProperties" ("A", "B") FROM stdin;
5	1
6	1
4	4
2	5
9	5
10	6
6	7
3	8
7	9
8	9
10	10
2	11
4	13
5	15
17	17
20	17
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
963abda4-ce78-4f10-aa6b-5782d374cfbb	1f2c23b78324576f03cacf0fa365252bebec5e1b590df1b05a310346ce65c062	2025-05-13 22:13:48.684692+05:30	20250513164348_init	\N	\N	2025-05-13 22:13:48.31222+05:30	1
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: Application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Application_id_seq"', 19, true);


--
-- Name: Lease_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Lease_id_seq"', 21, true);


--
-- Name: Location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Location_id_seq"', 21, true);


--
-- Name: Manager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Manager_id_seq"', 11, true);


--
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 16, false);


--
-- Name: Property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Property_id_seq"', 21, true);


--
-- Name: Tenant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tenant_id_seq"', 17, true);


--
-- Name: Application Application_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_pkey" PRIMARY KEY (id);


--
-- Name: Lease Lease_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: Manager Manager_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT "Manager_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Property Property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_pkey" PRIMARY KEY (id);


--
-- Name: Tenant Tenant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);


--
-- Name: _TenantFavorites _TenantFavorites_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TenantFavorites"
    ADD CONSTRAINT "_TenantFavorites_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _TenantProperties _TenantProperties_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TenantProperties"
    ADD CONSTRAINT "_TenantProperties_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Application_leaseId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Application_leaseId_key" ON public."Application" USING btree ("leaseId");


--
-- Name: Manager_cognitoId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Manager_cognitoId_key" ON public."Manager" USING btree ("cognitoId");


--
-- Name: Tenant_cognitoId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Tenant_cognitoId_key" ON public."Tenant" USING btree ("cognitoId");


--
-- Name: _TenantFavorites_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_TenantFavorites_B_index" ON public."_TenantFavorites" USING btree ("B");


--
-- Name: _TenantProperties_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_TenantProperties_B_index" ON public."_TenantProperties" USING btree ("B");


--
-- Name: Application Application_leaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES public."Lease"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Application Application_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Application Application_tenantCognitoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_tenantCognitoId_fkey" FOREIGN KEY ("tenantCognitoId") REFERENCES public."Tenant"("cognitoId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Lease Lease_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Lease Lease_tenantCognitoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_tenantCognitoId_fkey" FOREIGN KEY ("tenantCognitoId") REFERENCES public."Tenant"("cognitoId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_leaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES public."Lease"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Property Property_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Property Property_managerCognitoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_managerCognitoId_fkey" FOREIGN KEY ("managerCognitoId") REFERENCES public."Manager"("cognitoId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _TenantFavorites _TenantFavorites_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TenantFavorites"
    ADD CONSTRAINT "_TenantFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TenantFavorites _TenantFavorites_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TenantFavorites"
    ADD CONSTRAINT "_TenantFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TenantProperties _TenantProperties_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TenantProperties"
    ADD CONSTRAINT "_TenantProperties_A_fkey" FOREIGN KEY ("A") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TenantProperties _TenantProperties_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_TenantProperties"
    ADD CONSTRAINT "_TenantProperties_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

