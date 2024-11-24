import { load } from "cheerio";
import decodeHTMLEntities from "@/utils/decodeContent.js";

function styleHtmlContent(content) {
  const decodedContent = decodeHTMLEntities(content);
  const $ = load(decodedContent);

  $("h2").each((i, element) => $(element).addClass("text-xl font-bold"));
  $("h3").each((i, element) => $(element).addClass("text-lg font-bold"));
  $("p").each((i, element) => $(element).addClass("text-gray-500"));
  $("ol").each((i, element) =>
    $(element).addClass("flex flex-col gap-1 list-decimal ml-8"),
  );
  $("ul").each((i, element) =>
    $(element).addClass("flex flex-col gap-1 list-disc ml-8"),
  );
  $("li").each((i, element) => $(element).addClass("font-bold"));

  return $.html();
}

export default styleHtmlContent;
