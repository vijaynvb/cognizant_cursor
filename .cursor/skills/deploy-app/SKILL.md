---
name: deploy-app
description: Deploys applications to Kubernetes using deployment scripts with pre-deploy validation. Supports dev, staging, and production environments. Use when deploying to k8s, running deployment scripts, or when the user asks to deploy the app.
---

# Deploy App to Kubernetes

## Setup (if deploy/ does not exist)

If the project lacks a `deploy/` structure, create it per [reference.md](reference.md). Copy scripts from `.cursor/skills/deploy-app/scripts/` to `deploy/scripts/` and create base K8s manifests plus env overlays for dev, staging, prod.

## Quick Start

When deploying the application to Kubernetes:

1. **Validate first** — never deploy without passing validation
2. **Select environment** — dev, staging, or prod
3. **Run deployment** — use the deployment scripts

## Deployment Workflow

```
Task Progress:
- [ ] Step 1: Run pre-deploy validation
- [ ] Step 2: Confirm validation passes
- [ ] Step 3: Deploy to target environment
- [ ] Step 4: Verify deployment
```

### Step 1: Pre-Deploy Validation

**Always run validation before deploying.** Execute:

```bash
# From project root — use project scripts if present, else skill scripts
./deploy/scripts/validate.sh [environment]
# Or: ./.cursor/skills/deploy-app/scripts/validate.sh [environment]
```

Environments: `dev`, `staging`, `prod` (default: `dev`)

Validation checks:
- Kubernetes manifests are valid
- Required config files exist for the target environment
- Image tags and secrets are configured
- kubectl context matches target environment

**If validation fails:** Fix reported issues and re-run. Do not proceed to deployment.

### Step 2: Deploy

After validation passes:

```bash
./deploy/scripts/deploy.sh [environment]
# Or: ./.cursor/skills/deploy-app/scripts/deploy.sh [environment]
```

### Step 3: Verify

```bash
kubectl get pods -n <namespace>
kubectl get svc -n <namespace>
kubectl rollout status deployment/<app-name> -n <namespace>
```

## Environment Configuration

| Environment | Namespace | Typical Use |
|-------------|-----------|-------------|
| dev | `app-dev` | Development, feature testing |
| staging | `app-staging` | UAT, pre-production |
| prod | `app-prod` | Production |

Environment-specific config lives in `deploy/env/<env>/`. See [reference.md](reference.md) for full config structure.

## Key Rules

1. **Never skip validation** — deployment scripts must refuse to run if validation fails
2. **Confirm environment** — always pass explicit `--env` or environment argument
3. **Prod requires extra confirmation** — production deploys should prompt or require explicit flag
4. **Use scripts** — prefer `deploy/scripts/validate.sh` and `deploy/scripts/deploy.sh` over manual kubectl

## Additional Resources

- For environment config structure and variables, see [reference.md](reference.md)
- For CI/CD integration (GitHub Actions), see project workflow docs
