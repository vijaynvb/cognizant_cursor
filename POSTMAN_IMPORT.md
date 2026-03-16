# Postman Collection - To-Do App API

## How to Import

1. Open **Postman**
2. Click **Import** (top-left)
3. Drag and drop `todo-app-postman-collection.json` or click **Upload Files** and select it
4. Click **Import**

## Quick Start

1. Run **Login** (Authentication folder) — uses `john.doe@company.com` / `password123` (after DB seed)
2. The access token is saved automatically to `{{authToken}}`
3. Run **Create Task** — saves `{{taskId}}` for subsequent requests
4. All other requests use Bearer auth from the collection

## Variables

| Variable        | Description                          | Set By      |
|----------------|--------------------------------------|-------------|
| `baseURL`      | API base URL (default: http://localhost:3000/v1) | Manual      |
| `authToken`    | JWT access token                     | Login       |
| `refreshToken` | JWT refresh token                    | Login       |
| `taskId`       | Task ID for task-specific requests   | Create Task |
| `commentId`    | Comment ID for delete                | Add Comment |
| `notificationId` | Notification ID for mark read      | Manual      |

## Negative Tests

The **Negative Tests** folder contains requests that expect error responses (400, 401, 404) for validation and error-handling checks.
