-- Create a new database named 'Test' if it does not already exist
CREATE DATABASE IF NOT EXISTS Test;

-- Select the 'Test' database for use
USE Test;

-- Create a table named 'users' if it does not already exist
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each user, auto-incremented
    fullName VARCHAR(100) NOT NULL,      -- User's full name, must not be null, with a max length of 100 characters
    age INT NOT NULL CHECK (age >= 0),   -- User's age, must be a non-negative integer (0 or greater)
    skills JSON DEFAULT NULL,             -- User's skills stored as JSON, defaults to NULL if not provided
    isActive BOOLEAN DEFAULT TRUE,        -- Status indicating if the user is active, defaults to TRUE
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the user record was created
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp for when the user record was last updated
    deletedAt TIMESTAMP NULL               -- Optional timestamp for when the user record was deleted (soft delete)
);

-- Create a table named 'tasks' if it does not already exist
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique identifier for each task, auto-incremented
    title VARCHAR(255) NOT NULL,         -- Task title, must not be null, with a max length of 255 characters
    description TEXT,                    -- Task description, can hold long text (optional)
    deadline DATE NOT NULL,              -- Deadline for the task, must not be null
    status INT NOT NULL DEFAULT 1 CHECK (status IN (1, 2, 3, 4)),  -- Status of the task, must be one of the specified values (1, 2, 3, or 4), defaults to 1
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the task record was created
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp for when the task record was last updated
    deletedAt TIMESTAMP NULL              -- Optional timestamp for when the task record was deleted (soft delete)
);

-- Create a junction table named 'task_users' to establish a many-to-many relationship between tasks and users
CREATE TABLE IF NOT EXISTS task_users (
    taskId INT NOT NULL,                -- ID of the task, must not be null
    userId INT NOT NULL,                -- ID of the user, must not be null
    PRIMARY KEY (taskId, userId),       -- Composite primary key consisting of taskId and userId
    FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE,  -- Foreign key constraint linking to tasks table; deletes entries in task_users if the corresponding task is deleted
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE   -- Foreign key constraint linking to users table; deletes entries in task_users if the corresponding user is deleted
);
