import {test, expect} from '../support/fixture';
import { Login } from '../pageObject/login';
import {PurchaseBook} from '../pageObject/purchaseBook';
import {Data} from '../support/testData';

//how to purchase book in the demo retail site
test('Login', async({page, login, purchaseBook}) => {
    await page.goto('');
    await login.loginToDemoWebShopApp(Data.Email, Data.Password);
    await expect(login.confirmLogin(Data.Email)).toBeVisible();
    await purchaseBook.clickOnPurchaseBook();
    await purchaseBook.clickOnFiction();
    await purchaseBook.clickOnAddToCart();
    await purchaseBook.clickOnShoppingCart();
    await purchaseBook.clickOnTermsOfService();
    await purchaseBook.clickOnCheckbox();
    await purchaseBook.clickOnLogout();
})