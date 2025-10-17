# ======= ai-service/nlp.py (COMPLETE) =======

import re
import spacy
from dateutil import parser as dateparser

# Load the spaCy small model for Named Entity Recognition (NER)
nlp = spacy.load('en_core_web_sm') 

# [cite_start]Regex for amount: allows various currencies (INR/Rs/₹/USD/EUR) and common formats. [cite: 6]
AMOUNT_RE = re.compile(r'(?P<amt>\b\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?\b)\s*(?P<cur>INR|Rs|Rs\.|₹|USD|EUR)?', re.I)

def extract_entities(text: str):
    doc = nlp(text)
    entities = {}
    for ent in doc.ents:
        entities.setdefault(ent.label_, []).append(ent.text)

    # 1. Merchant Extraction (Improved Logic)
    merchant = None
    if 'ORG' in entities:
        merchant = entities['ORG'][0]
    elif 'PERSON' in entities:
        merchant = entities['PERSON'][0]

    # FALLBACK: Use the first non-empty line of text if no ORG/PERSON found.
    # This is a common heuristic for receipt headers.
    if not merchant and text:
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        for line in lines:
            # Simple heuristic: if it's longer than 5 chars and doesn't look like an amount/date
            try:
                is_date = dateparser.parse(line, fuzzy=True, default=None)
                is_amount = bool(re.match(r'^\d+(\.\d{2})?$', line.replace(',', '').replace('.', '')))
                
                if len(line) > 5 and not is_date and not is_amount:
                    merchant = line
                    break
            except:
                pass # Ignore if date parsing throws an error

    # 2. Amount and Currency Extraction
    amount = None
    currency = None
    m = AMOUNT_RE.search(text)
    if m:
        amt_raw = m.group('amt').replace(',', '')
        try:
            amount = float(amt_raw)
        except:
            amount = None
        currency = m.group('cur') or 'INR'

    # 3. Date Extraction
    date = None
    try:
        # [cite_start]Use fuzzy=True to find dates even in messy text [cite: 9]
        date = dateparser.parse(text, fuzzy=True) 
    except:
        date = None

    return {
        'merchant': merchant,
        'amount': amount,
        'currency': currency,
        'date': date.isoformat() if date else None,
        'raw_entities': entities
    }