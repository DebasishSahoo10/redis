import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

const redis = new Redis("redis://localhost:6379");