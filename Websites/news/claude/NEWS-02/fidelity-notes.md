# NEWS-02 fidelity notes

Source: Chicago Tribune, https://www.chicagotribune.com/ (verified 2026-11-10 via curl; approved 2026-11-13). This replica is a structural, fictional, reference-inspired build, not a pixel copy. All copy, names, places and organizations are invented (fictional paper *The Alderny Daily Lantern*, city Port Alderny).

## Replicated (structure from the research block)
- Header: subscribe button, subscriber-services dropdown, search form (GET to results page), menu toggle with push-nav style panel, primary section navigation.
- Section fronts (News, Business, Sports, Opinion, Things to do, Suburbs), Latest headlines, Local news, search results page.
- Home: featured stories, trending bar, newsletter signup blocks, section story blocks, sidebar with headlines list.
- Article page: breadcrumbs, byline plus date, related items, sidebar list, subscribe prompt.
- Footer groups: sections, company info, legal-style notice.

## Approximated
- "Most Popular" list is a fixed invented ranking labelled as sample.
- Push-nav is a disclosure panel over all widths; the inline primary nav is hidden below 760px.
- Search over inline data with section filter and sort (reference only showed a basic GET form).

## Simulated
- Subscribe, newsletter and subscriber-services targets (demo pages, no payment/email/account).
- Metered paywall dialog: **unverified inference**. The research block did not check whether the reference shows a paywall to non-subscribers. The dialog appears only when the user presses a labelled demo button.

## Intentionally added (not observed in the reference)
- Persistent fictional-publication notice (masthead, above article headline, footer, end of article).
- Latest / Most read tab switch (reference observed only a Most Popular list; the tab switch was listed as inferred).
- `about.html` (company info, site map, accessibility statement) and headline filters on Latest headlines / Local news.
- Copy-link button and the paywall-preview button.

## Omitted: ordinary scope prunes (reference nav/footer targets not rebuilt, not linked)
News sub-items: Environment, Marijuana, National, Science, World, Investigations (Health and Immigration as topics are in the policy list below); Business sub-items Transportation, Careers & Finance, Top Workplaces (Real Estate appears only as a kicker); Sports: College Sports, Soccer; Opinion sub-pages; Entertainment sub-pages (Books, Home and Garden, Movies, Music, Theater, Travel, TV); Advice, Chicago Magazine, En Espanol, BestReviews; named suburban sister papers; sister-paper footer group; Careers, Help Center, Media Kit, Store, Archives, Privacy, Terms and Cookie pages; Subscriber Services targets (Manage Subscription, EZ Pay, Vacation Stop, Delivery Issue); Today's E-Editions; X/Facebook/Bluesky/email share buttons; co-author avatar; events block; ads and tracking scripts. Un-rebuilt targets are not linked and no catch-all page exists.

## Omitted: content-policy decisions (fabricated-news guardrail), kept separate
- Obituaries section (fabricated obituaries are harmful).
- Crime and Public Safety.
- Politics (elections/ballots risk) and Immigration, Health as news topics.
- Weather page and the live temperature link/widget; any weather-alert or closure banner.
- Live data of any kind: market tickers, scores, traffic, closures.
- Real people, organizations, places and events; real publication and sister-paper names.
- Education coverage limited to one marching-band trip (no school safety, closures or incidents).

## Research-relevant observations
Article pages are template-driven through `article.html?id=`; no-JS fallback shows one default article. Dates are sample dates in 2031 so no page implies a live edition.
