from fastapi import FastAPI
from routes import jd_routes
from routes import candidate_routes
from routes import scoring_routes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jd_routes.router)
app.include_router(candidate_routes.router)
app.include_router(scoring_routes.router)

@app.get("/")
def home():
    return {"message": "API Running"}