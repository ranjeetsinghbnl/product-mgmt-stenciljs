import { newE2EPage } from '@stencil/core/testing';

describe('mf-product-cart', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<mf-product-cart></mf-product-cart>');
    const element = await page.find('mf-product-cart');
    expect(element).toHaveClass('hydrated');
  });
})