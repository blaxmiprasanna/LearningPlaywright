import { Locator, Page } from "@playwright/test";




export class PurchaseBook{
    public readonly page: Page;
    public readonly books: Locator;
    public readonly fiction: Locator;
    public readonly addToCart: Locator;
    public readonly shoppingCart: Locator;
    public readonly termsOfService: Locator;
    public readonly checkBox: Locator;
    public readonly logout: Locator;
    
public constructor(page: Page){
    this.page = page;
    this.books = page.locator('//strong[contains(text(),"Categories")]/following::a[contains(text(),"Books")]');
    this.fiction = page.locator('//strong[contains(text(),"Filter by price")]/following::img[@title="Show details for Fiction"]');
    this.addToCart = page.getByRole('button', {name: 'Add to cart'});
    this.shoppingCart = page.locator('//input[@value="Search"]/preceding::span[contains(text(),"Shopping cart")]');
    this.termsOfService = page.locator('[type="checkbox"][name="termsofservice"]');
    this.checkBox = page.getByRole('button', {name: 'checkout'});
    this.logout = page.getByRole('link',{name: 'Log out'});
}    

public async clickOnPurchaseBook(){
   return await this.books.click();
}
public async clickOnFiction(){
  return await this.fiction.click();
}
public async clickOnAddToCart(){
  return await this.addToCart.first().click();
}
public async clickOnShoppingCart(){
  return await this.shoppingCart.click();
}
public async clickOnTermsOfService(){
  return await this.termsOfService.click();
}
public async clickOnCheckbox(){
  return await this.checkBox.click();
}
public async clickOnLogout(){
  return await this.logout.click();
}
}

