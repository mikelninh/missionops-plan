# Public Plan context behind MissionOps

MissionOps is an unsolicited proof of work. It uses only public Plan International Deutschland material and synthetic data.

## What the public material says

### Safeguarding applies to access to data, not only direct contact

Plan International Deutschland states that its safeguarding policy applies to people who have contact with children and young people **or access to them and their data**. It also says data about children and families must be treated confidentially.

Source: https://www.plan.de/wie-wir-arbeiten/safeguarding-heisst-kinder-innerhalb-unserer-organisation-schuetzen.html

### Confidentiality and access rights are explicit concerns

The published 2024 safeguarding policy says personally identifiable data about children and programme participants is confidential and refers to clear organisational procedures governing access rights.

Source: https://www.plan.de/fileadmin/website/09._Stiftung/Downloads/Plan_International_Deutschland_Safeguarding-Richtlinie_2024.pdf

### Data protection is part of business processes

Plan International Deutschland's public data-protection material describes privacy and protection of personal data as an organisational concern, not merely a website concern.

Source: https://www.plan.de/datenschutz.html

## How that changed the demo

Those public principles led to four deliberate design choices:

1. **Minimise before downstream AI** — sensitive context is reduced before any model adapter would receive it.
2. **Least privilege** — the automated step is not granted authority to send an external message.
3. **Human approval** — the demonstrated side effect is blocked until explicit approval exists.
4. **Auditability** — control decisions and authority changes are inspectable.

## What this document does not claim

It does not claim knowledge of Plan's internal systems, model providers, document stores, IAM setup, automation stack, security controls or AI policies beyond what is public.

A real implementation would start by interviewing the relevant teams across IT, Datenschutz, Fachbereiche and Strategie and then map the actual requirements onto these control boundaries.
