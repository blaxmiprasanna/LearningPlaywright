const fs = require('fs');
const path = require('path');

// Test scenarios to generate
const scenarios = [
  {
    name: 'Purchase Computing and Internet',
    description: 'Test purchasing products from Computing and Internet category',
    categoryName: 'Computing and Internet',
    productFilter: 'Electronics',
  },
  {
    name: 'Purchase Books Fiction',
    description: 'Test purchasing Fiction books',
    categoryName: 'Books',
    productFilter: 'Fiction',
  },
  {
    name: 'Purchase Digital Products',
    description: 'Test purchasing Digital products',
    categoryName: 'Digital products',
  },
];

function generateTestFileName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

function generateTestContent(scenario) {
  let filterStep = '';
  if (scenario.productFilter) {
    filterStep = `
    // Filter by ${scenario.productFilter}
    await purchaseBook.clickOnFiction();`;
  }

  return `import { test } from '../support/fixture';
import { Data } from '../support/testData';

test.describe('${scenario.name}', () => {
  test('should successfully purchase item from ${scenario.categoryName} category', async ({ 
    page, 
    login, 
    purchaseBook 
  }) => {
    // Navigate to the application
    await page.goto('/');

    // Login using the login fixture
    await login.loginToDemoWebShopApp(Data.Email, Data.Password);

    // Verify login was successful
    await page.waitForTimeout(2000);

    // Navigate to ${scenario.categoryName} category using page object method
    await purchaseBook.clickOnPurchaseBook();
    ${filterStep}
    
    // Select a product and add to cart
    await purchaseBook.clickOnAddToCart();
    
    // Navigate to shopping cart
    await purchaseBook.clickOnShoppingCart();
    
    // Accept terms of service
    await purchaseBook.clickOnTermsOfService();
    
    // Proceed to checkout
    await purchaseBook.clickOnCheckbox();
    
    // Logout
    await purchaseBook.clickOnLogout();
  });
});
`;
}

function generateAllTestFiles() {
  const testsDir = path.join(__dirname, '../tests');

  scenarios.forEach((scenario) => {
    const fileName = generateTestFileName(scenario.name);
    const filePath = path.join(testsDir, `${fileName}.spec.ts`);
    const content = generateTestContent(scenario);

    fs.writeFileSync(filePath, content);
    console.log(`✓ Created: ${filePath}`);
  });

  console.log(`\n✓ Successfully generated ${scenarios.length} test file(s)`);
}

// Run the generator
generateAllTestFiles();
