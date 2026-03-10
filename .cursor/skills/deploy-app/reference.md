# Deploy App — Environment Configuration Reference

## Directory Structure

```
deploy/
├── base/                    # Base K8s manifests (kustomize)
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
├── env/
│   ├── dev/
│   │   ├── kustomization.yaml
│   │   └── configmap.yaml
│   ├── staging/
│   │   ├── kustomization.yaml
│   │   └── configmap.yaml
│   └── prod/
│       ├── kustomization.yaml
│       └── configmap.yaml
└── scripts/
    ├── validate.sh
    └── deploy.sh
```

## Environment Variables by Environment

| Variable | dev | staging | prod |
|----------|-----|---------|------|
| REPLICAS | 1 | 2 | 3+ |
| RESOURCES | minimal | moderate | full |
| LOG_LEVEL | debug | info | warn |
| DB_HOST | dev-db | staging-db | prod-db |

## Validation Checklist

The validate script checks:

1. **Manifests**: `kubectl apply --dry-run=client -f` succeeds
2. **Config exists**: `deploy/env/<env>/` directory present
3. **Context**: kubectl current-context contains expected cluster name
4. **Secrets**: Required secrets exist (or placeholder for dev)
5. **Image**: Image tag is set and not `latest` for prod

## Kustomize Overlay Example

**deploy/env/dev/kustomization.yaml:**

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: app-dev
resources:
  - ../../base
patches:
  - patch: |
      - op: replace
        path: /spec/replicas
        value: 1
    target:
      kind: Deployment
      name: app
```

## Namespace Conventions

- `app-dev` — development
- `app-staging` — staging/UAT
- `app-prod` — production

## CI/CD Integration

For GitHub Actions, use `deploy/scripts/deploy.sh` with `${{ github.event.inputs.environment }}` or `${{ env.DEPLOY_ENV }}`. Ensure secrets (KUBE_CONFIG, etc.) are configured per environment.
