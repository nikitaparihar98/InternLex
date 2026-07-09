import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")

engine = create_engine(DATABASE_URL)

sql_statements = [
    # Articles table migration
    text("ALTER TABLE articles DROP COLUMN IF EXISTS category;"),
    text("ALTER TABLE articles ADD COLUMN IF NOT EXISTS publication_date TIMESTAMP;"),
    
    # Blogs table migration
    text("ALTER TABLE blogs DROP COLUMN IF EXISTS category;"),
    text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS publication_date TIMESTAMP;")
]

with engine.begin() as conn:
    for sql in sql_statements:
        print(f"Executing: {sql.text}")
        conn.execute(sql)
    
print("Migration completed successfully.")
