from sqlalchemy import Column, Integer
from app.database.database import Base

class DashboardStats(Base):
    __tablename__ = "dashboard_stats"

    id = Column(Integer, primary_key=True, index=True)

    semantic_searches = Column(Integer, default=0)

    duplicates_prevented = Column(Integer, default=0)