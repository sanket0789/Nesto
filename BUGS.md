# Bug Reports

## Overview
This document outlines identified issues with form validation in the account creation process. All bugs relate to input validation failures that could impact data quality and user experience.

---

## Bug #1: Signup Form Accepts Space Characters Input

**Severity:** Medium  
**Priority:** High

**Description:**  
Form fields (first name, last name, email, etc.) accept input consisting entirely of space characters without triggering validation errors.

**Steps to Reproduce:**  
1. Navigate to the account creation form
2. Enter only spaces (whitespace) in any required field (e.g., First Name)
3. Tab out or click outside the field
4. **Result:** No validation error is displayed

**Actual Behavior:**  
- No validation error appears until form submission

**Expected Behavior:**  
- Validation should trigger once user move from the current filed to next.

**Impact:**  
- Users can create accounts with invalid/empty data
- Poor data quality in the system
- Degraded user experience

---

## Bug #2: Duplicate Phone Numbers Accepted

**Severity:** High  
**Priority:** High

**Description:**  
The system allows registration of phone numbers that already exist in the database, creating duplicate entries.

**Steps to Reproduce:**  
1. Create an account with phone number: `555-123-4567`
2. Attempt to create another account with the same phone number
3. **Result:** Form accepts the duplicate phone number

**Actual Behavior:**  
- Duplicate phone numbers are accepted without validation
- Multiple accounts can be created with the same phone number

**Expected Behavior:**  
- System should perform a uniqueness check on phone number input
- If phone number already exists, display error: "This phone number is already registered"
- Prevent form submission until unique phone number is provided

**Impact:**  
- Data integrity issues
- Potential security concerns (account takeover risk)
- Difficulty in user identification and communication

**Recommended Fix:**  
Implement server-side uniqueness validation with real-time feedback during form input (debounced API call on blur).

---

## Bug #3: Password Exceeds Maximum Length Limit

**Severity:** Medium  
**Priority:** Medium

**Description:**  
The password field accepts passwords longer than the documented 32-character maximum, provided they meet other validation criteria (uppercase, lowercase, number).

**Steps to Reproduce:**  
1. Enter a password with 40 characters that meets all other requirements (e.g., `SecurePassword123!ExtraLongTextHere!!!`)
2. Verify it contains uppercase, lowercase, and numbers
3. **Result:** Password is accepted despite exceeding 32-character limit

**Actual Behavior:**  
- Passwords longer than 32 characters are accepted (e.g., 50+ characters)
- No validation error is shown for excessive length

**Expected Behavior:**  
- Password must be between 12-32 characters in length
- If password exceeds 32 characters, display error: "Password must not exceed 32 characters"
- Prevent form submission with invalid password length

**Impact:**  
- Inconsistent validation enforcement
- Potential backend issues if storage/hashing has length constraints
- User confusion about actual password requirements

**Recommended Fix:**  
Add client-side and server-side validation to enforce the 32-character maximum with clear error messaging.

---

## Testing Environment
- **Browser:** Chrome
- **Operating System:** Mac Silicon
- **Test Date:** Monday, March 16th 2026
- **Tester:** Sanket Joshi

## Next Steps
1. Prioritize bugs based on severity and impact
2. Assign to development team for fixes
3. Create automated test cases to prevent regression
4. Re-test after fixes are implemented