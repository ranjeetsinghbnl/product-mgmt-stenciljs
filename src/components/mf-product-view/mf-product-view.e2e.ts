import { newE2EPage } from '@stencil/core/testing';

describe('mf-product-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<mf-product-view></mf-product-view>');
    const element = await page.find('mf-product-view');
    expect(element).toHaveClass('hydrated');
  });
})