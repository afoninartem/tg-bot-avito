const puppeteer = require("puppeteer");
const links = require("./urlHandler");
console.log(`This is import links: ${links}`)
const scrapeImages = async (links) => {
  console.log(links)
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto("https://www.avito.ru/moskva_zelenograd?q=%D0%B1%D0%BE%D1%82%D0%B8%D0%BD%D0%BA%D0%B8");
  await page.waitForSelector("img", {visible: true});
  const data = await page.evaluate( () => {
    const images = document.querySelectorAll("img");
    const urls = Array.from(images).map(v => v.alt)
    return urls;
  })
  await browser.close();

  console.log(data);
  return data;

}
module.exports = scrapeImages;