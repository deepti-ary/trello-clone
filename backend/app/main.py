from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],   # IMPORTANT
    allow_headers=["*"],   # IMPORTANT
)

# include routers AFTER middleware
from app.routers import boards, lists, cards
app.include_router(boards.router)
app.include_router(lists.router)
app.include_router(cards.router)
