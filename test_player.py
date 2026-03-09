from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")
        page.wait_for_selector(".toggle-player")
        # Ensure it is currently open
        page.screenshot(path="/home/jules/verification/player_open.png")
        # Click the toggle player button to hide it
        page.click(".toggle-player")
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/player_closed.png")
        browser.close()

if __name__ == "__main__":
    run()
