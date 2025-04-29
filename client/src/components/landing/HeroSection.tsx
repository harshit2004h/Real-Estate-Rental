"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="SwiftStay Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/3 transform -translate-y-1/2 text-center w-full"
        >
          <div className="max-w-4xl mx-auto px-16 sm:px-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Start you journey to find the perfect place to call home
            </h1>
            <p className="text-xl text-white mb-8">
              Explore our wide range of rental properties tailored to fit your
              lifestyle and needs!
            </p>
            <div className="flex justify-center">
              <Input
                type="text"
                onChange={() => {}}
                placeholder="Search by city, neighbourhood or address"
                className="w-full max-w-lh rounded-none rounded-l-xl border-none bg-white h-12"
              />
              <Button
                onClick={() => {}}
                className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none h-12 hover:bg-secondary-600"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
