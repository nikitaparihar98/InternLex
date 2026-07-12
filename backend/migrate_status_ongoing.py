"""
Migration: Rename OpportunityStatus enum value Published → Ongoing
Also updates all existing rows with status='Published' to 'Ongoing'.
"""
import os
import sys

sys.path.append(os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"), override=True)

from app.db.database import engine
from sqlalchemy import text

with engine.begin() as conn:
    # PostgreSQL allows renaming an enum value via ALTER TYPE ... RENAME VALUE
    print("Renaming enum value 'Published' -> 'Ongoing' in opportunity_status...")
    conn.execute(text("ALTER TYPE opportunity_status RENAME VALUE 'Published' TO 'Ongoing'"))
    print("Done.")

    # Update any rows that still have 'Draft' to 'Ongoing' (safety check)
    try:
        rows = conn.execute(text("UPDATE opportunities SET status = 'Ongoing' WHERE status = 'Draft' RETURNING id"))
        print(f"Updated {rows.rowcount} Draft rows to Ongoing.")
    except Exception as e:
        print(f"No Draft rows to update (or error): {e}")

    # Verify
    result = conn.execute(text("SELECT id, title, status FROM opportunities ORDER BY id"))
    for row in result:
        print(f"  ID {row.id}: {row.title[:40]} | status={row.status}")

print("Migration complete.")
