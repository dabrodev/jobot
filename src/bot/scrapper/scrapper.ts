import puppeteer from 'puppeteer';

export interface ScrapperOptions {
    searchValue: string;
    maxRecords: number;
}



export class Scrapper {
    private browser: puppeteer.Browser | null = null;
    private page: puppeteer.Page | null = null;
    private options: ScrapperOptions;
    
    constructor(options: ScrapperOptions) {
        this.options = options;
    }

    // Initialize Puppeteer and open a new page
    public async init(): Promise<void> {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    // Navigate to a particular URL
    public async navigateTo(url: string): Promise<void> {
        if (!this.page) {
            throw new Error("Puppeteer page not initialized");
        }

        await this.page.goto(url);
    }

    // Perform a search or interact with the page
    public async performSearch(selector: string, inputValue: string): Promise<void> {
        if (!this.page) {
            throw new Error("Puppeteer page not initialized");
        }

        await this.page.type(selector, inputValue);
        await this.page.keyboard.press('Enter');
    }

    // Generic method to click on an element
    public async clickOnElement(selector: string): Promise<void> {
        if (!this.page) {
            throw new Error("Puppeteer page not initialized");
        }

        await this.page.click(selector);
    }

    // Retrieve text from a set of elements
    public async getTextFromElements(selector: string): Promise<string[]> {
        if (!this.page) {
            throw new Error("Puppeteer page not initialized");
        }

        return this.page.$$eval(selector, elements => 
            elements.map(element => (element as HTMLElement).innerText)
        );
    }

    // Close the browser instance
    public async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
        }
    }
}