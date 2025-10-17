# ======= ai-service/ocr.py (NO CHANGE) =======

from io import BytesIO
from PIL import Image
import easyocr
import numpy as np

reader = easyocr.Reader(['en'], gpu=False)

def image_from_bytes(b: bytes):
    try:
        img = Image.open(BytesIO(b))
        # Verify the image is valid
        img.verify()
        # Reopen after verify (verify closes the file)
        img = Image.open(BytesIO(b)).convert('RGB')
        return img
    except (IOError, SyntaxError, OSError) as e:
        raise ValueError(f"Invalid or corrupted image file: {str(e)}")

def ocr_image_bytes(image_bytes: bytes) -> str:
    try:
        img = image_from_bytes(image_bytes)
        arr = np.array(img)
        
        # Check if image array is valid
        if arr.size == 0:
            return ""
        
        results = reader.readtext(arr, detail=0)  # detail=0 returns text only
        full_text = ' '.join(results)
        return full_text
    except ValueError as e:
        print(f"Image validation error: {e}")
        return ""
    except Exception as e:
        print(f"OCR processing error: {e}")
        return ""
