import { Page, Locator, expect } from "@playwright/test";

export class Login{
    public readonly page: Page;
    public readonly loginLink: Locator;
    public readonly email: Locator;
    public readonly password: Locator;
    public readonly login: Locator;

    public constructor(page: Page){
        this.page = page;
        this.loginLink = page.getByText('Log in');
        this.email = page.getByRole('textbox', {name: 'Email'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.login = page.getByRole('button', {name: 'Log in'})
    }

    public async loginToDemoWebShopApp(email: string, password:string){
        await this.loginLink.click();
        await expect(this.email).toBeVisible();
        await this.email.fill(email);
        await expect(this.password).toBeVisible();
        await this.password.fill(password);
        await expect(this.login).toBeVisible();
        await this.login.click();
    }

    public confirmLogin(email: string ): Locator{
        return this.page.getByText(email);
    }
}


