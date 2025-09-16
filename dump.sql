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
-- Name: LeaseStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LeaseStatus" AS ENUM (
    'ACTIVE',
    'ENDED'
);


ALTER TYPE public."LeaseStatus" OWNER TO postgres;

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
-- Name: PaymentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentType" AS ENUM (
    'RENT',
    'SECURITY_DEPOSIT',
    'APPLICATION_FEE',
    'OTHER'
);


ALTER TYPE public."PaymentType" OWNER TO postgres;

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
    "durationMonths" integer DEFAULT 12 NOT NULL
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
    "durationMonths" integer DEFAULT 12 NOT NULL,
    "propertyId" integer NOT NULL,
    "tenantCognitoId" text NOT NULL,
    status public."LeaseStatus" NOT NULL,
    "razorpaySubscriptionId" text NOT NULL,
    "razorpayPlanId" text NOT NULL
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
    "dueDate" timestamp(3) without time zone NOT NULL,
    "paymentDate" timestamp(3) without time zone NOT NULL,
    "paymentStatus" public."PaymentStatus" NOT NULL,
    "transactionId" text,
    "leaseId" integer NOT NULL
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- Name: PaymentHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PaymentHistory" (
    id integer NOT NULL,
    "paymentDate" timestamp(3) without time zone NOT NULL,
    amount double precision NOT NULL,
    "transactionId" text NOT NULL,
    type public."PaymentType" NOT NULL,
    "tenantCognitoId" text NOT NULL,
    "propertyId" integer NOT NULL
);


ALTER TABLE public."PaymentHistory" OWNER TO postgres;

--
-- Name: PaymentHistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PaymentHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PaymentHistory_id_seq" OWNER TO postgres;

--
-- Name: PaymentHistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PaymentHistory_id_seq" OWNED BY public."PaymentHistory".id;


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
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    "reviewDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "propertyId" integer NOT NULL,
    "tenantCognitoId" text NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


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
-- Name: PaymentHistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PaymentHistory" ALTER COLUMN id SET DEFAULT nextval('public."PaymentHistory_id_seq"'::regclass);


--
-- Name: Property id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property" ALTER COLUMN id SET DEFAULT nextval('public."Property_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Tenant id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenant" ALTER COLUMN id SET DEFAULT nextval('public."Tenant_id_seq"'::regclass);


--
-- Data for Name: Application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Application" (id, "applicationDate", status, "propertyId", "tenantCognitoId", name, email, "phoneNumber", message, "durationMonths") FROM stdin;
4	2023-05-20 00:00:00	Approved	4	us-east-2:98765432-90ab-cdef-1234-567890abcdef	Alice Brown	alice.brown@example.com	+1 (555) 111-2222	I am interested in this property.	12
5	2023-05-25 00:00:00	Pending	5	us-east-2:87654321-90ab-cdef-1234-567890abcdef	Bob Green	bob.green@example.com	+1 (555) 333-4444	Looking forward to viewing this apartment.	12
6	2023-06-01 00:00:00	Denied	6	817b3540-a061-707b-742a-a28391181149	Carol White	carol.white@example.com	+1 (555) 555-6666	Excited about the possibility of renting this house.	12
7	2023-06-10 00:00:00	Approved	7	us-east-2:65432109-90ab-cdef-1234-567890abcdef	David Lee	david.lee@example.com	+1 (555) 777-8888	This property looks perfect for my needs.	12
8	2023-06-15 00:00:00	Pending	8	us-east-2:54321098-90ab-cdef-1234-567890abcdef	Emma Taylor	emma.taylor@example.com	+1 (555) 999-0000	I'm very interested in this apartment.	12
9	2023-06-20 00:00:00	Approved	9	us-east-2:43210987-90ab-cdef-1234-567890abcdef	Frank Wilson	frank.wilson@example.com	+1 (555) 222-3333	This property seems to fit all my requirements.	12
10	2023-06-25 00:00:00	Pending	6	us-east-2:32109876-90ab-cdef-1234-567890abcdef	Grace Miller	grace.miller@example.com	+1 (555) 444-5555	I'm interested in this loft and would like to schedule a viewing.	12
11	2023-07-01 00:00:00	Approved	8	us-east-2:21098765-90ab-cdef-1234-567890abcdef	Henry Wilson	henry.wilson@example.com	+1 (555) 444-5555	I'm very interested in this luxury penthouse.	12
12	2023-07-05 00:00:00	Pending	10	us-east-2:10987654-90ab-cdef-1234-567890abcdef	Isabella Garcia	isabella.garcia@example.com	+1 (555) 666-7777	The historic brownstone looks perfect for my family.	12
13	2023-07-10 00:00:00	Denied	5	us-east-2:09876543-90ab-cdef-1234-567890abcdef	Jack Thompson	jack.thompson@example.com	+1 (555) 888-9999	I'd love to rent this beach house for the summer.	12
14	2023-07-15 00:00:00	Pending	11	us-east-2:a9876543-90ab-cdef-1234-567890abcdef	Karen Martinez	karen.martinez@example.com	+1 (555) 123-4567	I'm interested in this micro-apartment for its central location.	12
15	2023-07-20 00:00:00	Approved	12	us-east-2:b9876543-90ab-cdef-1234-567890abcdef	Liam Johnson	liam.johnson@example.com	+1 (555) 987-6543	The mountain view cabin looks perfect for a weekend getaway.	12
16	2023-07-25 00:00:00	Pending	13	us-east-2:c9876543-90ab-cdef-1234-567890abcdef	Mia Rodriguez	mia.rodriguez@example.com	+1 (555) 246-8135	I'm curious about the eco-friendly features of this tiny house.	12
17	2023-07-30 00:00:00	Approved	4	us-east-2:d9876543-90ab-cdef-1234-567890abcdef	Noah Kim	noah.kim@example.com	+1 (555) 369-2580	The downtown apartment seems ideal for my work location.	12
18	2023-08-05 00:00:00	Pending	7	us-east-2:e9876543-90ab-cdef-1234-567890abcdef	Olivia Chen	olivia.chen@example.com	+1 (555) 159-7531	I'm looking for a spacious family home like this one.	12
19	2025-09-16 12:40:01.677	Approved	15	c4785428-1091-7056-4760-948d99d9129c	kachraseth	kachraseth820@gmail.com	1234567890	I am very interested in this property and would like to apply.	12
20	2025-09-16 12:40:59.152	Denied	16	c4785428-1091-7056-4760-948d99d9129c	kachraseth	kachraseth820@gmail.com	1234567890	I am very interested in this property and would like to apply.	12
\.


--
-- Data for Name: Lease; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lease" (id, "startDate", "endDate", "durationMonths", "propertyId", "tenantCognitoId", status, "razorpaySubscriptionId", "razorpayPlanId") FROM stdin;
3	2023-07-01 00:00:00	2024-06-30 00:00:00	12	4	us-east-2:98765432-90ab-cdef-1234-567890abcdef	ENDED	sub_IqgG2S1VqgG2S1	plan_IqgG2S1VqgG2S1
4	2023-08-01 00:00:00	2024-07-31 00:00:00	12	5	us-east-2:87654321-90ab-cdef-1234-567890abcdef	ENDED	sub_JgH3T2WjH3T2Wj	plan_JgH3T2WjH3T2Wj
5	2023-09-01 00:00:00	2024-08-31 00:00:00	12	6	817b3540-a061-707b-742a-a28391181149	ENDED	sub_KkI4U3XkI4U3Xk	plan_KkI4U3XkI4U3Xk
6	2023-07-15 00:00:00	2024-07-14 00:00:00	12	7	us-east-2:65432109-90ab-cdef-1234-567890abcdef	ENDED	sub_LlJ5V4YlJ5V4Yl	plan_LlJ5V4YlJ5V4Yl
7	2023-08-15 00:00:00	2024-08-14 00:00:00	12	8	us-east-2:54321098-90ab-cdef-1234-567890abcdef	ENDED	sub_MmK6W5ZmMK6W5Zm	plan_MmK6W5ZmMK6W5Zm
8	2023-09-15 00:00:00	2024-09-14 00:00:00	12	9	us-east-2:43210987-90ab-cdef-1234-567890abcdef	ENDED	sub_NnL7X6AnL7X6An	plan_NnL7X6AnL7X6An
9	2023-10-01 00:00:00	2024-09-30 00:00:00	12	6	us-east-2:32109876-90ab-cdef-1234-567890abcdef	ENDED	sub_OoM8Y7BoM8Y7Bo	plan_OoM8Y7BoM8Y7Bo
10	2023-08-01 00:00:00	2024-07-31 00:00:00	12	8	us-east-2:21098765-90ab-cdef-1234-567890abcdef	ENDED	sub_PpN9Z8CpN9Z8Cp	plan_PpN9Z8CpN9Z8Cp
11	2023-11-01 00:00:00	2024-10-31 00:00:00	12	10	us-east-2:10987654-90ab-cdef-1234-567890abcdef	ENDED	sub_QqO0A9DqO0A9Dq	plan_QqO0A9DqO0A9Dq
12	2023-08-15 00:00:00	2024-02-14 00:00:00	6	5	us-east-2:09876543-90ab-cdef-1234-567890abcdef	ENDED	sub_RrP1B0ErP1B0Er	plan_RrP1B0ErP1B0Er
13	2023-09-01 00:00:00	2024-08-31 00:00:00	12	11	us-east-2:a9876543-90ab-cdef-1234-567890abcdef	ENDED	sub_SsQ2C1FsQ2C1Fs	plan_SsQ2C1FsQ2C1Fs
14	2023-10-01 00:00:00	2023-12-31 00:00:00	3	12	us-east-2:b9876543-90ab-cdef-1234-567890abcdef	ENDED	sub_TtR3D2GtR3D2Gt	plan_TtR3D2GtR3D2Gt
15	2023-09-15 00:00:00	2024-03-14 00:00:00	6	13	us-east-2:c9876543-90ab-cdef-1234-567890abcdef	ENDED	sub_UuS4E3HuS4E3Hu	plan_UuS4E3HuS4E3Hu
16	2023-09-01 00:00:00	2024-08-31 00:00:00	12	4	us-east-2:d9876543-90ab-cdef-1234-567890abcdef	ENDED	sub_VvT5F4IvT5F4Iv	plan_VvT5F4IvT5F4Iv
17	2023-10-01 00:00:00	2024-09-30 00:00:00	12	7	us-east-2:e9876543-90ab-cdef-1234-567890abcdef	ENDED	sub_WwU6G5JwU6G5Jw	plan_WwU6G5JwU6G5Jw
18	2025-09-16 12:42:09.088	2026-09-16 12:42:09.088	12	15	c4785428-1091-7056-4760-948d99d9129c	ACTIVE	sub_RIHE7Zzdd1kQ4H	plan_RIHE6uKf8c0DAp
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, address, city, state, country, "postalCode", coordinates) FROM stdin;
4	123 Colorado Blvd	Pasadena	CA	United States	91105	0101000020E6100000EB6F09C03F895DC070EB6E9EEA124140
5	456 Ocean Ave	Santa Monica	CA	United States	90401	0101000020E61000007C4276DEC69F5DC0D4BA0D6ABF014140
6	789 Hollywood Way	Burbank	CA	United States	91505	0101000020E61000001F9E25C808955DC0B16B7BBB25174140
7	101 Pine Ave	Long Beach	CA	United States	90802	0101000020E61000000B45BA9F538C5DC0359886E123E24040
8	555 Manhattan Ave	New York	NY	United States	10001	0101000020E6100000282D5C56618052C0588E90813C5B4440
9	888 Malibu Road	Malibu	CA	United States	90265	0101000020E6100000740AF2B391B15DC09B1F7F6951034140
10	777 Brand Blvd	Glendale	CA	United States	91203	0101000020E6100000E481C8224D905DC08DB5BFB33D124140
11	555 Torrance Blvd	Torrance	CA	United States	90503	0101000020E6100000C898BB9690965DC079B29B19FDEA4040
12	1234 Ocean Dr	Miami	FL	United States	33139	0101000020E6100000888043A8520854C0BD73284355C83940
13	789 Rodeo Dr	Beverly Hills	CA	United States	90210	0101000020E610000079B0C56E9F995DC06F2A52616C094140
14	100 Nanjing West Road	Shanghai	Shanghai	China	200041	0101000020E6100000C2058F25E25C5E4069CB14CEC93A3F40
15	123 Maplewood Lane	Austin	Texas	United States	78704	0101000020E61000004DA3C9C5986F58C0A10216AF68453E40
16	123 MG Road	Bangalore	Karnataka	India	560001	0101000020E61000008F82F11DC66653408E41823D81F32940
\.


--
-- Data for Name: Manager; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Manager" (id, "cognitoId", name, email, "phoneNumber") FROM stdin;
2	010be580-60a1-70ae-780e-18a6fd94ad32	John Smith	john.smith@example.com	+1 (555) 123-4567
3	us-east-2:23456789-90ab-cdef-1234-567890abcdef	Sarah Johnson	sarah.johnson@example.com	+1 (555) 987-6543
4	us-east-2:34567890-90ab-cdef-1234-567890abcdef	Michael Brown	michael.brown@example.com	+1 (555) 456-7890
5	us-east-2:45678901-90ab-cdef-1234-567890abcdef	Emily Davis	emily.davis@example.com	+1 (555) 234-5678
6	us-east-2:56789012-90ab-cdef-1234-567890abcdef	Robert Wilson	robert.wilson@example.com	+1 (555) 876-5432
7	us-east-2:67890123-90ab-cdef-1234-567890abcdef	Lisa Thompson	lisa.thompson@example.com	+1 (555) 345-6789
8	us-east-2:78901234-90ab-cdef-1234-567890abcdef	Daniel Martinez	daniel.martinez@example.com	+1 (555) 789-0123
9	us-east-2:89012345-90ab-cdef-1234-567890abcdef	Olivia Garcia	olivia.garcia@example.com	+1 (555) 678-9012
10	us-east-2:90123456-90ab-cdef-1234-567890abcdef	Ethan Rodriguez	ethan.rodriguez@example.com	+1 (555) 567-8901
11	us-east-2:01234567-90ab-cdef-1234-567890abcdef	Sophia Kim	sophia.kim@example.com	+1 (555) 456-7890
12	f40834a8-9061-70f4-572c-7cabf2c1a955	johndoe	testdesk.work@gmail.com	
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, "amountDue", "dueDate", "paymentDate", "paymentStatus", "transactionId", "leaseId") FROM stdin;
3	1500	2023-07-01 00:00:00	2023-06-28 00:00:00	Paid	txn_1A2b3C4d5E6f7G8h	3
4	1800	2023-08-01 00:00:00	2023-07-28 00:00:00	Pending	\N	4
5	2200	2023-09-01 00:00:00	2023-08-30 00:00:00	Paid	txn_2B3c4D5e6F7g8H9i	5
6	1700	2023-07-15 00:00:00	2023-07-14 00:00:00	Paid	txn_3C4d5E6f7G8h9I0j	6
7	2000	2023-08-15 00:00:00	2023-08-14 00:00:00	Pending	\N	7
8	2400	2023-09-15 00:00:00	2023-09-14 00:00:00	Paid	txn_4D5e6F7g8H9i1J2k	8
9	2200	2023-10-01 00:00:00	2023-09-25 00:00:00	PartiallyPaid	txn_5E6f7G8h9I0j2K3l	9
10	5000	2023-08-01 00:00:00	2023-07-30 00:00:00	Paid	txn_6F7g8H9i1J2k3L4m	10
11	3000	2023-11-01 00:00:00	2023-10-25 00:00:00	PartiallyPaid	txn_7G8h9I0j2K3l4M5n	11
12	2000	2023-08-15 00:00:00	2023-08-10 00:00:00	Paid	txn_8H9i1J2k3L4m5N6o	12
13	1000	2023-09-01 00:00:00	2023-08-30 00:00:00	Pending	\N	13
14	1800	2023-10-01 00:00:00	2023-09-28 00:00:00	Paid	txn_9I0j2K3l4M5n6O7p	14
15	900	2023-09-15 00:00:00	2023-09-10 00:00:00	PartiallyPaid	txn_1J2k3L4m5N6o7P8q	15
16	1500	2023-09-01 00:00:00	2023-08-30 00:00:00	Paid	txn_2K3l4M5n6O7p8Q9r	16
17	2500	2023-10-01 00:00:00	2023-09-28 00:00:00	Paid	txn_3L4m5N6o7P8q9R0s	17
18	1500	2025-09-30 18:30:00	2025-09-16 12:42:39.708	Paid	pay_RIHEQJdozdgx2i	18
\.


--
-- Data for Name: PaymentHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PaymentHistory" (id, "paymentDate", amount, "transactionId", type, "tenantCognitoId", "propertyId") FROM stdin;
8	2023-06-28 00:00:00	1500	txn_1A2b3C4d5E6f7G8h	RENT	us-east-2:98765432-90ab-cdef-1234-567890abcdef	4
9	2023-08-30 00:00:00	2200	txn_2B3c4D5e6F7g8H9i	RENT	817b3540-a061-707b-742a-a28391181149	6
10	2023-07-14 00:00:00	1700	txn_3C4d5E6f7G8h9I0j	RENT	us-east-2:65432109-90ab-cdef-1234-567890abcdef	7
11	2023-09-14 00:00:00	2400	txn_4D5e6F7g8H9i1J2k	RENT	us-east-2:43210987-90ab-cdef-1234-567890abcdef	9
12	2023-09-25 00:00:00	1100	txn_5E6f7G8h9I0j2K3l	RENT	us-east-2:32109876-90ab-cdef-1234-567890abcdef	6
13	2023-07-30 00:00:00	5000	txn_6F7g8H9i1J2k3L4m	SECURITY_DEPOSIT	us-east-2:21098765-90ab-cdef-1234-567890abcdef	8
14	2023-10-25 00:00:00	1500	txn_7G8h9I0j2K3l4M5n	RENT	us-east-2:10987654-90ab-cdef-1234-567890abcdef	10
15	2023-08-10 00:00:00	2000	txn_8H9i1J2k3L4m5N6o	RENT	us-east-2:09876543-90ab-cdef-1234-567890abcdef	5
16	2023-09-28 00:00:00	1800	txn_9I0j2K3l4M5n6O7p	RENT	us-east-2:b9876543-90ab-cdef-1234-567890abcdef	12
17	2023-09-10 00:00:00	450	txn_1J2k3L4m5N6o7P8q	RENT	us-east-2:c9876543-90ab-cdef-1234-567890abcdef	13
18	2023-08-30 00:00:00	1500	txn_2K3l4M5n6O7p8Q9r	RENT	us-east-2:d9876543-90ab-cdef-1234-567890abcdef	4
19	2023-09-28 00:00:00	2500	txn_3L4m5N6o7P8q9R0s	SECURITY_DEPOSIT	us-east-2:e9876543-90ab-cdef-1234-567890abcdef	7
20	2025-09-16 12:40:01.701	500	pay_RIHBehU2Tgtdbb	APPLICATION_FEE	c4785428-1091-7056-4760-948d99d9129c	15
21	2025-09-16 12:40:59.16	100	pay_RIHCe6td1nzkqT	APPLICATION_FEE	c4785428-1091-7056-4760-948d99d9129c	16
22	2025-09-16 12:42:09.091	2500	pay_RIHDrVIsNyaxlC	SECURITY_DEPOSIT	c4785428-1091-7056-4760-948d99d9129c	15
23	2025-09-16 12:42:39.71	1500	pay_RIHEQJdozdgx2i	RENT	c4785428-1091-7056-4760-948d99d9129c	15
\.


--
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Property" (id, name, description, "pricePerMonth", "securityDeposit", "applicationFee", "photoUrls", amenities, highlights, "isPetsAllowed", "isParkingIncluded", beds, baths, "squareFeet", "propertyType", "postedDate", "averageRating", "numberOfReviews", "locationId", "managerCognitoId") FROM stdin;
14	Big Villa China	This is a big Villa in China.	25000	10000	1000	{https://res.cloudinary.com/harshitscloud/image/upload/v1758026119/properties/nutbr30p5q4ujwlpk3zt.jpg}	{Refrigerator}	{Intercom}	t	t	6	10	5000	Tinyhouse	2025-09-16 12:35:23.642	0	0	14	f40834a8-9061-70f4-572c-7cabf2c1a955
15	Maplewood Retreat	This is Maplewood Retreat.	1500	1000	500	{https://res.cloudinary.com/harshitscloud/image/upload/v1758026281/properties/z3rtbp8couawdozrs7uh.jpg}	{Gym}	{SatelliteTV}	t	t	4	2	1500	Apartment	2025-09-16 12:38:05.862	4	1	15	f40834a8-9061-70f4-572c-7cabf2c1a955
16	Sunset Residency	This is Sunset Residency.	1000	500	100	{https://res.cloudinary.com/harshitscloud/image/upload/v1758026327/properties/xege47y3zatqusylypmp.jpg}	{WasherDryer}	{RecentlyRenovated}	t	t	1	1	1000	Tinyhouse	2025-09-16 12:38:51.575	1	1	16	f40834a8-9061-70f4-572c-7cabf2c1a955
4	Sunny Downtown Apartment	A beautiful apartment in the heart of downtown with plenty of natural light.	1500	1500	50	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,WasherDryer,Parking}	{HighSpeedInternetAccess,CloseToTransit}	t	f	2	1	800	Apartment	2023-05-15 00:00:00	4.5	10	4	010be580-60a1-70ae-780e-18a6fd94ad32
5	Cozy Beach House	A charming beach house with stunning ocean views.	2000	2000	75	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,WasherDryer,Parking,Pool}	{GreatView,CloseToTransit}	t	t	3	2	1200	Villa	2023-06-01 00:00:00	4.8	5	5	us-east-2:23456789-90ab-cdef-1234-567890abcdef
6	Modern City Loft	Sleek and stylish loft in the heart of the city.	2200	2200	60	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,WasherDryer,Gym}	{HighSpeedInternetAccess,CloseToTransit}	t	f	1	1	900	Apartment	2023-07-01 00:00:00	4.7	8	6	us-east-2:34567890-90ab-cdef-1234-567890abcdef
7	Spacious Family Home	Large family home with a beautiful backyard and modern amenities.	2500	2500	80	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,WasherDryer,Parking,Dishwasher}	{QuietNeighborhood}	t	f	4	3	2000	Villa	2023-06-15 00:00:00	4.9	12	7	us-east-2:45678901-90ab-cdef-1234-567890abcdef
8	Luxury Penthouse	Stunning penthouse with panoramic city views and high-end finishes.	5000	5000	100	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,WasherDryer,Gym,Pool}	{GreatView}	t	f	3	3	2500	Apartment	2023-07-01 00:00:00	5	15	8	us-east-2:56789012-90ab-cdef-1234-567890abcdef
9	Cozy Studio Apartment	Efficient studio apartment perfect for students or young professionals.	1200	1200	40	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,HighSpeedInternet}	{CloseToTransit}	t	f	0	1	400	Apartment	2023-08-01 00:00:00	4.2	6	9	us-east-2:67890123-90ab-cdef-1234-567890abcdef
10	Historic Brownstone	Charming brownstone with original features and modern updates.	3000	3000	70	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,WasherDryer,HighSpeedInternet}	{RecentlyRenovated}	t	f	3	2	1800	Townhouse	2023-09-01 00:00:00	4.6	9	10	us-east-2:78901234-90ab-cdef-1234-567890abcdef
11	Urban Micro-Apartment	Compact and efficient living space in the heart of the city.	1000	1000	30	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{AirConditioning,HighSpeedInternet}	{CloseToTransit}	t	f	0	1	300	Apartment	2023-08-01 00:00:00	4.3	7	11	us-east-2:89012345-90ab-cdef-1234-567890abcdef
12	Mountain View Cabin	Rustic cabin with breathtaking mountain views and modern amenities.	1800	1800	60	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{WasherDryer,AirConditioning}	{GreatView,QuietNeighborhood}	t	f	2	1	1000	Cottage	2023-08-15 00:00:00	4.9	11	12	us-east-2:90123456-90ab-cdef-1234-567890abcdef
13	Eco-Friendly Tiny House	Sustainable living in a compact, well-designed tiny house.	900	900	35	{https://res.cloudinary.com/harshitscloud/image/upload/v1758027031/singlelisting-2_haggtw.jpg,https://res.cloudinary.com/harshitscloud/image/upload/v1758027039/singlelisting-3_rbd23r.jpg}	{WasherDryer,AirConditioning,HighSpeedInternet}	{SmokeFree}	t	f	1	1	250	Tinyhouse	2023-08-10 00:00:00	4.7	8	13	us-east-2:01234567-90ab-cdef-1234-567890abcdef
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, rating, comment, "reviewDate", "propertyId", "tenantCognitoId") FROM stdin;
4	5	Absolutely loved living here! The location is perfect and the apartment gets so much sun. The manager, John, was always helpful.	2024-06-15 10:00:00	4	us-east-2:98765432-90ab-cdef-1234-567890abcdef
5	4	Great family home with a huge backyard. We had a wonderful year here. A few minor maintenance issues but they were resolved quickly.	2024-07-10 14:30:00	7	us-east-2:65432109-90ab-cdef-1234-567890abcdef
6	5	The view from this penthouse is unbeatable. Worth every penny. Sad to leave!	2024-08-01 11:00:00	8	us-east-2:21098765-90ab-cdef-1234-567890abcdef
7	3	The loft is stylish but can be a bit noisy due to the downtown location. The gym is a great plus.	2024-09-02 18:00:00	6	817b3540-a061-707b-742a-a28391181149
8	5	Perfect cabin for a quiet retreat. The mountain views are breathtaking. Highly recommend.	2024-01-05 09:00:00	12	us-east-2:b9876543-90ab-cdef-1234-567890abcdef
9	4	Living in a tiny house was a unique and positive experience. Very well designed for the small space.	2024-03-20 12:00:00	13	us-east-2:c9876543-90ab-cdef-1234-567890abcdef
10	4	The historic charm of this brownstone is amazing. The neighborhood is quiet and friendly.	2024-11-05 16:45:00	10	us-east-2:10987654-90ab-cdef-1234-567890abcdef
11	5	A fantastic apartment in a great part of town. No complaints at all. Would definitely rent again.	2024-09-01 13:20:00	4	us-east-2:d9876543-90ab-cdef-1234-567890abcdef
12	4	good	2025-09-16 12:39:18.341	15	c4785428-1091-7056-4760-948d99d9129c
13	1	very small	2025-09-16 12:40:29.345	16	c4785428-1091-7056-4760-948d99d9129c
\.


--
-- Data for Name: Tenant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tenant" (id, "cognitoId", name, email, "phoneNumber") FROM stdin;
2	817b3540-a061-707b-742a-a28391181149	Carol White	carol.white@example.com	+1 (555) 555-6666
3	us-east-2:87654321-90ab-cdef-1234-567890abcdef	Bob Green	bob.green@example.com	+1 (555) 333-4444
4	us-east-2:98765432-90ab-cdef-1234-567890abcdef	Alice Brown	alice.brown@example.com	+1 (555) 111-2222
5	us-east-2:65432109-90ab-cdef-1234-567890abcdef	David Lee	david.lee@example.com	+1 (555) 777-8888
6	us-east-2:54321098-90ab-cdef-1234-567890abcdef	Emma Taylor	emma.taylor@example.com	+1 (555) 999-0000
7	us-east-2:43210987-90ab-cdef-1234-567890abcdef	Frank Wilson	frank.wilson@example.com	+1 (555) 222-3333
8	us-east-2:32109876-90ab-cdef-1234-567890abcdef	Grace Miller	grace.miller@example.com	+1 (555) 444-5555
9	us-east-2:21098765-90ab-cdef-1234-567890abcdef	Henry Wilson	henry.wilson@example.com	+1 (555) 444-5555
10	us-east-2:10987654-90ab-cdef-1234-567890abcdef	Isabella Garcia	isabella.garcia@example.com	+1 (555) 666-7777
11	us-east-2:09876543-90ab-cdef-1234-567890abcdef	Jack Thompson	jack.thompson@example.com	+1 (555) 888-9999
12	us-east-2:a9876543-90ab-cdef-1234-567890abcdef	Karen Martinez	karen.martinez@example.com	+1 (555) 123-4567
13	us-east-2:b9876543-90ab-cdef-1234-567890abcdef	Liam Johnson	liam.johnson@example.com	+1 (555) 987-6543
14	us-east-2:c9876543-90ab-cdef-1234-567890abcdef	Mia Rodriguez	mia.rodriguez@example.com	+1 (555) 246-8135
15	us-east-2:d9876543-90ab-cdef-1234-567890abcdef	Noah Kim	noah.kim@example.com	+1 (555) 369-2580
16	us-east-2:e9876543-90ab-cdef-1234-567890abcdef	Olivia Chen	olivia.chen@example.com	+1 (555) 159-7531
17	c4785428-1091-7056-4760-948d99d9129c	kachraseth	kachraseth820@gmail.com	
\.


--
-- Data for Name: _TenantFavorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_TenantFavorites" ("A", "B") FROM stdin;
5	3
7	5
8	5
4	6
8	6
9	6
6	8
10	8
10	10
12	10
5	11
13	11
4	12
7	12
10	12
6	13
9	13
12	13
4	15
13	15
7	16
10	16
12	16
4	17
\.


--
-- Data for Name: _TenantProperties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_TenantProperties" ("A", "B") FROM stdin;
8	2
9	2
7	5
5	6
12	6
13	7
9	8
6	9
10	10
11	10
13	11
5	12
7	14
8	16
15	17
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c0da8642-be3a-4df3-a82a-eed766cd1a75	a708a6694bbc67a26aa041359a379412b5ca438502cbc98a35f39e20010f08eb	2025-09-16 17:53:53.341002+05:30	20250915050022_init	\N	\N	2025-09-16 17:53:52.908398+05:30	1
5ee58f38-d1d6-4db4-80b0-5fdc854c3ad8	cc3ed4479f67efef1830c75ba7871cdda09b510e88e31824fc2f66d565843fa0	2025-09-16 17:53:53.342746+05:30	20250915051439_init	\N	\N	2025-09-16 17:53:53.341289+05:30	1
b4837935-919a-4e55-944f-8636487da9c1	9a5768b3f0ac7883b67241e9d56ed7c485b1c166b0413aeccafaacc04ad98827	2025-09-16 17:53:53.34417+05:30	20250915052433_init	\N	\N	2025-09-16 17:53:53.343+05:30	1
8cf1aaff-f988-4131-99a1-c82425232123	da15fa556a5ea5f678a1a68864b36667fd51ddf0aed880a25d71057b152c3880	2025-09-16 17:53:53.34641+05:30	20250915070328_init	\N	\N	2025-09-16 17:53:53.344429+05:30	1
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: Application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Application_id_seq"', 20, true);


--
-- Name: Lease_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Lease_id_seq"', 18, true);


--
-- Name: Location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Location_id_seq"', 16, true);


--
-- Name: Manager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Manager_id_seq"', 12, true);


--
-- Name: PaymentHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PaymentHistory_id_seq"', 23, true);


--
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 18, true);


--
-- Name: Property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Property_id_seq"', 16, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 13, true);


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
-- Name: PaymentHistory PaymentHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PaymentHistory"
    ADD CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY (id);


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
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


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
-- Name: PaymentHistory PaymentHistory_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PaymentHistory"
    ADD CONSTRAINT "PaymentHistory_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PaymentHistory PaymentHistory_tenantCognitoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PaymentHistory"
    ADD CONSTRAINT "PaymentHistory_tenantCognitoId_fkey" FOREIGN KEY ("tenantCognitoId") REFERENCES public."Tenant"("cognitoId") ON UPDATE CASCADE ON DELETE RESTRICT;


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
-- Name: Review Review_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_tenantCognitoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_tenantCognitoId_fkey" FOREIGN KEY ("tenantCognitoId") REFERENCES public."Tenant"("cognitoId") ON UPDATE CASCADE ON DELETE RESTRICT;


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

