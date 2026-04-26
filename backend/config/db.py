import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["talent_ai"]

jd_collection = db["job_descriptions"]
candidate_collection = db["candidates"]
