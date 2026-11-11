# Claude batch queue

Run batches in order, one launch each, at most 5 agents per batch. Agents must not run concurrently with another batch.

| Batch | Phase | IDs | Status |
|---|---|---|---|
| 01 | research | UNI, HOSP, CORP, ECOM, NEWS | done 2026-11-10 |
| 02 | research | GOV, FASH, WX, NPO, CHUR | done 2026-11-10 |
| 03 | build | UNI-01, UNI-02, UNI-03, HOSP-01, HOSP-02 | done 2026-11-10 |
| 04 | build | HOSP-03, CORP-01, CORP-02, CORP-03, ECOM-01 | done 2026-11-10 |
| 05 | build | ECOM-02, ECOM-03, NEWS-01, NEWS-02, NEWS-03 | done 2026-11-10 |
| 06 | build | GOV-01, GOV-02, GOV-03, FASH-01, FASH-02 | done 2026-11-10 |
| 07 | build | FASH-03, WX-01, WX-02, WX-03, NPO-01 | done 2026-11-11 |
| 08 | build | NPO-02, NPO-03, CHUR-01, CHUR-02, CHUR-03 | done 2026-11-11 |
| 09 | integrate | all 30 Claude replicas | queued |
