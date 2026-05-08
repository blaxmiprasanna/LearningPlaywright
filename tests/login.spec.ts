import {test, expect} from '@playwright/test'
import { PurchaseBook } from '../pageObject/purchase-book';
import {Data} from '../support/testData';

test('Login', async({page}) => {
    await page.goto('');
    // await page.getByText('Log in').click();
    // await page.getByRole('textbox', {name: 'Email'}).fill('botty.prasanna@gmail.com');
    // await page.getByRole('textbox', {name: 'Password'}).fill('kumar123');
    // await page.getByRole('button', {name: 'Log in'}).click();
    const purchaseBook = new PurchaseBook(page);
    await purchaseBook.loginToDemoWebShopApp(Data.Email, Data.Password);
    await expect(page.getByText('botty.prasanna@gmail.com')).toBeVisible();
    await page.locator('//strong[contains(text(),"Categories")]/following::a[contains(text(),"Books")]').click();
    await page.locator('//strong[contains(text(),"Filter by price")]/following::img[@title="Show details for Fiction"]').click();
    await page.getByRole('button', {name: 'Add to cart'}).first().click();
    await page.locator('//input[@value="Search"]/preceding::span[contains(text(),"Shopping cart")]').click();
    await page.locator('[type="checkbox"][name="termsofservice"]').click();
    await page.getByRole('button', {name: 'checkout'}).click()
    await page.getByRole('link',{name: 'Log out'}).click();
})