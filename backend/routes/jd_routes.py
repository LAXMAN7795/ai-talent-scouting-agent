from fastapi import APIRouter
from config.db import jd_collection
from services.jd_parser import parse_jd
from bson import ObjectId

router = APIRouter()

@router.post("/create-jd")
def create_jd(data: dict):
    jd_text = data.get("description")

    # AI parsing
    parsed_data = parse_jd(jd_text)

    jd_data = {
        "description": jd_text,
        "parsed": parsed_data
    }

    # 🔥 FIX: capture inserted result
    result = jd_collection.insert_one(jd_data)

    return {
        "message": "JD created successfully",
        "jd_id": str(result.inserted_id),   # ✅ IMPORTANT
        "parsed": parsed_data
    }


@router.get("/jd/all")
def get_all_jds():
    jds = []

    for jd in jd_collection.find():
        jds.append({
            "id": str(jd["_id"]),  # convert ObjectId → string
            "description": jd["description"],
            "parsed": jd["parsed"]
        })

    return jds

@router.get("/jd/{jd_id}")
def get_jd(jd_id: str):
    try:
        jd = jd_collection.find_one({"_id": ObjectId(jd_id)})
    except:
        return {"error": "Invalid ID"}

    if not jd:
        return {"error": "JD not found"}

    return {
        "id": str(jd["_id"]),
        "description": jd["description"],
        "parsed": jd["parsed"]
    }