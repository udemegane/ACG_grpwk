import os
from typing import Optional

from sqlalchemy import create_engine
from sqlalchemy.engine.base import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy_utils import create_database, database_exists

SessionType = Session

__version__ = "0.1.0"

engine_url = os.environ.get('ACGGRPWK_DATABASE_URL', 'sqlite:///sample_db.sqlite3')
engine: Engine = create_engine(engine_url, echo=False)  # type: ignore
Session = sessionmaker(bind=engine)
Base = declarative_base()


def validate_database():
    if not database_exists(engine.url):
        print('Database does not exist')
        print('Initializing Database')
        create_database(engine.url)


class SessionContext:
    def __init__(self, session: Optional[SessionType] = None):
        if session is not None:
            self.session = session
            self.close_con = False
        else:
            self.session: SessionType = Session()
            self.close_con = True

    def __enter__(self) -> SessionType:
        return self.session

    def __exit__(self, exc_type, exc_value, traceback):
        if self.close_con:
            self.session.flush()
            self.session.commit()
            self.session.close()
