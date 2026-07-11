import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)

sql_statements = [
    # Articles table migration
    text("ALTER TABLE articles DROP COLUMN IF EXISTS category;"),
    text("ALTER TABLE articles ADD COLUMN IF NOT EXISTS publication_date TIMESTAMP;"),
    
    # Blogs table migration
    text("ALTER TABLE blogs DROP COLUMN IF EXISTS category;"),
    text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS publication_date TIMESTAMP;"),
    text("ALTER TABLE blogs DROP COLUMN IF EXISTS description;"),

    # Case summaries table migration
    text("ALTER TABLE case_summaries DROP COLUMN IF EXISTS category;"),
    text("ALTER TABLE case_summaries DROP COLUMN IF EXISTS facts;"),
    text("ALTER TABLE case_summaries DROP COLUMN IF EXISTS issues;"),
    text("ALTER TABLE case_summaries DROP COLUMN IF EXISTS judgment;"),
    text("ALTER TABLE case_summaries DROP COLUMN IF EXISTS legal_principle;"),
    text("ALTER TABLE case_summaries DROP COLUMN IF EXISTS description;"),
    text("ALTER TABLE case_summaries ADD COLUMN IF NOT EXISTS content TEXT;")
]

with engine.begin() as conn:
    for sql in sql_statements:
        print(f"Executing: {sql.text}")
        conn.execute(sql)
    
print("Migration completed successfully.")
