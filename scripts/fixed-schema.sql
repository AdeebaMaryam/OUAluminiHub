-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS alumni_achievements CASCADE;
DROP TABLE IF EXISTS post_comments CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS user_connections CASCADE;
DROP TABLE IF EXISTS direct_messages CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chat_group_members CASCADE;
DROP TABLE IF EXISTS chat_groups CASCADE;
DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS user_professional CASCADE;
DROP TABLE IF EXISTS user_colleges CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS colleges CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table (main user profiles) - Create first as it's referenced by many tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    user_type VARCHAR(50) DEFAULT 'alumni', -- alumni, student, faculty
    profile_image_url TEXT,
    bio TEXT,
    location VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    website_url VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Colleges table - Create second as it's referenced by many tables
CREATE TABLE colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    short_name VARCHAR(50),
    type VARCHAR(100) NOT NULL, -- campus, constituent, affiliated, autonomous
    location VARCHAR(255),
    address TEXT,
    naac_grade VARCHAR(10),
    principal_name VARCHAR(255),
    contact_number VARCHAR(20),
    email VARCHAR(255),
    website_url VARCHAR(255),
    establishment_year INTEGER,
    description TEXT,
    course_offerings TEXT[],
    departments TEXT[],
    total_students INTEGER DEFAULT 0,
    total_alumni INTEGER DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User college associations
CREATE TABLE user_colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
    department VARCHAR(255),
    degree VARCHAR(255),
    start_year INTEGER,
    end_year INTEGER,
    roll_number VARCHAR(100),
    current_year INTEGER, -- for current students
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, college_id)
);

-- Professional information (basic career info for networking)
CREATE TABLE user_professional (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    current_position VARCHAR(255),
    company VARCHAR(255),
    industry VARCHAR(255),
    experience_years INTEGER,
    skills TEXT[],
    achievements TEXT[],
    is_current BOOLEAN DEFAULT true,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    end_date DATE,
    end_time TIME,
    location VARCHAR(255),
    venue_details TEXT,
    event_type VARCHAR(100), -- reunion, seminar, workshop, cultural, sports, meetup
    category VARCHAR(100), -- college-specific, general, alumni-meet, social
    organizer_id UUID REFERENCES users(id),
    college_id UUID REFERENCES colleges(id),
    max_attendees INTEGER,
    registration_fee DECIMAL(10,2) DEFAULT 0,
    is_free BOOLEAN DEFAULT true,
    is_online BOOLEAN DEFAULT false,
    meeting_link TEXT,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'upcoming', -- upcoming, ongoing, completed, cancelled
    registration_deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Event registrations
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed
    attendance_status VARCHAR(50) DEFAULT 'registered', -- registered, attended, no-show
    UNIQUE(event_id, user_id)
);

-- Chat groups (main community feature)
CREATE TABLE chat_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    group_type VARCHAR(100), -- college, batch, department, general, hobby, location
    privacy_type VARCHAR(50) DEFAULT 'public', -- public, private, invite-only
    college_id UUID REFERENCES colleges(id),
    batch_year INTEGER,
    department VARCHAR(255),
    created_by UUID REFERENCES users(id),
    member_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    group_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Chat group members
CREATE TABLE chat_group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES chat_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- admin, moderator, member
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    is_active BOOLEAN DEFAULT true,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(group_id, user_id)
);

-- Messages (group chat messages)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES chat_groups(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT,
    message_type VARCHAR(50) DEFAULT 'text', -- text, image, file, link, poll
    file_url TEXT,
    file_name VARCHAR(255),
    reply_to UUID REFERENCES messages(id),
    is_edited BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Direct messages (private conversations)
CREATE TABLE direct_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT,
    message_type VARCHAR(50) DEFAULT 'text',
    file_url TEXT,
    file_name VARCHAR(255),
    is_read BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- User connections (alumni networking)
CREATE TABLE user_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
    addressee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, blocked
    connection_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    message TEXT,
    UNIQUE(requester_id, addressee_id)
);

-- Posts (community feed/announcements)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type VARCHAR(50) DEFAULT 'text', -- text, image, video, link, announcement, memory
    media_urls TEXT[],
    college_id UUID REFERENCES colleges(id),
    group_id UUID REFERENCES chat_groups(id),
    visibility VARCHAR(50) DEFAULT 'public', -- public, connections, college, group
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Post likes
CREATE TABLE post_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(post_id, user_id)
);

-- Post comments
CREATE TABLE post_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES post_comments(id),
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Donations (for college/university support)
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID REFERENCES users(id),
    college_id UUID REFERENCES colleges(id),
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    donation_type VARCHAR(100), -- scholarship, infrastructure, research, general, emergency-fund
    purpose TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    payment_method VARCHAR(100),
    transaction_id VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    receipt_url TEXT,
    tax_benefit_claimed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    notification_type VARCHAR(100), -- connection, message, event, post, mention, system
    related_id UUID, -- ID of related entity (post, event, message, etc.)
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Alumni achievements/memories
CREATE TABLE alumni_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    achievement_type VARCHAR(100), -- award, promotion, startup, publication, recognition
    achievement_date DATE,
    organization VARCHAR(255),
    media_urls TEXT[],
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_college ON user_colleges(college_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_college ON events(college_id);
CREATE INDEX idx_chat_groups_type ON chat_groups(group_type);
CREATE INDEX idx_chat_groups_college ON chat_groups(college_id);
CREATE INDEX idx_messages_group ON messages(group_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_direct_messages_participants ON direct_messages(sender_id, receiver_id);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created ON posts(created_at);
CREATE INDEX idx_posts_college ON posts(college_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);

-- Create a function to increment group member count
CREATE OR REPLACE FUNCTION increment_group_members(group_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE chat_groups 
    SET member_count = member_count + 1 
    WHERE id = group_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to decrement group member count
CREATE OR REPLACE FUNCTION decrement_group_members(group_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE chat_groups 
    SET member_count = GREATEST(member_count - 1, 0) 
    WHERE id = group_id;
END;
$$ LANGUAGE plpgsql;
