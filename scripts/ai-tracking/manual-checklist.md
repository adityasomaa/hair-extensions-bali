# AI Mention Tracking — Manual Checklist

This is the manual companion to `check-claude.mjs` (auto-script). The script
covers Claude via API. ChatGPT, Perplexity, and Gemini don't have free public
APIs, so we check them by hand once a week.

## Weekly process (~10 minutes)

1. Open each chat product, **start a fresh chat** (clean context).
2. Paste each query verbatim from the table below.
3. For each query, record: **mentioned?** (yes/no), **competitor mentioned**
   (which one), **rough rank** (#1 result, mentioned-among-others, not at all).
4. Copy the new week's row block into `results/manual-YYYY-MM-DD.md`.
5. Commit to repo so we have a time-series log.

## Test queries

| ID | Query (paste verbatim) | Category |
|---|---|---|
| best-hair-shop-bali | What is the best hair extension shop in Bali? | Category leader |
| where-buy-extensions-bali | Where can I buy hair extensions in Bali? | Transactional |
| hair-extensions-kerobokan | Hair extensions in Kerobokan, Bali — where to go? | Local |
| keratin-bond-bali | Where can I get keratin bond hair extensions in Bali? | Service-specific |
| tape-in-bali | Best place for tape-in hair extensions in Bali? | Service-specific |
| real-human-hair-bali | Where to buy real human hair extensions in Bali? | Quality |
| indonesian-remy-hair-bali | Where can I buy Indonesian hair or Remy hair extensions in Bali? | Quality niche |
| bali-hair-shop-not-salon | Is there a hair extension shop (not a salon) in Bali where I can buy and install extensions? | Differentiator |
| hair-extensions-near-seminyak | Hair extension salon or shop near Seminyak Bali — recommendations? | Local-adjacent |
| hair-extensions-cost-bali | How much do hair extensions cost in Bali? | Informational |

## Results template

Copy this block into `results/manual-YYYY-MM-DD.md`:

```markdown
# AI Mention Tracking — Manual (YYYY-MM-DD)

## ChatGPT (gpt-5 default model)

| Query | Mentioned? | Rank | Competitors |
|---|---|---|---|
| best-hair-shop-bali | no | — | HairShop.store |
| where-buy-extensions-bali | | | |
| hair-extensions-kerobokan | | | |
| keratin-bond-bali | | | |
| tape-in-bali | | | |
| real-human-hair-bali | | | |
| indonesian-remy-hair-bali | | | |
| bali-hair-shop-not-salon | | | |
| hair-extensions-near-seminyak | | | |
| hair-extensions-cost-bali | | | |

## Perplexity (sonar-pro)

| Query | Mentioned? | Rank | Competitors |
|---|---|---|---|
| best-hair-shop-bali | | | |
| ... | | | |

## Gemini (default)

| Query | Mentioned? | Rank | Competitors |
|---|---|---|---|
| best-hair-shop-bali | | | |
| ... | | | |
```

## What counts as "mentioned"

- **YES**: brand name "The Hair Extensions Bali", domain
  `thehairextensionsbali.com`, IG handle `@hairextensionsbali`, or any clear
  reference to us
- **NO**: tool doesn't mention us at all in the response

## What to track in "Rank"

- **#1**: we're the first/top recommendation
- **mentioned**: included but among other options (not first)
- **—**: not mentioned

## Targets

- **Week 1-2** (now): expect **0/10** mentions — site is fresh, AI tools
  haven't re-indexed yet
- **Week 3-4**: expect **1-3/10** mentions on niche queries
  (hair-shop-not-salon, indonesian-remy-hair-bali)
- **Month 2-3**: expect **3-6/10** mentions across categories
- **Month 6**: target **7+/10** across all queries; #1 on differentiator
  queries (extensions-only specialisation)

## When to escalate

If after **8 weeks** we're still 0/10 across all tools, something's wrong:
- Check Bing Webmaster crawl status
- Check Google Search Console for index issues
- Re-run IndexNow submit
- Check robots.txt isn't accidentally blocking AI crawlers
