-- Create Users
INSERT INTO users (id, name, username, gender, email, password_hash, current_location, created_at) VALUES
(uuid_generate_v4(), 'Alice Johnson', 'alicej', FALSE, 'alice@example.com', 'hash123', POINT(28.7041, 77.1025), NOW()),
(uuid_generate_v4(), 'Bob Smith', 'bobsmith', TRUE, 'bob@example.com', 'hash456', POINT(37.7749, -122.4194), NOW()),
(uuid_generate_v4(), 'Charlie Brown', 'charlieb', TRUE, 'charlie@example.com', 'hash789', POINT(51.5074, -0.1278), NOW()),
(uuid_generate_v4(), 'Divansh Prasad', 'divansh', TRUE, 'divanshthebest@gmail.com', 'xxxxxxx', POINT(28.7041, 77.1025), NOW()),
(uuid_generate_v4(), 'Kanishk Prasad', 'kanishk', TRUE, 'kanishk.0030@gmail.com', 'xxxxxxx', POINT(28.7041, 77.1025), NOW());

INSERT INTO communities (id, name, description, created_by, created_at, primary_location) VALUES
(uuid_generate_v4(), 'Tech Enthusiasts', 'A community for tech lovers', 'ab06164d-83e5-442f-8532-a7729f105842', NOW(), POINT(28.7041, 77.1025)),
(uuid_generate_v4(), 'Gaming Hub', 'Discuss latest games and updates', 'add6b0ff-4631-450e-8a94-09951be2cacb', NOW(), POINT(37.7749, -122.4194)),
(uuid_generate_v4(), 'Book Readers', 'Share and review books', 'c23debf8-8d8a-4441-9717-9a6df1a65c16', NOW(), POINT(51.5074, -0.1278)),
(uuid_generate_v4(), 'Fitness Freaks', 'A place to discuss workouts and nutrition', 'ab06164d-83e5-442f-8532-a7729f105842', NOW(), POINT(40.7128, -74.0060)),
(uuid_generate_v4(), 'AI & ML Researchers', 'Community for AI and ML discussions', 'add6b0ff-4631-450e-8a94-09951be2cacb', NOW(), POINT(34.0522, -118.2437));

INSERT INTO posts (id, user_id, community_id, title, content, created_at) VALUES
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', '0d9ee6a2-8699-4a68-8814-7d0b22560d9c', 'Latest in Tech', 'Check out the new AI advancements this year!', NOW()),
(uuid_generate_v4(), 'add6b0ff-4631-450e-8a94-09951be2cacb', 'ce8ce01f-95ba-4e02-b800-c0a8e613d97e', 'Quantum Computing', 'Exploring the future of computation.', NOW()),
(uuid_generate_v4(), 'c23debf8-8d8a-4441-9717-9a6df1a65c16', '8a574ff0-3792-4d5c-9465-20b0809bb38b', 'Best FPS Games', 'What are your favorite first-person shooters?', NOW()),
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', '8a574ff0-3792-4d5c-9465-20b0809bb38b', 'Gaming Tournaments', 'Join our latest gaming competitions!', NOW()),
(uuid_generate_v4(), 'add6b0ff-4631-450e-8a94-09951be2cacb', 'b6d89364-ab9c-4ec0-8420-a21af7a28017', 'Must-Read Books', 'Here are 5 books that changed my life.', NOW()),
(uuid_generate_v4(), 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'b6d89364-ab9c-4ec0-8420-a21af7a28017', 'Fantasy vs Sci-Fi', 'Which genre do you prefer?', NOW()),
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', '4166004e-4081-47ce-9035-62311bbef62e', 'Best Home Workouts', 'No gym? No problem! Try these routines.', NOW()),
(uuid_generate_v4(), 'add6b0ff-4631-450e-8a94-09951be2cacb', '4166004e-4081-47ce-9035-62311bbef62e', 'Keto vs Vegan', 'Which diet is better for muscle gain?', NOW()),
(uuid_generate_v4(), 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'ce8ce01f-95ba-4e02-b800-c0a8e613d97e', 'Neural Networks Explained', 'A beginner’s guide to deep learning.', NOW()),
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', 'ce8ce01f-95ba-4e02-b800-c0a8e613d97e', 'AI Ethics', 'The challenges of bias in machine learning.', NOW());

INSERT INTO replies (id, post_id, user_id, content, created_at) VALUES
-- Replies to "Latest in Tech"
(uuid_generate_v4(), '6c295b18-086c-4674-86ef-4a27cf30908e', 'add6b0ff-4631-450e-8a94-09951be2cacb', 'AI is evolving so fast! What do you think about GPT-5?', NOW()),
(uuid_generate_v4(), '6c295b18-086c-4674-86ef-4a27cf30908e', 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'I wonder how AI will impact coding jobs.', NOW()),

-- Replies to "Quantum Computing"
(uuid_generate_v4(), 'aea87eaa-4c66-4a17-826b-be4b01d18a4d', 'ab06164d-83e5-442f-8532-a7729f105842', 'Quantum supremacy is still a long way off.', NOW()),
(uuid_generate_v4(), 'aea87eaa-4c66-4a17-826b-be4b01d18a4d', 'add6b0ff-4631-450e-8a94-09951be2cacb', 'Do you think we will have commercial quantum computers soon?', NOW()),

-- Replies to "Best FPS Games"
(uuid_generate_v4(), '66e519a8-2996-462c-9ccb-c69f9fe0b26f', 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'CS:GO will always be my favorite!', NOW()),
(uuid_generate_v4(), '66e519a8-2996-462c-9ccb-c69f9fe0b26f', 'ab06164d-83e5-442f-8532-a7729f105842', 'Call of Duty has better mechanics IMO.', NOW()),

-- Replies to "Must-Read Books"
(uuid_generate_v4(), '163829be-7181-4b57-9bd1-28b237d01199', 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'Have you read "Atomic Habits"?', NOW()),
(uuid_generate_v4(), '163829be-7181-4b57-9bd1-28b237d01199', 'add6b0ff-4631-450e-8a94-09951be2cacb', 'I loved "Sapiens"! One of the best history books.', NOW()),

-- Replies to "Best Home Workouts"
(uuid_generate_v4(), '671ae627-085b-4eb5-882a-23c9400af8a7', 'ab06164d-83e5-442f-8532-a7729f105842', 'Bodyweight workouts are underrated!', NOW()),
(uuid_generate_v4(), '671ae627-085b-4eb5-882a-23c9400af8a7', 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'Which workout routine do you follow?', NOW()),

-- Replies to "AI Ethics"
(uuid_generate_v4(), 'f9e80896-b888-47ba-a94c-f98abe5ce102', 'add6b0ff-4631-450e-8a94-09951be2cacb', 'Bias in AI is a real challenge.', NOW()),
(uuid_generate_v4(), 'f9e80896-b888-47ba-a94c-f98abe5ce102', 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'We need better regulations for AI development.', NOW());

INSERT INTO votes (id, user_id, post_id, reply_id, vote_type, created_at) VALUES
-- Votes on Posts
(uuid_generate_v4(), 'add6b0ff-4631-450e-8a94-09951be2cacb', '6c295b18-086c-4674-86ef-4a27cf30908e', NULL, TRUE, NOW()),  
(uuid_generate_v4(), 'c23debf8-8d8a-4441-9717-9a6df1a65c16', 'aea87eaa-4c66-4a17-826b-be4b01d18a4d', NULL, TRUE, NOW()),  
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', '66e519a8-2996-462c-9ccb-c69f9fe0b26f', NULL, TRUE, NOW()),  
(uuid_generate_v4(), 'c23debf8-8d8a-4441-9717-9a6df1a65c16', '671ae627-085b-4eb5-882a-23c9400af8a7', NULL, TRUE, NOW()),  
(uuid_generate_v4(), 'add6b0ff-4631-450e-8a94-09951be2cacb', 'f9e80896-b888-47ba-a94c-f98abe5ce102', NULL, TRUE, NOW()),  

-- Votes on Replies
(uuid_generate_v4(), 'c23debf8-8d8a-4441-9717-9a6df1a65c16', NULL, 'ec961638-29c8-402d-a554-cb006c6ebc40', TRUE, NOW()),  
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', NULL, '1fbed115-3d18-4bb4-aacb-21fe3a55b100', TRUE, NOW()),  
(uuid_generate_v4(), 'add6b0ff-4631-450e-8a94-09951be2cacb', NULL, '435f96fd-f563-4183-86fa-73d298af597c', TRUE, NOW()),  
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', NULL, '70906d46-ce0d-47bd-b320-b276dc83b8b1', TRUE, NOW()),  
(uuid_generate_v4(), 'c23debf8-8d8a-4441-9717-9a6df1a65c16', NULL, '84f67353-3c78-4040-bb43-cc2ddbef4dca', TRUE, NOW()),  
(uuid_generate_v4(), 'add6b0ff-4631-450e-8a94-09951be2cacb', NULL, 'bbfe926c-f4e4-4d8a-b975-eeb5728a6597', TRUE, NOW()),  
(uuid_generate_v4(), 'ab06164d-83e5-442f-8532-a7729f105842', NULL, '967bb7be-25ce-437c-ae7e-539a556632a0', TRUE, NOW());
