import { test } from '../support/fixture';
import { Data } from '../support/testData';

test.describe('Purchase Books Fiction', () => {
  test('should successfully purchase item from Books category', async ({ 
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

    // Navigate to Books category using page object method
    await purchaseBook.clickOnPurchaseBook();
    
    // Filter by Fiction
    await purchaseBook.clickOnFiction();
    
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
