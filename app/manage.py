#!/usr/bin/python3

from sqlalchemy import inspect
from app.sqlalchemy_h import engine, SessionContext
from app.db_connector import *  # noqa
from rich import print
from rich.table import Table
from rich.console import Console
console = Console()


def show_all_data(name, columns, data):
    print(name.upper())
    table = Table(show_header=True)
    for c in columns:
        table.add_column(c)
    for d in data:
        table.add_row(*[f'{d[col]}' for col in columns])
    console.print(table)


def find_tables():
    tables = []
    g = globals()
    inspector = inspect(engine)
    names = inspector.get_table_names()  # type: ignore
    print('Name of All Tables Found:', names)
    for t in g:
        if t.lower() in names:
            # if input(t + ' [Y/n]: ') == 'n':
            #     continue
            tables.append(g[t])
    return tables


def db_show():
    with SessionContext() as session:
        for t in find_tables():
            show_all_data(str(t), t.__table__.c.keys(), [DBtoDict(s) for s in session.query(t).all()])


if __name__ == "__main__":
    db_show()
