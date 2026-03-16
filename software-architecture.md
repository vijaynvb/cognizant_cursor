# To-Do App — Software Architecture

This document provides architecture diagrams and explanations for the To-Do App, a full-stack Express (Node.js + TypeScript) + React task-management application. Diagrams are based on the OpenAPI specification and business requirements.

---

## 1. Sequence Diagrams

Sequence diagrams illustrate the flow of requests across actors, frontend, backend layers (controllers, services, repositories), and the database for each major API operation.

### 1.1 Authentication — Login

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant AuthController
    participant AuthService
    participant UserRepository
    participant DB as PostgreSQL

    User->>React: Enter email/password
    React->>AuthController: POST /auth/login (LoginRequest)
    AuthController->>AuthService: login(email, password)
    AuthService->>UserRepository: findByEmail(email)
    UserRepository->>DB: SELECT * FROM users WHERE email = ?
    DB-->>UserRepository: User row
    UserRepository-->>AuthService: User entity
    AuthService->>AuthService: validatePassword()
    AuthService->>AuthService: generateTokens()
    AuthService-->>AuthController: AuthResponse (tokens, user)
    AuthController-->>React: 200 AuthResponse
    React-->>User: Store tokens, redirect to dashboard
```

**Explanation:** The user submits credentials via the React login form. The request flows through the AuthController to AuthService, which validates credentials via UserRepository and the database. On success, AuthService generates JWT tokens and returns an AuthResponse. The frontend stores tokens and redirects the user.

---

### 1.2 Tasks — Create Task

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant TaskController
    participant TaskService
    participant TaskRepository
    participant UserRepository
    participant DB as PostgreSQL

    User->>React: Submit task form
    React->>TaskController: POST /tasks (CreateTaskRequest, Bearer token)
    TaskController->>TaskController: validateToken()
    TaskController->>TaskService: createTask(userId, dto)
    TaskService->>UserRepository: findById(assigneeId) [if assigned]
    UserRepository->>DB: SELECT user
    DB-->>UserRepository: User
    UserRepository-->>TaskService: User or null
    TaskService->>TaskRepository: create(taskEntity)
    TaskRepository->>DB: INSERT INTO tasks
    DB-->>TaskRepository: Task row
    TaskRepository-->>TaskService: Task entity
    TaskService-->>TaskController: Task (with assigneeName)
    TaskController-->>React: 201 Task
    React-->>User: Show created task
```

**Explanation:** An authenticated user creates a task. The TaskController validates the JWT and delegates to TaskService. The service optionally validates the assignee via UserRepository, then persists the task via TaskRepository. The created task (with resolved assignee name) is returned to the frontend.

---

### 1.3 Tasks — List Tasks

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant TaskController
    participant TaskService
    participant TaskRepository
    participant DB as PostgreSQL

    User->>React: View task list (with filters)
    React->>TaskController: GET /tasks?status=&priority=&assigneeId=&page=&limit=
    TaskController->>TaskController: validateToken()
    TaskController->>TaskService: listTasks(userId, filters, pagination)
    TaskService->>TaskService: applyRoleBasedVisibility(userId)
    TaskService->>TaskRepository: findMany(filters, pagination)
    TaskRepository->>DB: SELECT tasks (with JOINs, WHERE, LIMIT)
    DB-->>TaskRepository: Task rows
    TaskRepository-->>TaskService: Task[] + totalCount
    TaskService-->>TaskController: TaskListResponse (data, pagination)
    TaskController-->>React: 200 TaskListResponse
    React-->>User: Render task list
```

**Explanation:** The user requests a paginated, filtered list of tasks. TaskService applies role-based visibility (users see own tasks; managers see team tasks). TaskRepository executes the query with filters and pagination. The response includes task data and pagination metadata.

---

### 1.4 Tasks — Get Task by ID

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant TaskController
    participant TaskService
    participant TaskRepository
    participant DB as PostgreSQL

    User->>React: Open task detail
    React->>TaskController: GET /tasks/{taskId}
    TaskController->>TaskController: validateToken()
    TaskController->>TaskService: getTask(userId, taskId)
    TaskService->>TaskRepository: findById(taskId)
    TaskRepository->>DB: SELECT * FROM tasks WHERE id = ?
    DB-->>TaskRepository: Task row
    TaskRepository-->>TaskService: Task entity
    TaskService->>TaskService: checkAccess(userId, task)
    alt Task not found or no access
        TaskService-->>TaskController: NotFoundError
        TaskController-->>React: 404 Error
    else Success
        TaskService-->>TaskController: Task
        TaskController-->>React: 200 Task
        React-->>User: Show task details
    end
```

**Explanation:** The user requests a single task by ID. TaskService fetches the task and enforces access control (ownership or manager visibility). If the task is not found or access is denied, a 404 is returned.

---

### 1.5 Tasks — Update Task (PUT)

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant TaskController
    participant TaskService
    participant TaskRepository
    participant UserRepository
    participant DB as PostgreSQL

    User->>React: Save task edits
    React->>TaskController: PUT /tasks/{taskId} (UpdateTaskRequest)
    TaskController->>TaskController: validateToken()
    TaskController->>TaskService: updateTask(userId, taskId, dto)
    TaskService->>TaskRepository: findById(taskId)
    TaskRepository->>DB: SELECT task
    DB-->>TaskRepository: Task
    TaskRepository-->>TaskService: Task entity
    TaskService->>TaskService: checkUpdatePermission(userId, task)
    TaskService->>UserRepository: findById(assigneeId) [if reassigning]
    UserRepository->>DB: SELECT user
    DB-->>UserRepository: User
    UserRepository-->>TaskService: User
    TaskService->>TaskRepository: update(taskId, updates)
    TaskRepository->>DB: UPDATE tasks SET ...
    DB-->>TaskRepository: Updated task
    TaskRepository-->>TaskService: Task entity
    TaskService-->>TaskController: Task
    TaskController-->>React: 200 Task
    React-->>User: Update UI
```

**Explanation:** Full update of a task. TaskService verifies update permission (owner or manager). If reassigning, it validates the new assignee. The task is updated in the database and the updated entity is returned.

---

### 1.6 Tasks — Delete Task

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant TaskController
    participant TaskService
    participant TaskRepository
    participant CommentRepository
    participant DB as PostgreSQL

    User->>React: Delete task
    React->>TaskController: DELETE /tasks/{taskId}
    TaskController->>TaskController: validateToken()
    TaskController->>TaskService: deleteTask(userId, taskId)
    TaskService->>TaskRepository: findById(taskId)
    TaskRepository->>DB: SELECT task
    DB-->>TaskRepository: Task
    TaskRepository-->>TaskService: Task entity
    TaskService->>TaskService: checkDeletePermission(userId, task)
    TaskService->>CommentRepository: deleteByTaskId(taskId)
    CommentRepository->>DB: DELETE FROM comments WHERE task_id = ?
    TaskService->>TaskRepository: delete(taskId)
    TaskRepository->>DB: DELETE FROM tasks WHERE id = ?
    DB-->>TaskRepository: OK
    TaskRepository-->>TaskService: void
    TaskService-->>TaskController: void
    TaskController-->>React: 204 No Content
    React-->>User: Remove task from list
```

**Explanation:** Deleting a task requires permission check. Comments are deleted first (or via cascade), then the task. The API returns 204 No Content on success.

---

### 1.7 Assignments — Assign Task

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant TaskController
    participant TaskService
    participant TaskRepository
    participant UserRepository
    participant NotificationService
    participant DB as PostgreSQL

    User->>React: Assign task to user
    React->>TaskController: POST /tasks/{taskId}/assign (AssignTaskRequest)
    TaskController->>TaskController: validateToken()
    TaskController->>TaskService: assignTask(userId, taskId, assigneeId, note)
    TaskService->>TaskRepository: findById(taskId)
    TaskRepository->>DB: SELECT task
    DB-->>TaskRepository: Task
    TaskRepository-->>TaskService: Task entity
    TaskService->>TaskService: checkAssignPermission(userId, task)
    TaskService->>UserRepository: findById(assigneeId)
    UserRepository->>DB: SELECT user
    DB-->>UserRepository: User
    UserRepository-->>TaskService: User
    TaskService->>TaskRepository: update(taskId, { assigneeId })
    TaskRepository->>DB: UPDATE tasks
    DB-->>TaskRepository: OK
    TaskService->>NotificationService: createAssignmentNotification(assigneeId, taskId)
    NotificationService->>DB: INSERT notification
    TaskService-->>TaskController: Task
    TaskController-->>React: 200 Task
    React-->>User: Show updated assignment
```

**Explanation:** A manager (or authorized user) assigns or reassigns a task. TaskService validates the assignee exists and the requester has permission. After updating the task, an assignment notification is created for the new assignee.

---

### 1.8 Comments — Add Comment

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant CommentController
    participant CommentService
    participant TaskRepository
    participant CommentRepository
    participant DB as PostgreSQL

    User->>React: Submit comment
    React->>CommentController: POST /tasks/{taskId}/comments (CreateCommentRequest)
    CommentController->>CommentController: validateToken()
    CommentController->>CommentService: addComment(userId, taskId, content)
    CommentService->>TaskRepository: findById(taskId)
    TaskRepository->>DB: SELECT task
    DB-->>TaskRepository: Task
    TaskRepository-->>CommentService: Task entity
    CommentService->>CommentService: checkTaskAccess(userId, task)
    CommentService->>CommentRepository: create(commentEntity)
    CommentRepository->>DB: INSERT INTO comments
    DB-->>CommentRepository: Comment row
    CommentRepository-->>CommentService: Comment entity
    CommentService-->>CommentController: Comment (with authorName)
    CommentController-->>React: 201 Comment
    React-->>User: Append comment to list
```

**Explanation:** The user adds a comment to a task. CommentService verifies the task exists and the user has access. The comment is persisted with the author ID; the response includes the resolved author name.

---

### 1.9 Reports — Productivity Metrics

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant React as React Frontend
    participant ReportController
    participant ReportService
    participant TaskRepository
    participant DB as PostgreSQL

    User->>React: View productivity report
    React->>ReportController: GET /reports/productivity?startDate=&endDate=&assigneeId=
    ReportController->>ReportController: validateToken()
    ReportController->>ReportService: getProductivityReport(userId, params)
    ReportService->>ReportService: applyRoleBasedScope(userId)
    ReportService->>TaskRepository: getProductivityMetrics(filters)
    TaskRepository->>DB: Aggregate queries (COUNT, AVG, etc.)
    DB-->>TaskRepository: Metrics
    TaskRepository-->>ReportService: Raw metrics
    ReportService->>ReportService: computeCompletionRate(), avgCompletionTime()
    ReportService-->>ReportController: ProductivityReport
    ReportController-->>React: 200 ProductivityReport
    React-->>User: Render charts/metrics
```

**Explanation:** The productivity report aggregates task metrics (total, completed, overdue, completion rate, average completion time). ReportService applies role-based scope (managers see team; admins see all). TaskRepository executes aggregate queries; ReportService computes derived metrics.

---

## 2. Class Diagrams

Class diagrams show entities, DTOs, services, controllers, and their relationships (aggregation, composition, inheritance).

### 2.1 Domain Entities and DTOs

```mermaid
classDiagram
    class User {
        +string id
        +string email
        +string displayName
        +string role
        +datetime createdAt
        +datetime updatedAt
    }

    class Task {
        +string id
        +string title
        +string description
        +string priority
        +string status
        +date dueDate
        +string assigneeId
        +string[] tags
        +datetime createdAt
        +datetime updatedAt
    }

    class Comment {
        +string id
        +string taskId
        +string authorId
        +string content
        +datetime createdAt
    }

    class Notification {
        +string id
        +string type
        +string title
        +string message
        +string taskId
        +boolean isRead
        +datetime createdAt
    }

    class Tag {
        +string name
    }

    %% DTOs
    class LoginRequest {
        +string email
        +string password
    }

    class CreateTaskRequest {
        +string title
        +string description
        +string priority
        +string status
        +date dueDate
        +string assigneeId
        +string[] tags
    }

    class CreateCommentRequest {
        +string content
    }

    class AssignTaskRequest {
        +string assigneeId
        +string note
    }

    class AuthResponse {
        +string accessToken
        +string refreshToken
        +integer expiresIn
        +UserSummary user
    }

    class UserSummary {
        +string id
        +string email
        +string displayName
        +string role
    }

    class Pagination {
        +integer page
        +integer limit
        +integer totalCount
        +integer totalPages
    }

    %% Relationships
    User "1" --> "*" Task : assigns
    User "1" --> "*" Comment : authors
    Task "1" --> "*" Comment : contains
    Task "*" --> "*" Tag : has
    User "1" --> "*" Notification : receives
    Task "1" --> "*" Notification : triggers
    UserSummary --|> User : extends
```

**Explanation:** Core domain entities are `User`, `Task`, `Comment`, `Notification`, and `Tag`. DTOs (`LoginRequest`, `CreateTaskRequest`, etc.) represent API request/response shapes. `UserSummary` extends `User` for auth responses. Tasks have many comments (composition) and many tags (aggregation). Users assign tasks, author comments, and receive notifications.

---

### 2.2 Controllers, Services, and Repositories

```mermaid
classDiagram
    class AuthController {
        +login(req, res)
        +ssoCallback(req, res)
        +refreshToken(req, res)
    }

    class TaskController {
        +listTasks(req, res)
        +createTask(req, res)
        +getTask(req, res)
        +updateTask(req, res)
        +patchTask(req, res)
        +deleteTask(req, res)
        +assignTask(req, res)
    }

    class CommentController {
        +listComments(req, res)
        +addComment(req, res)
        +deleteComment(req, res)
    }

    class ReportController {
        +getCompletedReport(req, res)
        +getOverdueReport(req, res)
        +getProductivityReport(req, res)
    }

    class NotificationController {
        +listNotifications(req, res)
        +markAsRead(req, res)
    }

    class UserController {
        +listUsers(req, res)
    }

    class AuthService {
        -UserRepository userRepo
        +login(email, password) AuthResponse
        +validateSsoToken(token) AuthResponse
        +refreshToken(refreshToken) AuthResponse
    }

    class TaskService {
        -TaskRepository taskRepo
        -UserRepository userRepo
        +listTasks(userId, filters) TaskListResponse
        +createTask(userId, dto) Task
        +getTask(userId, taskId) Task
        +updateTask(userId, taskId, dto) Task
        +deleteTask(userId, taskId) void
        +assignTask(userId, taskId, assigneeId, note) Task
    }

    class CommentService {
        -CommentRepository commentRepo
        -TaskRepository taskRepo
        +listComments(taskId, pagination) CommentListResponse
        +addComment(userId, taskId, content) Comment
        +deleteComment(userId, taskId, commentId) void
    }

    class ReportService {
        -TaskRepository taskRepo
        +getCompletedReport(userId, params) CompletedTasksReport
        +getOverdueReport(userId, params) OverdueTasksReport
        +getProductivityReport(userId, params) ProductivityReport
    }

    class NotificationService {
        -NotificationRepository notificationRepo
        +listNotifications(userId, params) NotificationListResponse
        +markAsRead(userId, notificationId) Notification
    }

    class UserService {
        -UserRepository userRepo
        +listUsers(userId, params) UserListResponse
    }

    class TaskRepository {
        +findById(id) Task
        +findMany(filters, pagination) Task[]
        +create(task) Task
        +update(id, updates) Task
        +delete(id) void
    }

    class UserRepository {
        +findById(id) User
        +findByEmail(email) User
        +findMany(params) User[]
    }

    class CommentRepository {
        +findByTaskId(taskId, pagination) Comment[]
        +create(comment) Comment
        +delete(id) void
    }

    class NotificationRepository {
        +findByUserId(userId, params) Notification[]
        +updateRead(id) Notification
    }

    %% Controller -> Service
    AuthController --> AuthService : uses
    TaskController --> TaskService : uses
    CommentController --> CommentService : uses
    ReportController --> ReportService : uses
    NotificationController --> NotificationService : uses
    UserController --> UserService : uses

    %% Service -> Repository
    AuthService --> UserRepository : uses
    TaskService --> TaskRepository : uses
    TaskService --> UserRepository : uses
    CommentService --> CommentRepository : uses
    CommentService --> TaskRepository : uses
    ReportService --> TaskRepository : uses
    NotificationService --> NotificationRepository : uses
    UserService --> UserRepository : uses
```

**Explanation:** Controllers handle HTTP concerns and delegate to services. Services encapsulate business logic and use repositories for data access. Each service depends on one or more repositories. The structure follows a layered architecture with clear separation of concerns.

---

## 3. Architecture Diagram

Full-stack architecture showing layers, components, and communication flow.

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        Browser["Browser"]
        React["React App (TypeScript)"]
        Browser --> React
    end

    subgraph UI["UI Layer"]
        Pages["Pages / Views"]
        Components["Components"]
        Hooks["Custom Hooks"]
        ReactQuery["React Query"]
        React --> Pages
        Pages --> Components
        Components --> Hooks
        Hooks --> ReactQuery
    end

    subgraph API["API Layer"]
        APIBase["API Client (Axios/Fetch)"]
        ReactQuery --> APIBase
    end

    subgraph Gateway["API Gateway (Optional)"]
        GatewayNode["Rate Limiting / CORS / Auth Middleware"]
    end

    subgraph Backend["Express Backend (Node.js + TypeScript)"]
        subgraph Controllers["Controller Layer"]
            AuthCtrl["AuthController"]
            TaskCtrl["TaskController"]
            CommentCtrl["CommentController"]
            ReportCtrl["ReportController"]
            NotifCtrl["NotificationController"]
            UserCtrl["UserController"]
        end

        subgraph Middleware["Middleware"]
            AuthMiddleware["JWT Auth"]
            ErrorHandler["Error Handler"]
            Logger["Request Logger"]
        end

        subgraph Services["Service Layer"]
            AuthSvc["AuthService"]
            TaskSvc["TaskService"]
            CommentSvc["CommentService"]
            ReportSvc["ReportService"]
            NotifSvc["NotificationService"]
            UserSvc["UserService"]
        end

        subgraph Repos["Repository Layer"]
            TaskRepo["TaskRepository"]
            UserRepo["UserRepository"]
            CommentRepo["CommentRepository"]
            NotifRepo["NotificationRepository"]
        end
    end

    subgraph Data["Data Layer"]
        DB[(PostgreSQL)]
    end

    subgraph External["External Integrations"]
        SSO["SSO Provider"]
        Email["Email Service"]
        Slack["Slack (Future)"]
    end

    %% Flow
    APIBase -->|"HTTPS"| GatewayNode
    GatewayNode -->|"Validated Request"| AuthMiddleware
    AuthMiddleware --> ErrorHandler
    ErrorHandler --> Logger
    Logger --> AuthCtrl
    Logger --> TaskCtrl
    Logger --> CommentCtrl
    Logger --> ReportCtrl
    Logger --> NotifCtrl
    Logger --> UserCtrl

    AuthCtrl --> AuthSvc
    TaskCtrl --> TaskSvc
    CommentCtrl --> CommentSvc
    ReportCtrl --> ReportSvc
    NotifCtrl --> NotifSvc
    UserCtrl --> UserSvc

    AuthSvc --> UserRepo
    AuthSvc -.->|"Validate token"| SSO
    TaskSvc --> TaskRepo
    TaskSvc --> UserRepo
    CommentSvc --> CommentRepo
    CommentSvc --> TaskRepo
    ReportSvc --> TaskRepo
    NotifSvc --> NotifRepo
    UserSvc --> UserRepo

    TaskRepo --> DB
    UserRepo --> DB
    CommentRepo --> DB
    NotifRepo --> DB

    NotifSvc -.->|"Future"| Email
    NotifSvc -.->|"Future"| Slack
```

**Explanation:** The architecture is a classic layered full-stack design:

- **Client Layer:** Browser runs the React SPA.
- **UI Layer:** React pages and components use custom hooks and React Query for data fetching and caching.
- **API Layer:** An API client (e.g., Axios) sends HTTP requests to the backend.
- **API Gateway (Optional):** Handles rate limiting, CORS, and initial auth checks before requests reach Express.
- **Controller Layer:** Express controllers receive requests, validate input, and delegate to services.
- **Middleware:** JWT auth, centralized error handling, and structured logging.
- **Service Layer:** Business logic; services orchestrate repositories and external integrations.
- **Repository Layer:** Data access abstraction; repositories perform CRUD against the database.
- **Data Layer:** PostgreSQL for persistence (SQLite for local dev per BRD).
- **External Integrations:** SSO for authentication; email and Slack for future notifications.

---

### 3.1 Cloud Architecture Diagram

Cloud deployment view showing how the To-Do App runs on Kubernetes within a cloud provider (AWS, Azure, or GCP). Environments: dev, staging, prod.

```mermaid
flowchart TB
    subgraph Internet["Internet"]
        Users["Users / Browsers"]
    end

    subgraph Cloud["Cloud Provider (AWS / Azure / GCP)"]
        subgraph Edge["Edge / CDN"]
            CDN["CDN / Static Assets"]
            ALB["Application Load Balancer"]
        end

        subgraph VPC["VPC"]
            subgraph K8s["Kubernetes Cluster"]
                subgraph Ingress["Ingress Controller"]
                    IngressCtrl["Ingress (TLS termination)"]
                end

                subgraph FrontendNS["Frontend Namespace"]
                    ReactPods["React App Pods"]
                    ReactSvc["Frontend Service"]
                end

                subgraph BackendNS["Backend Namespace"]
                    ExpressPods["Express API Pods"]
                    ExpressSvc["Backend Service"]
                end

                subgraph Middleware["Platform Services"]
                    Secrets["Secrets Manager"]
                    ConfigMaps["ConfigMaps"]
                end
            end

            subgraph Data["Data Tier"]
                RDS["Managed PostgreSQL"]
            end
        end

        subgraph External["External Services"]
            SSO["SSO Provider"]
            Email["Email Service"]
            Slack["Slack (Future)"]
        end
    end

    %% Traffic flow
    Users -->|"HTTPS"| CDN
    CDN -->|"Static assets"| Users
    Users -->|"API / SPA"| ALB
    ALB --> IngressCtrl
    IngressCtrl --> ReactSvc
    IngressCtrl --> ExpressSvc
    ReactSvc --> ReactPods
    ExpressSvc --> ExpressPods

    %% Backend to data
    ExpressPods -->|"SQL"| RDS
    ExpressPods --> Secrets
    ExpressPods --> ConfigMaps

    %% External integrations
    ExpressPods -.->|"Auth"| SSO
    ExpressPods -.->|"Notifications"| Email
    ExpressPods -.->|"Future"| Slack
```

**Cloud deployment summary:**

| Component | Cloud Implementation |
|-----------|----------------------|
| **Frontend** | React SPA served from CDN or via Ingress; runs in K8s pods |
| **Backend** | Express API in K8s Deployment; scaled via replicas (dev: 1, staging: 2, prod: 3+) |
| **Database** | Managed PostgreSQL (RDS, Azure Database, Cloud SQL) |
| **Secrets** | K8s Secrets or cloud Secrets Manager (DB credentials, JWT keys) |
| **Environments** | Namespaces: `app-dev`, `app-staging`, `app-prod` |
| **Ingress** | TLS termination, routing to frontend/backend services |

---

## 4. Data Flow Summary

| Operation        | Frontend → Controller → Service → Repository → DB |
|-----------------|---------------------------------------------------|
| Login           | AuthController → AuthService → UserRepository    |
| Create Task     | TaskController → TaskService → TaskRepository    |
| List Tasks      | TaskController → TaskService → TaskRepository    |
| Assign Task     | TaskController → TaskService → TaskRepository + NotificationService |
| Add Comment     | CommentController → CommentService → CommentRepository |
| Get Reports     | ReportController → ReportService → TaskRepository |

---

## 5. Technology Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React, TypeScript, React Query      |
| Backend     | Express, Node.js, TypeScript        |
| Database    | PostgreSQL (prod), SQLite (dev)     |
| Auth        | JWT, SSO (optional)                 |
| API Spec    | OpenAPI 3.0                         |

---

*Generated from OpenAPI specification and BRD-TodoApp.md. Diagrams use Mermaid syntax and can be rendered in GitHub, GitLab, or any Mermaid-compatible viewer.*
