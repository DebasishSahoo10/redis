const MAX_BANNER_LENGTH = 500;

// Sanitize banner input
export const sanitizeBanner = (input: unknown): string => {
    // Validate input is a string
    if (typeof input !== 'string') {
        throw new Error('Banner message must be a string');
    }
    
    // Trim whitespace
    let sanitized = input.trim();
    
    // Validate length
    if (sanitized.length === 0) {
        throw new Error('Banner message cannot be empty');
    }
    
    if (sanitized.length > MAX_BANNER_LENGTH) {
        throw new Error(`Banner message must be less than ${MAX_BANNER_LENGTH} characters`);
    }
    
    // Escape HTML characters to prevent XSS
    sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    
    return sanitized;
}