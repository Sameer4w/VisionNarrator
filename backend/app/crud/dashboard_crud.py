from app.models.dashboard import DashboardStats


def get_dashboard(db):

    stats = db.query(DashboardStats).first()

    if stats is None:

        stats = DashboardStats()

        db.add(stats)

        db.commit()

        db.refresh(stats)

    return stats


def increase_duplicate_count(db):

    stats = get_dashboard(db)

    stats.duplicates_prevented += 1

    db.commit()


def increase_search_count(db):

    stats = get_dashboard(db)

    stats.semantic_searches += 1

    db.commit()