import { test, expect } from '@playwright/test';

test('Page Validation and Ticket Selection', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://www.sitickets.com/event/gb/gb-long-BJRE43');
  
  // Wait for 5 seconds
  await page.waitForTimeout(5000);
  
  // Wait for the iframe to be present and get its frame
  const frame = await page.waitForSelector('[id="__next"] iframe');
  const frameContent = await frame.contentFrame();
  
  // Verify the event title
  await expect(frameContent.getByText('GB Long', { exact: true })).toBeVisible({ timeout: 10000 });
  
  // Verify the event details
  await expect(frameContent.getByRole('paragraph').filter({ hasText: 'Jun 27, 2025 - Jun 28, 2025 (' })).toBeVisible({ timeout: 10000 });
  await expect(frameContent.getByRole('paragraph').filter({ hasText: '9996 Hunter\'s Run, College' })).toBeVisible({ timeout: 10000 });
  
  // Verify ticket type
  await expect(frameContent.getByText('t1')).toBeVisible({ timeout: 10000 });
  
  // Verify main content
  const mainContent = frameContent.getByRole('main');
  await expect(mainContent).toContainText('GB Long', { timeout: 10000 });
  await expect(mainContent).toContainText('Jun 27, 2025 - Jun 28, 2025 (CDT)', { timeout: 10000 });
  await expect(mainContent).toContainText('9996 Hunter\'s Run, College Station Test, TX', { timeout: 10000 });
  
  // Verify number of unique ticket types
  const ticketElements = await frameContent.locator('.ticket').all();
  const uniqueTicketIds = new Set();
  
  for (const ticket of ticketElements) {
    const ticketId = await ticket.getAttribute('data-id');
    uniqueTicketIds.add(ticketId);
  }
  expect(uniqueTicketIds.size).toBe(5);
  
  // Verify event description 
  const descriptionText = 'this is test event for testing purpose only. This was a recent edit for this test event';
  await expect(frameContent.locator('section.bio .complete')).toContainText(descriptionText, { timeout: 10000 });
  
  //Adding extra steps to the test for the sake of testing.
  // Select ticket
  await frameContent.getByText('t1').click();
  await frameContent.getByText('1 1 2 3 4 5 6 7 8 9 10 11 12').first().click();
  await frameContent.locator('.option').first().click();
  await frameContent.locator('div').filter({ hasText: 'US$40.00' }).nth(3).click();
  
  // Proceed to checkout
  await frameContent.getByText('Checkout').click();
  await expect(frameContent.getByText('Cart Totals', { exact: true })).toBeVisible({ timeout: 10000 });

  // Take a screenshot of the final state :) 
  await page.screenshot({ path: 'test-results/final-state.png', fullPage: true });
});