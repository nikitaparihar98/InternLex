import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

engine = create_engine(DATABASE_URL)

sql_statements = [
    # 1. Add Cloudinary public_id columns if they don't already exist
    text("ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_public_id VARCHAR;"),
    text("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS image_public_id VARCHAR;"),
    text("ALTER TABLE case_summaries ADD COLUMN IF NOT EXISTS image_public_id VARCHAR;"),
    text("ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS banner_image_public_id VARCHAR;"),
    text("ALTER TABLE applications ADD COLUMN IF NOT EXISTS resume_file_public_id VARCHAR;"),
    text("ALTER TABLE submissions ADD COLUMN IF NOT EXISTS answer_file_public_id VARCHAR;"),

    # 2. Drop existing foreign keys constraints on dependent tables to prepare for ON DELETE CASCADE
    text("""
    DO $$
    DECLARE
        r RECORD;
    BEGIN
        -- applications constraints
        FOR r IN (
            SELECT constraint_name 
            FROM information_schema.table_constraints 
            WHERE table_name = 'applications' AND constraint_type = 'FOREIGN KEY'
        ) LOOP
            EXECUTE 'ALTER TABLE applications DROP CONSTRAINT IF EXISTS ' || quote_ident(r.constraint_name);
        END LOOP;

        -- assignments constraints
        FOR r IN (
            SELECT constraint_name 
            FROM information_schema.table_constraints 
            WHERE table_name = 'assignments' AND constraint_type = 'FOREIGN KEY'
        ) LOOP
            EXECUTE 'ALTER TABLE assignments DROP CONSTRAINT IF EXISTS ' || quote_ident(r.constraint_name);
        END LOOP;

        -- submissions constraints
        FOR r IN (
            SELECT constraint_name 
            FROM information_schema.table_constraints 
            WHERE table_name = 'submissions' AND constraint_type = 'FOREIGN KEY'
        ) LOOP
            EXECUTE 'ALTER TABLE submissions DROP CONSTRAINT IF EXISTS ' || quote_ident(r.constraint_name);
        END LOOP;
    END $$;
    """),

    # 3. Add ON DELETE CASCADE foreign key constraints
    text("""
    ALTER TABLE applications 
        ADD CONSTRAINT fk_applications_opportunity_id FOREIGN KEY (opportunity_id) REFERENCES opportunities(id) ON DELETE CASCADE,
        ADD CONSTRAINT fk_applications_student_id FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE;
    """),
    text("""
    ALTER TABLE assignments 
        ADD CONSTRAINT fk_assignments_application_id FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;
    """),
    text("""
    ALTER TABLE submissions 
        ADD CONSTRAINT fk_submissions_assignment_id FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
        ADD CONSTRAINT fk_submissions_student_id FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE;
    """)
]

print("Starting database migration for storage lifecycle and cascade delete rules...")

try:
    with engine.begin() as conn:
        for idx, statement in enumerate(sql_statements, 1):
            print(f"Executing step {idx}...")
            conn.execute(statement)
    print("Database migration completed successfully!")
except Exception as e:
    print(f"Migration failed: {e}")
    raise e
