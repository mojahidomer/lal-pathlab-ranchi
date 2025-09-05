function generateTestId(): string {
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase(); // e.g. "5G8ZB"
    const datePart = new Date().toISOString().split('T')[0].replace(/-/g, '');  // e.g. "20250803"
    return `TEST-${datePart}-${randomPart}`;
  }
  
  // Example
  export default generateTestId