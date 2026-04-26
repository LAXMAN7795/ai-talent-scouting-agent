from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017"

client = MongoClient(MONGO_URI)
db = client["talent_ai"]

jd_collection = db["job_descriptions"]
candidate_collection = db["candidates"]