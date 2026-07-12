import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)

sql_statements = [
    text("ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_type VARCHAR DEFAULT 'landscape';"),
    text("ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS image_type VARCHAR DEFAULT 'landscape';")
]

print("Starting database migration for image_type columns...")

try:
    with engine.begin() as conn:
        for idx, statement in enumerate(sql_statements, 1):
            print(f"Executing step {idx}...")
            conn.execute(statement)
    print("Database migration completed successfully!")
except Exception as e:
    print(f"Migration failed: {e}")
    raise e
