import { load } from "cheerio";
import decodeHTMLEntities from "@/utils/decodeContent.js";

function styleHtmlContent(content) {
  const decodedContent = decodeHTMLEntities(content);
  const $ = load(decodedContent);

  $("h2").each((i, element) => $(element).addClass("text-xl font-bold"));
  $("p").each((i, element) => $(element).addClass("text-gray-500"));

  return $.html();
}

export default styleHtmlContent;
