import {test as base, expect} from '@playwright/test';
import { Login } from '../pageObject/login';
import { PurchaseBook } from '../pageObject/purchaseBook';

type myFixture= {
  login: Login;
  purchaseBook: PurchaseBook;
}

const test = base.extend<myFixture>({
  login: async({page}, use) =>{
    const login = new Login(page);
    await use(login);
  },
  purchaseBook: async({page}, use) =>{
    const purchaseBook = new PurchaseBook(page);
    await use(purchaseBook);
  }
});

export { test, expect };
   
