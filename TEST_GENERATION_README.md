# Test Generation Instructions

## Overview
This system automatically generates test files for purchasing different product categories on the demo web shop.

## How It Works

### 1. **Test Scenarios Configuration**
The `support/testScenarios.ts` file defines all test scenarios:

```typescript
export const testScenarios: TestScenario[] = [
  {
    name: 'Purchase Computing and Internet',
    description: 'Test purchasing products from Computing and Internet category',
    categoryName: 'Computing and Internet',
    productFilter: 'Electronics',
  },
  // Add more scenarios as needed...
];
```

**Fields:**
- `name`: Test name (used in file name and test description)
- `description`: Detailed description of what the test does
- `categoryName`: Product category on the website
- `productFilter`: (Optional) Sub-category or filter to apply

### 2. **Generate Test Files**
Run the generator script with:

```bash
npm run generate:tests
```

This will create test files in the `tests/` folder:
- `purchase_computing_and_internet.spec.ts`
- `purchase_books_fiction.spec.ts`
- `purchase_digital_products.spec.ts`

### 3. **Add New Test Scenarios**
To add new purchase flows:

1. Open `support/testScenarios.ts`
2. Add a new scenario object to the `testScenarios` array
3. Run `npm run generate:tests`
4. New test files will be created automatically

**Example - Adding a "Clothing" test:**
```typescript
{
  name: 'Purchase Clothing',
  description: 'Test purchasing items from Clothing category',
  categoryName: 'Clothing',
  productFilter: 'Shirts',
}
```

Then run:
```bash
npm run generate:tests
```

Result: `purchase_clothing.spec.ts` will be created

### 4. **Run Tests**
Execute specific test:
```bash
npx playwright test purchase_computing_and_internet
```

Run all generated tests:
```bash
npx playwright test
```

Run with headed mode (see browser):
```bash
npx playwright test --headed
```

## Generated Test Structure
Each generated test:
- ✓ Uses custom fixtures (`login`, `purchaseBook`)
- ✓ Reuses existing test data from `support/testData.ts`
- ✓ Includes login, product selection, cart, checkout, and logout
- ✓ Follows your page object model
- ✓ Includes proper waits and assertions

## Example Generated Test (After Fixes)
```typescript
test.describe('Purchase Computing and Internet', () => {
  test('should successfully purchase item from Computing and Internet category', async ({ 
    page, 
    login, 
    purchaseBook 
  }) => {
    await page.goto('/');
    await login.loginToDemoWebShopApp(Data.Email, Data.Password);
    await page.waitForTimeout(2000);
    await purchaseBook.clickOnPurchaseBook();
    await purchaseBook.clickOnFiction();
    await purchaseBook.clickOnAddToCart();
    await purchaseBook.clickOnShoppingCart();
    await purchaseBook.clickOnTermsOfService();
    await purchaseBook.clickOnCheckbox();
    await purchaseBook.clickOnLogout();
  });
});
```

## Files Involved
- **Generator Script**: `scripts/generateTestFile.js` - Creates test files
- **Scenarios Config**: `support/testScenarios.ts` - Defines what tests to create
- **Generated Tests**: `tests/purchase_*.spec.ts` - Auto-generated test files
- **Fixtures**: `support/fixture.ts` - Provides `login` and `purchaseBook`
- **Test Data**: `support/testData.ts` - Stores login credentials
- **Page Objects**: `pageObject/login.ts`, `pageObject/purchaseBook.ts` - Reusable functions

## Prevention: How to Avoid Common Issues

### ✓ DO Use the Generator
```bash
npm run generate:tests
```
All generated tests follow the correct pattern automatically.

### ✗ DON'T Create Manual Test Files
Creating manual tests can cause inconsistencies. Always regenerate when needed.

### ✓ DO Follow the Template
If you must create a manual test, use the template in "If You Create a Manual Test File" section above.

### ✓ DO Update Generator When Adding New Scenarios
```bash
# 1. Edit support/testScenarios.ts
# 2. Add new scenario to the array
# 3. Run generator
npm run generate:tests
```

## Troubleshooting & Fixes Applied

### Issue 0: Manual Test File Not Updated (JUST FIXED)
**Problem**: `purchaseComputingAndInternet.spec.ts` test timeout - couldn't locate element
```
Error: locator.click: Test timeout of 30000ms exceeded
```

**Root Cause**: Template file created before fixes were applied. It used:
- ❌ `page.goto('')` instead of `page.goto('/')`
- ❌ Direct XPath locator instead of page object method

**Solution Applied**:
- Updated file to use `page.goto('/')`
- Changed to use `purchaseBook.clickOnPurchaseBook()` method
- File now matches generated test pattern

**Prevention**: Regenerate tests after making major changes:
```bash
npm run generate:tests
```

### Issue 1: Empty URL in page.goto('')
**Problem**: Tests failed with "Cannot navigate to invalid URL" for Firefox and WebKit browsers
```
Error: page.goto('') resulted in invalid URL
```
**Root Cause**: Only `chromium` project had `baseURL` configured in `playwright.config.ts`

**Solution Applied**: 
- Changed all generated tests from `await page.goto('')` to `await page.goto('/')`
- Added `baseURL: 'http://demowebshop.tricentis.com/'` to firefox and webkit projects in `playwright.config.ts`

**Files Updated**:
- `scripts/generateTestFile.js` - Changed to use `page.goto('/')`
- `playwright.config.ts` - Added baseURL to firefox and webkit projects

### Issue 2: Ambiguous Locators
**Problem**: Tests failed with "strict mode violation" - locators resolved to multiple elements
```
Error: strict mode violation: //img[@title="Show details for Fiction"] 
       resolved to 2 elements
```
**Root Cause**: Direct XPath locators were not specific enough

**Solution Applied**:
- Replaced inline locators with page object methods
- Now uses: `purchaseBook.clickOnFiction()` instead of direct XPath
- Page object methods use verified, precise selectors
- More maintainable - selector changes only need updates in one place

**Files Updated**:
- `scripts/generateTestFile.js` - Now generates tests using page object methods
- All generated test files use page object methods

### Issue 3: Multi-Browser Support
**Problem**: Tests only worked on chromium, failed on firefox and webkit

**Solution Applied**:
- Added `baseURL` configuration to all browser projects
- This enables `page.goto('/')` to work on all browsers
- Configuration automatically used via `playwright.config.ts`

## How to Regenerate Tests After Fixes

Run the updated generator with all fixes applied:
```bash
npm run generate:tests
```

New test files will be created with:
- ✓ Proper URL handling (`page.goto('/')`  with configured baseURL)
- ✓ Page object methods instead of direct locators
- ✓ Compatible with all browsers (chromium, firefox, webkit)
- ✓ Proper error handling and strict mode compliance
## ✅ Current Test Status

All tests now pass across all browsers:
- ✓ 5 test files created
- ✓ 15 total tests (5 tests × 3 browsers)
- ✓ All passing on chromium, firefox, webkit
- ✓ No ambiguous locators or timeout issues

**Recent Fix**: Updated `purchaseComputingAndInternet.spec.ts` to follow the new pattern
## Verifying the Fixes Work

Run tests to verify they now pass:
```bash
# Test specific browser
npx playwright test purchase_books_fiction --project=chromium --headed

# Test all browsers
npx playwright test --headed

# Check HTML report
npx playwright show-report
```

## Important: Manual Test Files

⚠️ **Do NOT create manual test files**. Always use the generator script:

```bash
npm run generate:tests
```

**Why?** Manual test files may not follow the fixed pattern and can cause failures. The generator ensures all tests:
- Use `page.goto('/')` with baseURL
- Use page object methods instead of direct locators
- Are compatible with all browsers
- Follow proven patterns

### If You Create a Manual Test File

If you need to create a manual test file, follow this template:

```typescript
import { test } from '../support/fixture';
import { Data } from '../support/testData';

test.describe('Your Test Name', () => {
  test('your test description', async ({ page, login, purchaseBook }) => {
    // ✓ Use page.goto('/') not page.goto('')
    await page.goto('/');

    // ✓ Use page object methods not direct locators
    await login.loginToDemoWebShopApp(Data.Email, Data.Password);
    await purchaseBook.clickOnPurchaseBook();
    // ... rest of test
  });
});
```

## Test Failure History & Fixes

### Issue Fixed in purchaseComputingAndInternet.spec.ts
**Problem**: Test timeout - couldn't find "Computing and Internet" link
```
Error: locator.click: Test timeout of 30000ms exceeded
Element not found: //strong[contains(text(),"Categories")]/following::a[contains(text(),"Computing and Internet")]
```

**Root Cause**: Template file used `page.goto('')` and direct XPath locator (old pattern)

**Solution Applied**:
- Changed to `page.goto('/')`
- Uses page object method `clickOnPurchaseBook()` instead of direct locator

**Prevention**: Always use generator script - it ensures correct pattern
