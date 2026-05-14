# TwinOps AI Backend API

## Base URL

```txt
http://127.0.0.1:8000
```

---

# Endpoints

## GET /demo/company-profile

Returns demo company data.

### Response

```json
{
  "success": true,
  "data": {
    "company_name": "NovaCloud SaaS"
  }
}
```

---

## GET /demo/simulations

Returns available demo simulation scenarios.

---

## POST /simulate

Runs enterprise simulation analysis.

### Example Request

```json
{
  "company_name": "NovaCloud SaaS",
  "industry": "SaaS"
}
```

### Returns

- risk analysis
- executive report
- analytics
- heatmaps
- forecasting
- activity feed

---

## POST /compare-scenarios

Compares two simulation outcomes.

### Returns

- safer scenario
- risk difference
- executive comparison