"""initial

Revision ID: 52d53d32a5b3
Revises: 
Create Date: 2021-12-11 20:27:00.747766

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '52d53d32a5b3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('accesslog',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tokentable',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('token', sa.String(length=65), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_name', sa.String(length=64), nullable=True),
    sa.Column('user_password', sa.String(length=64), nullable=True),
    sa.Column('created_at', sa.String(length=20), nullable=True),
    sa.Column('auth_token', sa.String(length=63), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('tokentable')
    op.drop_table('accesslog')
    # ### end Alembic commands ###
