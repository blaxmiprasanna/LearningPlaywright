export interface TestScenario {
  name: string;
  description: string;
  categoryName: string;
  productFilter?: string;
}

export const testScenarios: TestScenario[] = [
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
