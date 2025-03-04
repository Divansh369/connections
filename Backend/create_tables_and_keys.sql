CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "gender" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password_hash" TEXT NOT NULL,
    "current_location" POINT NOT NULL,
    "created_at" TIMESTAMP DEFAULT now()
);

CREATE TABLE "posts" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "user_id" UUID NOT NULL,
    "community_id" UUID,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP DEFAULT now(),
    "title" VARCHAR NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE
);

CREATE TABLE "communities" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP DEFAULT now(),
    "primary_location" POINT NOT NULL,
    FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE "replies" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "parent_reply_id" UUID,
    "created_at" TIMESTAMP DEFAULT now(),
    FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("parent_reply_id") REFERENCES "replies"("id") ON DELETE CASCADE
);

CREATE TABLE "votes" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "user_id" UUID NOT NULL,
    "post_id" UUID,
    "reply_id" UUID,
    "vote_type" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP DEFAULT now(),
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE,
    FOREIGN KEY ("reply_id") REFERENCES "replies"("id") ON DELETE CASCADE
);
